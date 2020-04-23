import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

import { log } from './logger'
import { prepareIconVersion } from './svg'
import { parseColorVars, parseMappings, getMappings } from './parse'
import { PackageJson, LanguageDef } from './types'
import { stripExt, mapValues, filterKeys } from './utils'

// eslint-disable-next-line @typescript-eslint/camelcase
const information_for_contributors = [
  'This file has been generated from data in https://github.com/jesseweed/seti-ui',
  '- icon definitions: https://github.com/jesseweed/seti-ui/blob/master/styles/_fonts/seti.less',
  '- icon colors: https://github.com/jesseweed/seti-ui/blob/master/styles/ui-variables.less',
  '- file associations: https://github.com/jesseweed/seti-ui/blob/master/styles/components/icons/mapping.less',
  'If you want to provide a fix or improvement, please create a pull request against the jesseweed/seti-ui repository.',
  'Once accepted there, we are happy to receive an update request.'
]

const nonBuiltInLanguages: { [x: string]: Omit<LanguageDef, 'id'> } = {
  r: { extensions: ['r', 'rhistory', 'rprofile', 'rt'] },
  argdown: { extensions: ['ad', 'adown', 'argdown', 'argdn'] },
  elm: { extensions: ['elm'] },
  ocaml: { extensions: ['ml', 'mli'] },
  nunjucks: { extensions: ['nunjucks', 'nunjs', 'nunj', 'nj', 'njk', 'tmpl', 'tpl'] },
  mustache: { extensions: ['mustache', 'mst', 'mu', 'stache'] },
  erb: { extensions: ['erb', 'rhtml', 'html.erb'] },
  terraform: { extensions: ['tf', 'tfvars', 'hcl'] },
  vue: { extensions: ['vue'] },
  sass: { extensions: ['sass'] },
  puppet: { extensions: ['puppet'] },
  kotlin: { extensions: ['kt'] },
  jinja: { extensions: ['jinja'] },
  haxe: { extensions: ['hx'] },
  haskell: { extensions: ['hs'] },
  gradle: { extensions: ['gradle'] },
  elixir: { extensions: ['ex'] },
  haml: { extensions: ['haml'] },
  stylus: { extensions: ['styl'] },
  vala: { extensions: ['vala'] },
  todo: { fileNames: ['todo'] },
  jsonc: { extensions: ['json'] }
}

const basedir = process.cwd()
const resolve = (dir: string) => path.join(basedir, dir)

const outputDir = resolve(process.env.THEME_ICONS_DIR || '../vscode/extensions/theme-seti/icons')

const extensionsDir = path.join(outputDir, '../../')

const readFile = (file: string) => fs.promises.readFile(resolve(file), 'utf-8')

