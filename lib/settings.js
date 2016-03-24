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
    this.tabSize(atom.config.get('seti-ui.ui.largeTabs'))

    // DISPLAY OF IGNORED FILES
    this.ignoredFiles(atom.config.get('seti-ui.ui.displayIgnored'))

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
