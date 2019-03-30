import { oneOf, evaluate } from "./dsl"
import { unzip, reject, eq, shuffle } from "lodash/fp"

export const __ = Symbol("placeholder")

export const prependAll = (pre, arr) => arr.map(x => x == __ ? __ : [pre, x])
export const wordList = ls => unzip(ls).map(words => oneOf(...reject(eq(__), words)))

export const sepBy = (x, arr) => () => arr.join(x)
export const nOf = (n, arr) => console.log(shuffle(arr).slice(0, n)) || shuffle(arr).slice(0, n)

export const natList = (sep, last) => arr => {
  const parts = arr.map(evaluate)

  if (parts.length === 0) {
    return ""
  }

  if (parts.length === 1) {
    return parts[0]
  }

  if (parts.length === 2) {
    const [a, b] = parts
    return `${a}${last}${b}`
  }

  return `${parts.slice(0, parts.length - 1).join(sep)}${last}${parts[parts.length - 1]}`
}

export const natListFi = natList(", ", " ja ")
