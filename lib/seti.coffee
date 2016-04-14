settings = require('./settings')

module.exports =
  activate: (state) ->
    settings.init()

  deactivate: ->
