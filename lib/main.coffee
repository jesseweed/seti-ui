module.exports =
  activate: (state) ->
    require( atom.packages.getLoadedPackage('seti-super-compact-ui').path + '/lib/settings').init()
