import { oneOf, evaluate } from "./dsl"
import { unzip, reject, eq, shuffle } from "lodash/fp"

export const __ = Symbol("placeholder")

export const prependAll = (pre, arr) => arr.map(x => x === __ ? __ : [pre, x])
export const mapAll = (f, arr) => arr.map(x => x === __ ? __ : f(x))

export const wordList = ls => unzip(ls).map(words => oneOf(...reject(eq(__), words)))

export const sepBy = (x, arr) => () => arr.join(x)
export const nOf = (n, arr) => shuffle(arr).slice(0, n)

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

export const compoundFi = (a, b) => () => {
  const ax = evaluate(a)
  const bx = evaluate(b)

  const axLast = ax[ax.length - 1]

  if (axLast !== '-' && bx.endsWith(axLast)) {
    return `${ax}-${bx}`
  } else {
    return `${ax}${bx}`
  }
}
