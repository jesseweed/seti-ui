atom.packages.activatePackage('tree-view').then(({ mainModule: { treeView } }) => {
  const IS_ANCHORED_CLASSNAME = 'is--anchored'
  let projectRoots = treeView.roots

  const updateTreeViewHeaderPosition = () => {
    const position = { scrollTop: 0, ...treeView.scroller }
    const yScrollPosition = position.scrollTop
    projectRoots.forEach((project) => {
      const projectHeaderHeight = project.header.offsetHeight
      const projectClassList = project.classList
      const projectOffsetY = project.offsetTop
      const projectHeight = project.offsetHeight
      if (yScrollPosition > projectOffsetY) {
        if (yScrollPosition > projectOffsetY + projectHeight - projectHeaderHeight) {
          project.header.style.top = 'auto'
          projectClassList.add(IS_ANCHORED_CLASSNAME)
        } else {
          project.header.style.top = yScrollPosition - projectOffsetY + 'px'
          projectClassList.remove(IS_ANCHORED_CLASSNAME)
        }
      } else {
        project.header.style.top = '0'
        projectClassList.remove(IS_ANCHORED_CLASSNAME)
      }
    })
  }

  atom.project.onDidChangePaths(() => {
    projectRoots = treeView.roots
    updateTreeViewHeaderPosition()
  })
  // TODO something other than setTimeout? it's a hack to trigger the update
  // after the CSS changes have occurred. a gamble, probably inaccurate
  atom.config.onDidChange('seti-ui', () => setTimeout(updateTreeViewHeaderPosition))

  treeView.scroller.addEventListener('scroll', updateTreeViewHeaderPosition)
  setTimeout(updateTreeViewHeaderPosition) // TODO something other than setTimeout?
})
