atom.packages.activatePackage('tree-view').then (tree) ->
  IS_ANCHORED_CLASSNAME = 'is--anchored'

  treeView = tree.mainModule.treeView
  projectRoots = treeView.roots

  updateTreeViewHeaderPosition = ->

    if treeView.scroller
      position = treeView.scroller[0] ? treeView.scroller
    else
      position = 0

    yScrollPosition = (position).scrollTop

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
