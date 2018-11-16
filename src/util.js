import { oneOf } from "./dsl"
import { unzip } from "lodash/fp"

export const prependAll = (pre, arr) => arr.map(x => [pre, x])
export const wordList = ls => unzip(ls).map(words => oneOf(...words))
