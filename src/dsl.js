import { zip, concat, shuffle, isFunction, isString, isArray } from "lodash/fp"

export const oneOf = (...items) => {
  let available = []
  
  const reset = () => {
    available = shuffle(items)
  }

  const pickOne = () => {
    if (available.length === 0) {
      reset()
    }

    return available.pop()
  }

  return pickOne
}


export const maybe = x => oneOf(x, "")
export const compose = (f, pattern) => () => f(pattern())
export const pipe = (pattern, f) => compose(f, pattern)

export const lift = f => x => () => f(evaluate(x))

export const evaluate = x => {
  if (isFunction(x)) {
    return evaluate(x())
  } else if (isString(x)) {
    return x
  } else if (isArray(x)) {
    return x.map(evaluate).join("")
  }
}

export const t = (strings, ...exprs) =>
  zip(strings, exprs).reduce(concat, [])
