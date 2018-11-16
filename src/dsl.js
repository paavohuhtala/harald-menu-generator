import { sample, isFunction, isString, isArray } from "lodash/fp"

export const oneOf = (...arr) => () => sample(arr)
export const maybe = x => () => oneOf(x, "")
export const compose = (f, pattern) => () => f(pattern())
export const pipe = (pattern, f) => compose(f, pattern)

export const evaluate = x => {
  if (isFunction(x)) {
    return evaluate(x())
  } else if (isString(x)) {
    return x
  } else if (isArray(x)) {
    return x.map(evaluate).join("")
  }
}