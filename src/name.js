import firstNames from "./firstnames.json"
import surnames from "./surnames.json"
import { oneOf, t } from "./dsl.js"

export const firstName = oneOf(...firstNames)
export const surname = oneOf(...surnames)

export const fullName = t`${firstName} ${surname}`
