path = atom.packages.getLoadedPackage('seti-super-compact-ui').path + '/lib/dom'
Dom = require(path)

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
    console.log obj

    # CONVERT TO AN ARRAY IF NOT
    if !Array.isArray(obj.el)
      obj.el = [ obj.el ]

    obj.el.forEach (element) ->

      el = Dom.queryAll(element) #FIND ELEMENT IN DOM

      if obj.bool
        Dom.addClass el, obj.className # ADD CLASS
      else
        Dom.removeClass el, obj.className # REMOVE CLASS

  addCompact: (obj) ->
    console.log obj

    # CONVERT TO AN ARRAY IF NOT
    if !Array.isArray(obj.el)
      obj.el = [ obj.el ]

    obj.el.forEach (element) ->

      el = Dom.queryAll(element) #FIND ELEMENT IN DOM

      Dom.addClass el, obj.className.classes.add # ADD CLASS
      obj.className.classes.remove.forEach (c) ->
        Dom.removeClass el, c # REMOVE CLASS


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

  getClassNames: (val) ->
    switch val
      when 'Normal'
        classes:
          add: 'seti-normal'
          remove: ['seti-compact', 'seti-super-compact']
      when 'Compact'
        classes:
          add: 'seti-compact'
          remove: ['seti-normal', 'seti-super-compact']
      when 'Super Compact'
        classes:
          add: 'seti-super-compact'
          remove: ['seti-normal', 'seti-compact']