const run = async () => {
  const extensions = await fs.promises.readdir(extensionsDir)

  const packageFiles = await Promise.all(
    extensions
      .map((extension) => path.join(extensionsDir, extension, 'package.json'))
      .map(async (file) => {
        try {
          await fs.promises.access(file)
          return fs.promises.readFile(file, 'utf-8')
        } catch (e) {
          return null
        }
      })
  )

  const languages = packageFiles
    .filter((content): content is string => content !== null)
    .map((content) => JSON.parse(content))
    .flatMap((pkg: PackageJson) => pkg.contributes?.languages ?? [])
    .filter((lang): lang is LanguageDef & { id: string } => lang.id !== undefined)
    .map(({ id, extensions, fileNames }) => ({
      [id]: { extensions: extensions?.map((ext) => ext.substr(1)), fileNames }
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), nonBuiltInLanguages)

  const variablesFile = await readFile('styles/ui-variables.less')
  const colorVars = parseColorVars(variablesFile)

  const mappingsFile = await readFile('styles/components/icons/mapping.less')
  const definitions = parseMappings(mappingsFile, colorVars)
  const mappings = getMappings(mappingsFile, colorVars)

  const getIconId = (icon: string, color = '') =>
    `_${stripExt(icon)}${color.length > 0 ? `_${color}` : ''}`

  const iconDefinitions = Object.entries(mappings)
    .flatMap(([icon, colors = []]) =>
      colors
        .map((color) => getIconId(icon, color))
        .map((id) => ({
          [id]: { iconPath: `./${id.substr(1)}.svg` },
          [`${id}_light`]: { iconPath: `./${id.substr(1)}_light.svg` }
        }))
    )
    .reduce((acc, curr) => ({ ...acc, ...curr }))

  const file = definitions
    .filter(({ type }) => type === 'default')
    .map(({ icon, color }) => getIconId(icon, color))[0]

  const fileExtensionDefs = definitions
    .filter(({ type }) => type === 'ext')
    .map(({ name, icon, color }) => ({
      [name.toLowerCase().replace(/^\./, '')]: getIconId(icon, color)
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }))

  const fileNameDefs = definitions
    .filter(({ type }) => type === 'name')
    .map(({ name, icon, color }) => ({
      [name.toLowerCase()]: getIconId(icon, color)
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }))

  const languageDefs = Object.entries(languages)
    .map(([id, { extensions, fileNames }]) => ({
      id,
      extensions,
      fileNames,
      extension: extensions?.find((ext) => fileExtensionDefs[ext]),
      fileName: fileNames?.find((name) => fileNameDefs[name])
    }))
    .map(({ extension = '', fileName = '', ...rest }) => ({
      icon: fileExtensionDefs[extension] ?? fileNameDefs[fileName],
      ...rest
    }))
    .filter(({ icon }) => icon)
    .map(({ id, icon, extensions, fileNames }) => ({
      id,
      icon,
      extensions: extensions?.filter((ext) => fileExtensionDefs[ext] === icon),
      fileNames: fileNames?.filter((name) => fileNameDefs[name] === icon)
    }))

  const languageExts = languageDefs
    .filter(({ id }) => !nonBuiltInLanguages[id])
    .flatMap(({ extensions }) => extensions)
  const fileExtensions = filterKeys(fileExtensionDefs, (ext) => !languageExts.includes(ext))

  const languageNames = languageDefs
    .filter(({ id }) => !nonBuiltInLanguages[id])
    .flatMap(({ fileNames }) => fileNames)
  const fileNames = filterKeys(fileNameDefs, (name) => !languageNames.includes(name))

  const languageIds = languageDefs
    .map(({ id, icon }) => ({
      [id]: icon
    }))
    .reduce((acc, curr) => ({
      ...acc,
      ...curr
    }))

  const lightAssoc = (assoc: { [key: string]: string }) => mapValues(assoc, (id) => `${id}_light`)

  const req = await fetch('https://api.github.com/repos/jesseweed/seti-ui/commits/master')
  const master = await req.json()

  const theme = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    information_for_contributors,
    iconDefinitions,
    file,
    fileExtensions,
    fileNames,
    languageIds,
    light: {
      file: `${file}_light`,
      fileExtensions: lightAssoc(fileExtensions),
      fileNames: lightAssoc(fileNames),
      languageIds: lightAssoc(languageIds)
    },
    version: master.html_url
  }

  log('info', `Saving output to ${outputDir}`)
  const current = await fs.promises.readdir(outputDir)
  await Promise.all(
    current
      .filter((file) => /\.svg$/.test(file))
      .map((file) => fs.promises.unlink(path.join(outputDir, file)))
  )

  await fs.promises.writeFile(
    path.join(outputDir, 'vs-seti-icon-theme.json'),
    JSON.stringify(theme, null, '\t')
  )

  const icons = await fs.promises.readdir(resolve('icons'))

  const iconContents = await Promise.all(
    icons
      .filter((icon) => /\.svg$/.test(icon))
      .map(async (icon) => ({
        icon,
        content: await fs.promises.readFile(resolve(`icons/${icon}`), 'utf-8')
      }))
  )

  await Promise.all(
    iconContents.flatMap(({ icon, content }) =>
      ['black', 'white'].map((base) =>
        fs.promises.writeFile(
          path.join(outputDir, base === 'white' ? `${stripExt(icon)}_light.svg` : icon),
          prepareIconVersion(content, colorVars, colorVars[base])
        )
      )
    )
  )
  log('success', 'Successfully saved all files')
}

run()
