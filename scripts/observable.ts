import fs from 'fs'
import { Observable, from, merge } from 'rxjs'
import { mergeMap, scan, filter, auditTime, startWith } from 'rxjs/operators'

import { log, enqueue } from './logger'
import { DirContent } from './types'

export const promiseAll = async <T>(thunks: (() => Promise<T> | T)[], n = 0) => {
  if (n === 0) return Promise.all(thunks.map((thunk) => thunk()))
  const head = thunks.slice(0, n)
  const tail = thunks.slice(n)
  const result: T[] = []
  const execute = async (thunk: () => Promise<T> | T, i: number, runNext: () => Promise<void>) => {
    result[i] = await thunk()
    await runNext()
  }
  const runNext = async () => {
    const i = thunks.length - tail.length
    const promise = tail.shift()
    if (promise !== undefined) {
      await execute(promise, i, runNext)
    }
  }
  await Promise.all(head.map((thunk, i) => execute(thunk, i, runNext)))
  return result
}

export function fromCallback<T, P1, P2, P3, P4, P5>(
  fn: (arg: T, callback: (...args: [P1, P2, P3, P4, P5]) => unknown) => unknown
): (arg: T) => Observable<[P1, P2, P3, P4, P5]>
export function fromCallback<T, P1, P2, P3, P4>(
  fn: (arg: T, callback: (...args: [P1, P2, P3, P4]) => unknown) => unknown
): (arg: T) => Observable<[P1, P2, P3, P4]>
export function fromCallback<T, P1, P2, P3>(
  fn: (arg: T, callback: (...args: [P1, P2, P3]) => unknown) => unknown
): (arg: T) => Observable<[P1, P2, P3]>
export function fromCallback<T, P1, P2>(
  fn: (arg: T, callback: (...args: [P1, P2]) => unknown) => unknown
): (arg: T) => Observable<[P1, P2]>
export function fromCallback<T, P>(
  fn: (arg: T, callback: (...args: [P]) => unknown) => unknown
): (arg: T) => Observable<[P]>
export function fromCallback<T, P>(fn: (arg: T, callback: (...args: P[]) => unknown) => unknown) {
  return (arg: T) =>
    new Observable<P[]>((subscriber) => {
      try {
        fn(arg, (...args: P[]) => subscriber.next(args))
      } catch (e) {
        subscriber.error(e)
      }
    })
}

export function mapSpread<T, P>(
  fn: (...args: [T]) => P,
  concurrent?: number
): (obs: Observable<[T]>) => Observable<P>
export function mapSpread<T1, T2, P>(
  fn: (...args: [T1, T2]) => P | Promise<P>,
  concurrent?: number
): (obs: Observable<[T1, T2]>) => Observable<P>
export function mapSpread<T1, T2, T3, P>(
  fn: (...args: [T1, T2, T3]) => P | Promise<P>,
  concurrent?: number
): (obs: Observable<[T1, T2, T3]>) => Observable<P>
export function mapSpread<T1, T2, T3, T4, P>(
  fn: (...args: [T1, T2, T3, T4]) => P | Promise<P>,
  concurrent?: number
): (obs: Observable<[T1, T2, T3, T4]>) => Observable<P>
export function mapSpread<T1, T2, T3, T4, T5, P>(
  fn: (...args: [T1, T2, T3, T4, T5]) => P | Promise<P>,
  concurrent?: number
): (obs: Observable<[T1, T2, T3, T4, T5]>) => Observable<P>
export function mapSpread<T, P>(fn: (...args: T[]) => P | Promise<P>, concurrent?: number) {
  return (obs: Observable<T[]>) => mergeMap(async (arr: T[]) => fn(...arr), concurrent)(obs)
}

export const readFile = (file: string) => from(fs.promises.readFile(file, 'utf-8'))

export const observeFile = (file: string) =>
  fromCallback(fs.watchFile)(file).pipe(
    startWith(true),
    mergeMap(() => readFile(file))
  )

export const readDir = <T>(
  dir: string,
  loadFn: (names: string[]) => T[] | Promise<T[]>,
  fileFilter: (file: string) => boolean = () => true
) =>
  from(fs.promises.readdir(dir)).pipe(
    mergeMap(async (arr) => {
      log('info', `Loading files...`)
      try {
        const filtered = arr.filter(fileFilter)
        const content = await loadFn(filtered)
        return filtered
          .map((file, i) => ({ [file]: content[i] }))
          .reduce((acc, curr) => ({ ...acc, ...curr })) as DirContent<T>
      } catch (e) {
        enqueue('error', e.stack ? e.stack : e)
        return {}
      }
    })
  )

export const watchDir = <T>(
  dir: string,
  loadFn: (names: string[]) => T[] | Promise<T[]>,
  fileFilter: (file: string) => boolean = () => true
) =>
  fromCallback(fs.watch)(dir).pipe(
    filter(([, filename]) => fileFilter(filename)),
    auditTime(500),
    mapSpread(async (eventType: string, filename: string) => {
      log('info', `Loading file ${filename}`)
      return {
        filename,
        content: eventType === 'rename' ? null : (await loadFn([filename]))[0]
      }
    }),
    scan(
      (acc, { filename, content }) =>
        content === null
          ? Object.entries(acc)
              .filter(([key]) => key !== filename)
              .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {})
          : { ...acc, [filename]: content },
      {} as DirContent<T>
    )
  )

export const observeDir = <T>(
  dir: string,
  loadFn: (names: string[]) => T[] | Promise<T[]>,
  fileFilter: (file: string) => boolean = () => true
) =>
  merge(readDir(dir, loadFn, fileFilter), watchDir(dir, loadFn, fileFilter)).pipe(
    scan((acc, curr) => ({ ...acc, ...curr }))
  )
