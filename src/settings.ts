import { EOL } from 'os'
import * as fs from 'fs'
import { query, queryAll, addClass, removeClass } from './dom'
// import from './headers'

import { Action, Config } from './types'

const applySetting = ({ config, action, selectors, className }: Config) => {
  const cb = (val: boolean) => action({ selectors, className, bool: val })

  cb(atom.config.get(config))
  atom.config.onDidChange(config, ({ oldValue, newValue }) => {
    if (oldValue !== newValue) {
      cb(newValue)
    }
  })
}

const wrapArr = <T>(val: T[] | T): T[] => (Array.isArray(val) ? val : [val])

const getMethod = (bool: boolean) => (bool ? addClass : removeClass)

// ADD CLASS WHEN CONDITIONAL IS TRUE
const addWhenTrue: Action = ({ selectors, bool, className }) =>
  wrapArr(selectors).forEach((selector) => getMethod(bool)(queryAll(selector), className))

// ADD CLASS WHEN CONDITIONAL IS FALSE
const addWhenFalse: Action = ({ bool, ...props }) => addWhenTrue({ bool: !bool, ...props })

const configs = [
  {
    config: 'seti-ui.hideProjectTab',
    action: addWhenTrue,
    selectors: ['atom-workspace'],
    className: 'hide-project-tab'
  },
  {
    config: 'seti-ui.compactView',
    action: addWhenTrue,
    selectors: ['atom-workspace'],
    className: 'seti-compact'
  },
  {
    config: 'seti-ui.hideTitleBar',
    action: addWhenTrue,
    selectors: ['atom-workspace'],
    className: 'hide-title-bar'
  },
  {
    config: 'seti-ui.hideDocumentTitle',
    action: addWhenTrue,
    selectors: ['atom-workspace'],
    className: 'hide-document-title'
  },
  {
    config: 'seti-ui.hideProjectTab',
    action: addWhenTrue,
    selectors: ['atom-workspace'],
    className: 'hide-project-tab'
  },
  {
    config: 'seti-ui.hideTabs',
    action: addWhenTrue,
    selectors: ['atom-workspace'],
    className: 'seti-hide-tabs'
  },
  {
    config: 'seti-ui.fileIcons',
    action: addWhenTrue,
    selectors: ['atom-workspace'],
    className: 'seti-icons'
  },
  {
    config: 'seti-ui.displayIgnored',
    action: addWhenFalse,
    selectors: [
      '.file.entry.list-item.status-ignored',
      '.directory.entry.list-nested-item.status-ignored'
    ],
    className: 'seti-hide'
  }
]

const pkg = atom.packages.getLoadedPackage('seti-ui')

const refresh = () => {
  pkg?.deactivate?.()
  setImmediate(() => pkg?.activate?.())
}

// SET THEME COLOR
const setTheme = async (theme: string, previous?: string, reload?: boolean) => {
  const el = query('atom-workspace')
  // GET OUR PACKAGE INFO
  const pkg = atom.packages.getLoadedPackage('seti-ui')
  // THEME DATA
  const themeData = ['', '-text', '-highlight']
    .map((suffix) => `@seti-primary${suffix}: @${theme.toLowerCase()}${suffix};`)
    .join(EOL)

  // SAVE TO ATOM CONFIG
  atom.config.set('seti-ui.themeColor', theme)
  // SAVE USER THEME FILE
  try {
    await fs.promises.writeFile(`${pkg?.path}/styles/user-theme.less`, themeData)
    if (previous) {
      el?.classList.remove('seti-theme-' + previous.toLowerCase())
      el?.classList.add('seti-theme-' + theme.toLowerCase())
    }
    if (reload) {
      refresh()
    }
  } catch (e) {}
}

export const init = () => {
  configs.forEach(applySetting)
  setTheme(atom.config.get('seti-ui.themeColor'))
  atom.config.onDidChange('seti-ui.themeColor', ({ newValue, oldValue }) =>
    setTheme(newValue, oldValue, true)
  )
}
