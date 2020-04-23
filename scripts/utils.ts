export const filterKeys = <T>(contents: { [key: string]: T }, fn: (key: string) => boolean) =>
  Object.entries(contents)
    .filter(([key]) => fn(key))
    .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {} as { [key: string]: T })

export const mapValues = <T, P>(obj: { [key: string]: T }, fn: (el: T) => P) =>
  Object.entries(obj).reduce(
    (acc, [key, val]) => ({ ...acc, [key]: fn(val) }),
    {} as { [key: string]: P }
  )

export const stripExt = (str: string) => str.replace(/\.[^/.]+$/, '')
