import firstNames from "./firstnames.json"
import surnames from "./surnames.json"
import { oneOf, t } from "./dsl.js"

const firstName = oneOf(...firstNames)
const surname = oneOf(...surnames)

export const fullName = t`${firstName} ${surname}`
