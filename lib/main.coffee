module.exports =
  activate: (state) ->
    require( atom.packages.getLoadedPackage('seti-ui').path + '/lib/settings').init()
