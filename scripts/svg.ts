import fs from 'fs'
import Color from 'color'
import { JSDOM } from 'jsdom'
import SVGO from 'svgo'
import autocrop from 'svg-autocrop'

import { ColorVars, ColorMap, Serializable, RGBColor, RGBIndex } from './types'

const {
  window: { document }
} = new JSDOM()

const COLOR_ATTRS = ['fill', 'stroke']
const MASK_ELEM_SELECTOR = 'mask, mask *'

export const normalizeColor = (color: string | Color) => Color(color).rgb().alpha(1).hex()

const modifyNodes = (selector: string, fn: (el: Element, container: Element) => void) => (
  content: string
) => {
  const div = document.createElement('div')
  div.innerHTML = content
  div.querySelectorAll(selector).forEach((el) => fn(el, div))
  const result = div.innerHTML
  div.remove()
  return result
}

const normalizeAttr = (
  el: Element,
  attr: string,
  fn: (val: string | null) => Serializable | null
) => {
  const updated = fn(el.getAttribute(attr))

  if (updated !== null) {
    el.setAttribute(attr, updated.toString())
  } else {
    el.removeAttribute(attr)
  }
}

const getClosest = (color: string | Color, colorVars: RGBColor[]) => {
  const rgb = Color(color).rgb().object()
  const keys: RGBIndex[] = ['r', 'g', 'b']
  const distances = colorVars.map((rgbVar) =>
    keys
      .map((key) => rgbVar[key] - rgb[key])
      .map(Math.abs)
      .reduce((acc, curr) => acc + curr)
  )
  const minIndex = distances.indexOf(Math.min(...distances))
  return normalizeColor(Color(colorVars[minIndex]))
}

const maskColors = ['black', 'white'].map((color) => Color(color).rgb().object()) as RGBColor[]
const omittedColors = ['none', 'null', null]

export const getColors = (content: string, selector = '*') => {
  const div = document.createElement('div')
  div.innerHTML = content
  const result = [
    ...new Set(
      Array.from(div.querySelectorAll(selector))
        .flatMap((node) => COLOR_ATTRS.map((attr) => node.getAttribute(attr)))
        .filter((color): color is string => !omittedColors.includes(color))
    )
  ]
  div.remove()
  return result
}

export const getReplaceable = (colors: string[], colorVars: ColorVars): string[] =>
  colors.length <= 1
    ? colors
    : colors.find((color) => color === colorVars.white)
    ? getReplaceable(
        colors.filter((color) => color !== colorVars.white),
        colorVars
      )
    : colors.filter((color) => color !== colorVars.black)

