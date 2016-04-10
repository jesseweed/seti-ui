settings = require('./settings')

module.exports =
  activate: (state) ->
    console.log 'seti activated'
    settings.init()

  deactivate: ->
    console.log 'seti deactivated'
