import { maybe, oneOf, evaluate } from "./dsl"
import { upperFirst, random } from "lodash/fp"
import { wordList, prependAll, nOf, natListFi } from "./util";

const [positiveAdjective, positiveAdjectivePlural, positiveAdjectivePossessive, positiveAdjectivePluralPosessive, positiveAdverb] = wordList([
  ["kestävä", "kestävät", "kestävän", "kestävien", "kestävästi"],
  ["skaalautuva", "skaalautuvat", "skaalautuvan", "skaalautuvien", "skaalautuvasti"],
  ["innovatiivinen", "innovatiiviset", "innovatiivisen", "innovatiivisten", "innovatiivisesti"]
  ["ketterä", "ketterät", "ketterän", "ketterien", "ketterästi"],
  ["ketterä", "ketterät", "ketterän", "ketterien", "ketterästi"],
  ["avoin", "avoimet", "avoimen", "avoimien", "avoimesti"],
])

const subjectPrefix = oneOf(
  "yritys",
  "talous",
  "rajapinta-", 
  "pilvi",
  "tietokanta-",
  "johtamis",
  "tekoäly",
  "palvelu",
  "XML-",
  "REST-",
  "API-",
  "GraphQL-",
  "alusta-",
  "kokonais",
  "lohkoketju",
  "mikropalvelu",
  "nanopalvelu"
)

const [subject, subjectPlural, subjectPossessive, subjectPluralPosessive, toSubject] = wordList([
  prependAll(oneOf("API-", "rajapinta"), ["talous", "taloudet", "talouden", "talouksien", "talouteen"]),
  prependAll(maybe(subjectPrefix), ["ekosysteemi", "ekosysteemit", "ekosysteemin", "ekosysteemien", "ekosysteemiin"]),
  prependAll(maybe(subjectPrefix), ["arkkitehtuuri", "arkkitehtuurit", "arkkitehtuurin", "arkkitehtuurien", "arkkitehtuuriin"])
])

const buzzword = [
  "tekoäly",
  "koneoppiminen",
  "big data",
  "integraatiot",
  "rajapinnat",
  "alustatalous",
  "lohkoketjut",
  "Ethereum",
  "Bitcoin",
  "Watson",
  "JIRA",
  "AWS",
  "DB2",
  "serverless",
  [oneOf("API", "dev", "AI", "ML", "XML", "JSON", "REST", "SQL", "DB", "SOAP", "SAFE", "ledger", "coin"), "ops"]
]

const buzzwords = () => natListFi(nOf(random(1, 3), buzzword))

const [verb] = wordList([
  ["integroiminen"],
  ["kehittäminen"],
  ["rakentaminen"],
  ["ulkoistaminen"],
  ["ketteröittäminen"],
  ["kiihdyttäminen"]
])

const growth = oneOf(
  "kasvu",
  "growthi",
  "kehitys"
)

const time = oneOf(
  "vuonna 2019",
  "vuonna 2020",
  "2010-luvulla",
  "2020-luvulla",
  "2030-luvulla",
)

const rhetoricalQuestion = oneOf(
  "uhka vai mahdollisuus?",
  "miten aloitan?",
  [subjectPluralPosessive, " tulevaisuus?"],
  "miksi?"
)

const pattern = oneOf(
  [positiveAdjectivePluralPosessive, " ", subjectPluralPosessive, " ", positiveAdjective, " ", verb, maybe([" ", time])],
  [positiveAdjectivePossessive, " ", subjectPossessive, " ", positiveAdjective, " ", verb],
  [subjectPossessive, " monetisaatio"],
  [buzzwords, " -  ", rhetoricalQuestion],
  [oneOf(oneOf(...buzzword), subject), " ", oneOf("organisaatiossa", "valtiohallinnossa", "henkilöstönhallinassa")],
  [maybe([positiveAdjective, " "]), subject, " liiketoiminnan tukena"],
  [positiveAdjectivePlural, " ", subjectPlural, oneOf(
    [" ", time],
    [" - ", positiveAdverb],
    [" - ", rhetoricalQuestion],
    [" - avain ", toSubject]
  )],
  [buzzwords, " ", time]
)

export const generatePresentation = () => upperFirst(evaluate(pattern))