const getColorsMap = (content: string, vars: RGBColor[], selector = '*') => {
  return getColors(content, selector)
    .map((color) => ({
      [color]: getClosest(color, vars)
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})
}

export const replaceColors = (content: string, colorsMap: ColorMap, selector = '*') =>
  modifyNodes(selector, (node) => {
    COLOR_ATTRS.forEach((attr) =>
      normalizeAttr(node, attr, (color) => {
        if (!colorsMap[color ?? 'null']) {
          return color
        }
        return colorsMap[color ?? 'null']
      })
    )
  })(content)

const getColorAt = (el: Element, offset: number) => {
  const stops = Array.from(el.querySelectorAll('stop'))
  if (stops.length === 0) {
    return null
  }
  const before = stops.filter((stop) => Number(stop.getAttribute('offset')) < offset)
  if (before.length === 0) {
    return stops[0].getAttribute('stop-color')
  } else if (before.length === stops.length) {
    return stops[stops.length - 1].getAttribute('stop-color')
  } else {
    const elements = [-1, 0].map((n) => n + before.length).map((n) => stops[n])
    const [c1, c2] = elements.map((el) => el.getAttribute('stop-color') ?? '')
    const [o1, o2] = elements.map((el, i) => Number(el.getAttribute('offset') ?? i))
    return Color(c1).mix(Color(c2), (offset - o1) / (o2 - o1))
  }
}

const URL_REGEXP = /url\((?<selector>[#\.]?[\w-]+)\)/

export const processMasks = (content: string) => {
  const map = getColorsMap(content, maskColors, MASK_ELEM_SELECTOR)
  return replaceColors(content, map, MASK_ELEM_SELECTOR)
}

export const fillMasks = (content: string) =>
  modifyNodes(MASK_ELEM_SELECTOR, (node) => {
    COLOR_ATTRS.forEach((attr) =>
      normalizeAttr(node, attr, (color) => {
        if (color === null) {
          return attr === 'fill' ? normalizeColor('black') : null
        } else {
          return color
        }
      })
    )
  })(content)

export const processIcon = (content: string, colorVars: ColorVars) => {
  const processedVars = Object.values(colorVars).map((color) =>
    Color(color).rgb().object()
  ) as RGBColor[]
  const colorsMap = getColorsMap(content, processedVars)
  const normalized = replaceColors(content, colorsMap)
  const maskMap = {
    [colorVars.black]: normalizeColor('#000'),
    [colorVars.white]: normalizeColor('#FFF')
  }
  const masksFixed = replaceColors(normalized, maskMap, MASK_ELEM_SELECTOR)
  const masksFilled = fillMasks(masksFixed)
  return masksFilled
}

const getGradientColor = (selector: string, container: Element): string | null => {
  const el = container.querySelector(selector)
  if (!el || (el.tagName !== 'linearGradient' && el.tagName !== 'radialGradient')) {
    return null
  }
  if (el.hasAttribute('xlink:href')) {
    return getGradientColor(el.getAttribute('xlink:href')!, container)
  }
  return normalizeColor(getColorAt(el, 0.5) ?? 'black')
}

export const resolveColors = modifyNodes(':not(mask)', (node, container) => {
  node.removeAttribute('opacity')
  node.removeAttribute('fill-opacity')
  node.removeAttribute('stroke-opacity')
  COLOR_ATTRS.forEach((attr) =>
    normalizeAttr(node, attr, (color) => {
      if (color === null) {
        return null
      }
      if (!URL_REGEXP.test(color)) {
        if (!['none', 'null'].includes(color)) {
          return normalizeColor(color)
        } else {
          return color
        }
      }
      const { selector } = color.match(URL_REGEXP)?.groups ?? { selector: ':not(*)' }
      return getGradientColor(selector, container)
    })
  )
})

const squareViewBox = (content: string) => {
  const div = document.createElement('div')
  div.innerHTML = content
  const svg = div.querySelector('svg')!
  const [x, y, width, height] = svg.getAttribute('viewBox')!.split(' ').map(Number)

  if (width < height) {
    const newWidth = height
    const newX = x - (newWidth - width) / 2
    svg.setAttribute(
      'viewBox',
      `${Number(newX.toPrecision(5))} ${y} ${Number(newWidth.toPrecision(5))} ${height}`
    )
  }

  if (height < width) {
    const newHeight = width
    const newY = y - (newHeight - height) / 2
    svg.setAttribute(
      'viewBox',
      `${x} ${Number(newY.toPrecision(5))} ${width} ${Number(newHeight.toPrecision(5))}`
    )
  }

  const result = div.innerHTML
  div.remove()
  return result
}

const readIcon = async (icon: string) => {
  const content = await fs.promises.readFile(`src/icons/${icon}`, 'utf-8')
  const { data } = await new SVGO({
    full: true,
    plugins: [{ inlineStyles: { onlyMatchedOnce: false } }, { convertStyleToAttrs: true }]
  }).optimize(content)
  const resolved = resolveColors(data)
  return processMasks(resolved)
}

export const readIcons = async (icons: string[]) => {
  const loaded = await Promise.all(icons.map(readIcon))
  const cropped = await autocrop(loaded, { scale: 1.3 })
  const svgo = new SVGO({ plugins: [{ removeViewBox: false }, { removeDimensions: true }] })
  return Promise.all(
    cropped.map(squareViewBox).map(async (content) => (await svgo.optimize(content)).data)
  )
}

export const prepareIconVersion = (content: string, colorVars: ColorVars, base: string) => {
  const varCodes = Object.values(colorVars)
  const colors = getColors(content).filter((color) => varCodes.includes(color))
  const inverse = base === colorVars.black ? colorVars.white : colorVars.black
  const transFn =
    base === colorVars.black
      ? (c: string) => c
      : (c: string) => normalizeColor(Color(c).darken(0.1))
  const colorsMap = varCodes.reduce((acc, color) => ({ [color]: transFn(color), ...acc }), {
    [base]: colors.length === 1 ? inverse : base
  })
  return replaceColors(content, colorsMap)
}
