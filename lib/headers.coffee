atom.packages.activatePackage('tree-view').then (tree) ->
  IS_ANCHORED_CLASSNAME = 'is--anchored'

  treeView = tree.mainModule.treeView
  projectRoots = treeView.roots

  updateTreeViewHeaderPosition = ->
    # Sometimes scroller ends up being undefined???
    # https://github.com/jesseweed/seti-ui/issues/424
    scroller = treeView.scroller?[0] ? treeView.scroller
    yScrollPosition = scroller?.scrollTop || 0

    for project in projectRoots
      projectHeaderHeight = project.header.offsetHeight
      projectClassList = project.classList
      projectOffsetY = project.offsetTop
      projectHeight = project.offsetHeight

      if yScrollPosition > projectOffsetY
        if yScrollPosition > projectOffsetY + projectHeight - projectHeaderHeight
          project.header.style.top = 'auto'
          projectClassList.add IS_ANCHORED_CLASSNAME
        else
          project.header.style.top = (yScrollPosition - projectOffsetY) + 'px'
          projectClassList.remove IS_ANCHORED_CLASSNAME
      else
        project.header.style.top = '0'
        projectClassList.remove IS_ANCHORED_CLASSNAME

  atom.project.onDidChangePaths ->
    projectRoots = treeView.roots
    updateTreeViewHeaderPosition()

  atom.config.onDidChange 'seti-ui', ->
    # TODO something other than setTimeout? it's a hack to trigger the update
    # after the CSS changes have occurred. a gamble, probably inaccurate
    setTimeout -> updateTreeViewHeaderPosition()
  if typeof treeView.scroller.on is 'function'
    treeView.scroller.on 'scroll', updateTreeViewHeaderPosition
  else
    treeView.scroller.addEventListener 'scroll', ->
      updateTreeViewHeaderPosition()

  setTimeout -> # TODO something other than setTimeout?
    updateTreeViewHeaderPosition()
