'use babel';
'use strict';

import {Dom} from './dom';

const Utility = {

  addWhenFalse: function(obj) {

    if (!Array.isArray(obj.el)) { obj.el = [obj.el]; }

    obj.el.forEach(function(el) {
      var el = Dom.queryAll(el);
      if (!obj.bool) { // ADD CLASS
        console.log('add class', obj.className);
        Dom.addClass(el, obj.className)
      } else { // REMOVE CLASS
        Dom.removeClass(el, obj.className)
      }

    })

  },

  addWhenTrue: function(obj) {

    if (!Array.isArray(obj.el)) { obj.el = [obj.el]; }

    obj.el.forEach(function(el) {
      var el = Dom.queryAll(el);
      if (obj.bool) { // ADD CLASS
        Dom.addClass(el, obj.className)
      } else { // REMOVE CLASS
        Dom.removeClass(el, obj.className)
      }

    })

  },

  applySetting: function(obj) {
    atom.config.set(obj.config, obj.val);
    this[obj.action]({
      el: obj.el,
      className: obj.className,
      bool: obj.val
    });
    atom.config.onDidChange(obj.config, (value) => {
      if (value.oldValue !== value.newValue && typeof obj.cb === 'function') {
        obj.cb(value.newValue)
      }
    });
  }

}

export {Utility};
