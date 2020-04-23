export const query = (el: string) => document.querySelector(el)
export const queryAll = (el: string) => document.querySelectorAll(el)
export const toggleClass = (action: 'add' | 'remove', el: NodeListOf<Element>, className: string) =>
  el.forEach((el) => el.classList[action](className))
export const addClass = (el: NodeListOf<Element>, className: string) =>
  toggleClass('add', el, className)
export const removeClass = (el: NodeListOf<Element>, className: string) =>
  toggleClass('remove', el, className)
