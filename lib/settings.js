'use babel';
'use strict';

// IMPORT LIBS
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
    this.setTheme(atom.config.get('seti-ui.ui.themeColor'));
    atom.config.onDidChange('seti-ui.ui.themeColor', (value) => {
      this.setTheme(value.newValue);
    });

  },

  setTheme: function( theme ) {

    atom.config.set('seti-ui.ui.themeColor', theme);

    let fs = require('fs'),
        path = require('path'),
        pkg = atom.packages.getLoadedPackage('seti-ui'),
        themeData = '@seti-primary: @' + theme.toLowerCase() + ';';
        themeData = themeData + '@seti-primary-text: @' + theme.toLowerCase() + '-text;';
        themeData = themeData + '@seti-primary-highlight: @' + theme.toLowerCase() + '-highlight;';

    fs.writeFile(pkg.path + '/styles/user-theme.less', themeData, function(err) {
        if(err) {
          alert('Unable to save configuration file: ' + pkg.path + '/styles/user-theme.less');
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
      action: 'addWhenFalse',
      config: 'seti-ui.ui.fileIcons',
      el: [
        'atom-panel-container.left',
        '.tab-bar',
        '.tabs-bar'
      ],
      className: 'seti-no-icons',
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
