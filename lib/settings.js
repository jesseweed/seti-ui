'use babel';
'use strict';

// IMPORT LIBS
import {Dom} from './dom';
import {Utility} from './util';

// PARSE SETTINGS
var Settings = {

  init: function() {

    console.log('Seti Config: ', atom.config.get('seti-ui.ui'));

    // TAB SIZE
    this.tabSize(atom.config.get('seti-ui.ui.largeTabs'));

    // DISPLAY OF IGNORED FILES
    this.ignoredFiles(atom.config.get('seti-ui.ui.displayIgnored'));

    this.fileIcons(atom.config.get('seti-ui.ui.fileIcons'));

    this.hideTabs(atom.config.get('seti-ui.ui.hideTabs'));

  },

  tabSize: function( val ) {
    var self = this;
    Utility.applySetting({
      action: 'addWhenFalse',
      config: 'seti-ui.ui.largeTabs',
      el: [
        'atom-workspace-axis.vertical .tab-bar',
        'atom-workspace-axis.vertical .tabs-bar',
        'atom-panel-container.left',
        'atom-panel-container.left .project-root > .header'
      ],
      className: 'small-tab',
      val: val,
      cb: self.tabSize
    });
  },

  hideTabs: function( val ) {
    var self = this;
    Utility.applySetting({
      action: 'addWhenTrue',
      config: 'seti-ui.ui.hideTabs',
      el: [
        '.tab-bar',
        '.tabs-bar'
      ],
      className: 'seti-hide-tabs',
      val: val,
      cb: self.hideTabs
    });
  },

  fileIcons: function( val ) {
    var self = this;
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
      cb: self.fileIcons
    });
  },

  // DISPLAY IGNORED FILES
  ignoredFiles: function( val ) {
    var self = this;
    Utility.applySetting({
      action: 'addWhenFalse',
      config: 'seti-ui.ui.displayIgnored',
      el: [
        '.file.entry.list-item.status-ignored',
        '.directory.entry.list-nested-item.status-ignored'
      ],
      className: 'seti-hide',
      val: val,
      cb: self.ignoredFiles
    });
  }

};

export {Settings};
