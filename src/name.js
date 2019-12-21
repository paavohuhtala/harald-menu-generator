import firstNames from "./firstnames.json"
import surnames from "./surnames.json"

import firstNamesEn from "./firstnames-en.json"
import surnamesEn from "./surnames-en.json"

import { oneOf, t } from "./dsl.js"

export const firstName = oneOf(...firstNames)
export const surname = oneOf(...surnames)

export const fullName = t`${firstName} ${surname}`

export const firstNameEn = oneOf(...firstNamesEn)
export const surnameEn = oneOf(...surnamesEn)

export const fullNameEn = t`${firstNameEn} ${surnameEn}`
