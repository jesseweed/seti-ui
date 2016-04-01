'use babel';
'use strict';

// IMPORT LIBS
import config from './config';
import {Dom} from './dom';
import {Utility} from './util';

// PARSE SETTINGS
const Settings = {

  init: function() {

    console.log('Seti UI Loaded', atom.config.get('seti-ui.ui'));

    // TAB SIZE
    this.tabSize(atom.config.get('seti-ui.ui.compactView'));

    // DISPLAY IGNORED FILES
    this.ignoredFiles(atom.config.get('seti-ui.ui.displayIgnored'));

    // DISPLAY FILE ICONS
    this.fileIcons(atom.config.get('seti-ui.ui.fileIcons'));

    // HIDE TABS
    this.hideTabs(atom.config.get('seti-ui.ui.hideTabs'));

    // SET THEME COLOR
    this.setTheme(atom.config.get('seti-ui.ui.themeColor'), false, false);
    atom.config.onDidChange('seti-ui.ui.themeColor', (value) => {
      this.setTheme(value.newValue, value.oldValue, true);
    });

  },

  package: atom.packages.getLoadedPackage('seti-ui'),

  refresh: function() {
    console.log('reload theme');
    this.package.deactivate();
    setImmediate(() => this.package.activate());
  },

  setTheme: function( theme, previous, reload ) {

    let self = this,
        el = Dom.query('atom-workspace'),
        fs = require('fs'),
        path = require('path'),
        pkg = atom.packages.getLoadedPackage('seti-ui'),
        themeData = '@seti-primary: @' + theme.toLowerCase() + ';';
        themeData = themeData + '@seti-primary-text: @' + theme.toLowerCase() + '-text;';
        themeData = themeData + '@seti-primary-highlight: @' + theme.toLowerCase() + '-highlight;';

    atom.config.set('seti-ui.ui.themeColor', theme);

    fs.writeFile(pkg.path + '/styles/user-theme.less', themeData, function(err) {
        if(!err) {
          if (previous) {
            el.classList.remove('seti-theme-' + previous.toLowerCase());
          }
          el.classList.add('seti-theme-' + theme.toLowerCase());
          if (reload) {
            self.refresh();
          }
        }
    });
  },

  tabSize: function( val ) {
    Utility.applySetting({
      action: 'addWhenTrue',
      config: 'seti-ui.ui.compactView',
      el: [
        'atom-workspace-axis.vertical .tab-bar',
        'atom-workspace-axis.vertical .tabs-bar',
        'atom-panel-container.left',
        'atom-panel-container.left .project-root > .header',
        '.entries.list-tree'
      ],
      className: 'seti-compact',
      val: val,
      cb: this.tabSize
    });
  },

  hideTabs: function( val ) {
    Utility.applySetting({
      action: 'addWhenTrue',
      config: 'seti-ui.ui.hideTabs',
      el: [
        '.tab-bar',
        '.tabs-bar'
      ],
      className: 'seti-hide-tabs',
      val: val,
      cb: this.hideTabs
    });
  },

  fileIcons: function( val ) {
    Utility.applySetting({
      action: 'addWhenTrue',
      config: 'seti-ui.ui.fileIcons',
      el: [
        'atom-workspace'
      ],
      className: 'seti-icons',
      val: val,
      cb: this.fileIcons
    });
  },

  // DISPLAY IGNORED FILES
  ignoredFiles: function( val ) {
    Utility.applySetting({
      action: 'addWhenFalse',
      config: 'seti-ui.ui.displayIgnored',
      el: [
        '.file.entry.list-item.status-ignored',
        '.directory.entry.list-nested-item.status-ignored'
      ],
      className: 'seti-hide',
      val: val,
      cb: this.ignoredFiles
    });
  }

};

export {Settings};
