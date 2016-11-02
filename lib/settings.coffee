Dom = require('./dom')
Utility = require('./utility')
Headers = require('./headers')

module.exports =
  init: (state) ->

    self = @

    # TAB SIZE
    self.tabSize atom.config.get('seti-super-compact-ui.compactView')
    # DISPLAY IGNORED FILES
    self.ignoredFiles atom.config.get('seti-super-compact-ui.displayIgnored')
    # DISPLAY FILE ICONS
    self.fileIcons atom.config.get('seti-super-compact-ui.fileIcons')
    # HIDE TABS
    self.hideTabs atom.config.get('seti-super-compact-ui.hideTabs')
    # SET THEME
    self.setTheme atom.config.get('seti-super-compact-ui.themeColor'), false, false

    # FONT FAMILY
    self.font atom.config.get('seti-super-compact-ui.font'), false

    # ANIMATIONS
    self.animate atom.config.get('seti-super-compact-ui.disableAnimations')

    atom.config.onDidChange 'seti-super-compact-ui.font', (value) ->
      self.font atom.config.get('seti-super-compact-ui.font'), true

    atom.config.onDidChange 'seti-super-compact-ui.themeColor', (value) ->
      self.setTheme value.newValue, value.oldValue, true

  package: atom.packages.getLoadedPackage('seti-super-compact-ui'),

  # RELOAD WHEN SETTINGS CHANGE
  refresh: ->
    self = @
    self.package.deactivate()
    setImmediate ->
      return self.package.activate()

  # SET FONT FAMILY
  font: (val, reload) ->
    self = this
    el = Dom.query('atom-workspace')

    if val == 'Roboto'
      el.classList.add 'seti-roboto'
    else
      el.classList.remove 'seti-roboto'

  # SET THEME COLOR
  setTheme: (theme, previous, reload) ->
    self = this
    el = Dom.query('atom-workspace')
    fs = require('fs')
    path = require('path')

    # GET OUR PACKAGE INFO
    pkg = atom.packages.getLoadedPackage('seti-super-compact-ui')

    # THEME DATA
    themeData = '@seti-primary: @' + theme.toLowerCase() + ';'
    themeData = themeData + '@seti-primary-text: @' + theme.toLowerCase() + '-text;'
    themeData = themeData + '@seti-primary-highlight: @' + theme.toLowerCase() + '-highlight;'

    # SAVE TO ATOM CONFIG
    atom.config.set 'seti-super-compact-ui.themeColor', theme

    # SAVE USER THEME FILE
    fs.writeFile pkg.path + '/styles/user-theme.less', themeData, (err) ->
      if !err
        if previous
          el.classList.remove 'seti-theme-' + previous.toLowerCase()
          el.classList.add 'seti-theme-' + theme.toLowerCase()
        if reload
          self.refresh()

  # SET TAB SIZE
  animate: (val) ->
    Utility.applySetting
      action: 'addWhenFalse'
      config: 'seti-super-compact-ui.disableAnimations'
      el: [
        'atom-workspace'
      ]
      className: 'seti-animate'
      val: val
      cb: @animate

  # SET TAB SIZE
  tabSize: (val) ->
    Utility.applySetting
      action: 'addCompact'
      config: 'seti-super-compact-ui.compactView'
      el: [
        'atom-workspace'
      ]
      className: Utility.getClassNames val
      val: val
      cb: @tabSize

  # SET WHETHER WE SHOW TABS
  hideTabs: (val) ->
    Utility.applySetting
      action: 'addWhenTrue'
      config: 'seti-super-compact-ui.hideTabs'
      el: [
        'atom-workspace'
      ]
      className: 'seti-hide-tabs'
      val: val
      cb: @hideTabs
    return

  # SET WHETHER WE SHOW FILE ICONS
  fileIcons: (val) ->
    Utility.applySetting
      action: 'addWhenTrue'
      config: 'seti-super-compact-ui.fileIcons'
      el: [ 'atom-workspace' ]
      className: 'seti-icons'
      val: val
      cb: @fileIcons
    return

  # SET IF WE SHOW IGNORED FILES
  ignoredFiles: (val) ->
    Utility.applySetting
      action: 'addWhenFalse'
      config: 'seti-super-compact-ui.displayIgnored'
      el: [
        '.file.entry.list-item.status-ignored'
        '.directory.entry.list-nested-item.status-ignored'
      ]
      className: 'seti-hide'
      val: val
      cb: @ignoredFiles
