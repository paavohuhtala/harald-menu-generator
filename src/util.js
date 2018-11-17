import { oneOf } from "./dsl"
import { unzip, reject, eq } from "lodash/fp"

export const __ = Symbol("placeholder")

export const prependAll = (pre, arr) => arr.map(x => x == __ ? __ : [pre, x])
export const wordList = ls => unzip(ls).map(words => oneOf(...reject(eq(__), words)))
