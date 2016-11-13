atom.packages.activatePackage('tree-view').then (tree) ->
  IS_ANCHORED_CLASSNAME = 'is--anchored'

  treeView = tree.mainModule.treeView
  projectRoots = treeView.roots

  updateTreeViewHeaderPosition = ->
    yScrollPosition = treeView.scroller[0].scrollTop

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
  treeView.scroller.on 'scroll', updateTreeViewHeaderPosition

  setTimeout -> # TODO something other than setTimeout?
    updateTreeViewHeaderPosition()
