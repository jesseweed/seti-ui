export interface ColorVars {
  [x: string]: string
}

export interface ColorMap {
  [x: string]: string
}

export interface Mappings {
  [x: string]: string[]
}

export interface IconsObj {
  [x: string]: string
}

export interface Serializable {
  toString: () => string
}

export type RGBIndex = 'r' | 'g' | 'b'

export type RGBColor = {
  [I in RGBIndex]: number
}

export type IconsDiff = [IconsObj, IconsObj]

export interface LanguageDef {
  id: string
  extensions?: string[]
  fileNames?: string[]
}

export interface PackageJson {
  contributes?: {
    languages?: LanguageDef[]
  }
}

export interface DirContent<T> {
  [x: string]: T
}
