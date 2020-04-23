declare module 'atom' {
  type ProjectElement = HTMLElement & { header: HTMLElement }

  interface TreeView {
    roots: ProjectElement[]
    scroller: HTMLElement
  }

  interface Package {
    activate?: () => void
    deactivate?: () => void
    mainModule: { treeView: TreeView }
  }
}

interface Dispatch {
  selectors: string[] | string
  className: string
}

export type Action = (args: Dispatch & { bool: boolean }) => void

export type Config = Dispatch & { config: string; action: Action }
