Dom = require('./dom')
Utility = require('./utility')

module.exports =
  init: (state) ->

    self = @

    console.log 'Seti UI Loaded', atom.config.get('seti-ui.ui')

    # TAB SIZE
    self.tabSize atom.config.get('seti-ui.ui.compactView')
    # DISPLAY IGNORED FILES
    self.ignoredFiles atom.config.get('seti-ui.ui.displayIgnored')
    # DISPLAY FILE ICONS
    self.fileIcons atom.config.get('seti-ui.ui.fileIcons')
    # HIDE TABS
    self.hideTabs atom.config.get('seti-ui.ui.hideTabs')
    # SET THEME
    self.setTheme atom.config.get('seti-ui.ui.themeColor'), false, false
    atom.config.onDidChange 'seti-ui.ui.themeColor', (value) ->
      self.setTheme value.newValue, value.oldValue, true

  package: atom.packages.getLoadedPackage('seti-ui'),

  # RELOAD WHEN SETTINGS CHANGE
  refresh: ->
    self = @
    console.log 'reload theme'
    self.package.deactivate()
    setImmediate ->
      return self.package.activate()

  # SET THEME COLOR
  setTheme: (theme, previous, reload) ->
    self = this
    el = Dom.query('atom-workspace')
    fs = require('fs')
    path = require('path')

    console.log 'theme color', theme
    console.log 'previous', previous
    console.log 'reload', reload

    # GET OUR PACKAGE INFO
    pkg = atom.packages.getLoadedPackage('seti-ui')

    # THEME DATA
    themeData = '@seti-primary: @' + theme.toLowerCase() + ';'
    themeData = themeData + '@seti-primary-text: @' + theme.toLowerCase() + '-text;'
    themeData = themeData + '@seti-primary-highlight: @' + theme.toLowerCase() + '-highlight;'

    # SAVE TO ATOM CONFIG
    atom.config.set 'seti-ui.ui.themeColor', theme

    # SAVE USER THEME FILE
    fs.writeFile pkg.path + '/styles/user-theme.less', themeData, (err) ->
      if !err
        if previous
          el.classList.remove 'seti-theme-' + previous.toLowerCase()
        el.classList.add 'seti-theme-' + theme.toLowerCase()
        if reload
          self.refresh()

  # SET TAB SIZE
  tabSize: (val) ->
    Utility.applySetting
      action: 'addWhenTrue'
      config: 'seti-ui.ui.compactView'
      el: [
        'atom-workspace-axis.vertical .tab-bar'
        'atom-workspace-axis.vertical .tabs-bar'
        'atom-panel-container.left'
        'atom-panel-container.left .project-root > .header'
        '.entries.list-tree'
      ]
      className: 'seti-compact'
      val: val
      cb: @tabSize

  # SET WHETHER WE SHOW TABS
  hideTabs: (val) ->
    Utility.applySetting
      action: 'addWhenTrue'
      config: 'seti-ui.ui.hideTabs'
      el: [
        '.tab-bar'
        '.tabs-bar'
      ]
      className: 'seti-hide-tabs'
      val: val
      cb: @hideTabs
    return

  # SET WHETHER WE SHOW FILE ICONS
  fileIcons: (val) ->
    Utility.applySetting
      action: 'addWhenTrue'
      config: 'seti-ui.ui.fileIcons'
      el: [ 'atom-workspace' ]
      className: 'seti-icons'
      val: val
      cb: @fileIcons
    return

  # SET IF WE SHOW IGNORED FILES
  ignoredFiles: (val) ->
    Utility.applySetting
      action: 'addWhenFalse'
      config: 'seti-ui.ui.displayIgnored'
      el: [
        '.file.entry.list-item.status-ignored'
        '.directory.entry.list-nested-item.status-ignored'
      ]
      className: 'seti-hide'
      val: val
      cb: @ignoredFiles
