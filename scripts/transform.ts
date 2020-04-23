import fs from 'fs'
import path from 'path'
import { combineLatest, Subject, of, zip } from 'rxjs'
import { map, pairwise, startWith, catchError } from 'rxjs/operators'

import { mapSpread, observeFile, observeDir, readFile, readDir } from './observable'
import { log, enqueue, flush } from './logger'
import { readIcons, processIcon, getColors, getReplaceable, replaceColors } from './svg'
import { parseColorVars, getMappings } from './parse'
import { filterKeys, mapValues, stripExt } from './utils'
import { IconsObj, IconsDiff, Mappings, ColorVars } from './types'

process.setMaxListeners(100)

const basedir = process.cwd()
const resolve = (dir: string) => path.join(basedir, dir)
const variablesFile = resolve('styles/ui-variables.less')
const mappingsFile = resolve('styles/components/icons/mapping.less')
const iconsDir = resolve('src/icons')
const resultDir = resolve('icons')

const getOutput = (colorVars: ColorVars, mappings: Mappings, iconContents: IconsObj) => {
  const iconFiles = mapValues(iconContents, (content) => processIcon(content, colorVars))

  const varCodes = Object.values(colorVars)

  const iconColors = mapValues(iconFiles, (content) =>
    getReplaceable(
      getColors(content).filter((color) => varCodes.includes(color)),
      colorVars
    )
  )

  return Object.entries(mappings)
    .flatMap(([icon, colors = []]) => {
      const content = iconFiles[icon]
      const replaceable = iconColors[icon]
      if (!content || !replaceable) {
        return []
      }
      return colors.map((color) => {
        const map =
          replaceable.length > 0
            ? replaceable.reduce((acc, curr) => ({ ...acc, [curr]: colorVars[color] }), {})
            : { null: colorVars[color] }
        const out = color.length > 0 ? replaceColors(content, map) : content
        const filename = color.length > 0 ? `${stripExt(icon)}_${color}.svg` : icon
        return { [filename]: out }
      })
    })
    .reduce((acc, file) => ({ ...acc, ...file }), {})
}

const getChanges = ([prev, curr]: IconsDiff) => {
  const prevKeys = Object.keys(prev)
  return Object.entries(curr).filter(([key]) => !prevKeys.includes(key) || prev[key] !== curr[key])
}

const getDeletions = ([prev, curr]: IconsDiff) => {
  const currKeys = Object.keys(curr)
  return Object.keys(prev).filter((key) => !currKeys.includes(key))
}

const run = async () => {
  try {
    await fs.promises.access(resultDir)
  } catch (e) {
    await fs.promises.mkdir(resultDir)
  }

  if (!process.env.ICONS_WATCH) {
    const icons = await fs.promises.readdir(resultDir)
    await Promise.all(
      icons
        .filter((file) => /\.svg$/.test(file))
        .map((file) => fs.promises.unlink(path.join(resultDir, file)))
    )
  }

  const fileObs = process.env.ICONS_WATCH ? observeFile : readFile
  const dirObs = process.env.ICONS_WATCH ? observeDir : readDir

  const colorVars = fileObs(variablesFile).pipe(map(parseColorVars))
  const mappings = combineLatest(fileObs(mappingsFile), colorVars).pipe(mapSpread(getMappings))
  const iconContents = dirObs(iconsDir, readIcons, (file) => /\.svg$/.test(file))

  const filteredIcons = combineLatest(
    iconContents,
    mappings.pipe(map((obj) => Object.keys(obj)))
  ).pipe(
    mapSpread((icons: IconsObj, keys: string[]) => filterKeys(icons, (icon) => keys.includes(icon)))
  )

  const output = combineLatest(colorVars, mappings, filteredIcons).pipe(
    mapSpread(getOutput),
    startWith({} as IconsObj),
    catchError((err, caught) => {
      enqueue('error', err.stack ? err.stack : err)
      return process.env.ICONS_WATCH ? caught : of({} as IconsObj)
    }),
    pairwise()
  )

  const subject = new Subject<IconsDiff>()

  output.subscribe(subject)

  const changes = subject.pipe(map(getChanges))
  const deletions = subject.pipe(map(getDeletions))

  changes.subscribe((arr) =>
    arr.forEach(async ([name, content]) => {
      await fs.promises.writeFile(path.join(resultDir, name), content)
      log('success', `Saved icon '${name}'`)
    })
  )

  deletions.subscribe((arr) =>
    arr.forEach(async (name) => {
      await fs.promises.unlink(path.join(resultDir, name))
      log('success', `Deleted icon '${name}'`)
    })
  )

  zip(changes, deletions).subscribe(() => flush())

  if (process.env.ICONS_WATCH) {
    log('info', 'Watching for changes in SVG config/data')
  }
}

run()
