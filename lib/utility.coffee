Dom = require(atom.packages.getLoadedPackage('seti-ui').path + '/lib/dom')

module.exports =

  # ADD CLASS WHEN CONDITIONAL IS FALSE
  addWhenFalse: (obj) ->


    # CONVERT TO AN ARRAY IF NOT
    if !Array.isArray(obj.el)
      obj.el = [ obj.el ]

    obj.el.forEach (element) ->

      el = Dom.queryAll(element) #FIND ELEMENT IN DOM

      if !obj.bool
        Dom.addClass el, obj.className # ADD CLASS
      else
        Dom.removeClass el, obj.className # REMOVE CLASS


  # ADD CLASS WHEN CONDITIONAL IS TRUE
  addWhenTrue: (obj) ->


    # CONVERT TO AN ARRAY IF NOT
    if !Array.isArray(obj.el)
      obj.el = [ obj.el ]

    obj.el.forEach (element) ->

      el = Dom.queryAll(element) #FIND ELEMENT IN DOM

      if obj.bool
        Dom.addClass el, obj.className # ADD CLASS
      else
        Dom.removeClass el, obj.className # REMOVE CLASS


  applySetting: (obj) ->


    # APPLY A NEW SETTING
    atom.config.set obj.config, obj.val

    @[obj.action]
      el: obj.el
      className: obj.className
      bool: obj.val

      atom.config.onDidChange obj.config, (value) ->
        if value.oldValue != value.newValue and typeof obj.cb == 'function'
          obj.cb value.newValue
