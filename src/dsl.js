import { zip, concat, shuffle, isFunction, isString, isArray, sample, head, last, random, sum } from "lodash/fp"

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

export const oneOfCanRepeat = (...arr) => () => sample(arr)

export const oneOfWeighted = (...arr) => {
  const cdf = arr.map(head).reduce((acc, x) => [...acc, last(acc) + x], [0])
  const total = sum(arr.map(head))

  return () => {
    const p = random(total, true)
    const i = cdf.findIndex(x => x > p)
    return arr[i - 1][1]
  }
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
  } else {
    return "UNDEFINED"
  }
}

export const t = (strings, ...exprs) =>
  zip(strings, exprs).map(pair => pair.filter(x => x !== undefined)).reduce(concat, [])
