import os from 'os'

import { normalizeColor } from './svg'
import { ColorVars, Mappings } from './types'

const interpolate = (regExp: RegExp, values: { [key: string]: string[] | undefined }) =>
  new RegExp(
    Object.entries(values).reduce(
      (acc, [key, values]) => acc.replace(`{${key}}`, `(${values?.join('|')})`),
      regExp.source
    ),
    regExp.flags
  )

export const parseColorVars = (content: string) =>
  content
    .split(os.EOL)
    .map((line) => line.match(/@(?<color>\w+): (?<code>#[0-9a-f]{6}|[0-9a-f]{3})/i)?.groups)
    .filter((match): match is { [key: string]: string } => match !== undefined)
    .map(({ color, code }) => ({ [color]: normalizeColor(code) }))
    .reduce((acc, curr) => ({ ...acc, ...curr }))

const getMappingRegexp = (colorVars: ColorVars) =>
  interpolate(
    /\.icon-(?<type>ext|name|default)\(("(?<name>[^"]*)", )?"(?<icon>[^"]*)"(, "(?<color>{colors})")?\)/,
    { colors: Object.keys(colorVars) }
  )

export const parseMappings = (content: string, colorVars: ColorVars) =>
  content
    .split(os.EOL)
    .map((line) => line.match(getMappingRegexp(colorVars))?.groups)
    .filter((match): match is { [key: string]: string } => match !== undefined)

export const getMappings = (content: string, colorVars: ColorVars) =>
  parseMappings(content, colorVars)
    .map(({ icon, color = '' }) => ({ icon: `${icon}.svg`, color }))
    .reduce(
      (acc, { icon, color }) => ({
        ...acc,
        [icon]: !acc[icon]
          ? [color]
          : acc[icon]?.includes(color)
          ? acc[icon]
          : [...(acc[icon] ?? []), color]
      }),
      {} as Mappings
    )
