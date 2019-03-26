import { maybe, oneOf, evaluate } from "./dsl"
import { nth, upperFirst } from "lodash/fp"
import { wordList, prependAll } from "./util";

const [positiveAdjective, positiveAdjectivePossessive, positiveAdjectivePluralPosessive] = wordList([
  ["kestävä", "kestävän", "kestävien"],
  ["skaalautuva", "skaalautuvan", "skaalautuvien"],
  ["innovatiivinen", "innovatiivisen", "innovatiivisten"]
])

const subjectPrefix = oneOf(
  "yritys",
  "talous",
  "rajapinta", 
  "pilvi",
  "tietokanta",
  "johtamis",
  "tekoäly",
  "palvelu"
)

const [subject, subjectPossessive, subjectPluralPosessive] = wordList([
  prependAll(oneOf("API-", "rajapinta"), ["talous", "talouden", "talouksien"]),
  prependAll(maybe(subjectPrefix), ["ekosysteemi", "ekosysteemin", "ekosysteemien"]),
  prependAll(maybe(subjectPrefix), ["arkkitehtuuri", "arkkitehtuurin", "arkkitehtuurien"])
])

const growth = oneOf(
  "kasvu",
  "growthi",
  "kehitys"
)

const pattern = oneOf(
  [positiveAdjectivePluralPosessive, " ", subjectPluralPosessive],
  [positiveAdjectivePossessive, " ", subjectPossessive]
)

export const generatePresentation = () => upperFirst(evaluate(pattern))
