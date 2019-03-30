import { maybe, oneOf, evaluate, t } from "./dsl"
import { upperFirst, random, range } from "lodash/fp"
import { wordList, prependAll, nOf, natListFi } from "./util";

const maybeWord = x => oneOf(" ", [" ", x, " "])

const [positiveAdjective, positiveAdjectivePlural, positiveAdjectivePossessive, positiveAdjectivePluralPosessive, positiveAdverb] = wordList([
  ["kestävä", "kestävät", "kestävän", "kestävien", "kestävästi"],
  ["skaalautuva", "skaalautuvat", "skaalautuvan", "skaalautuvien", "skaalautuvasti"],
  ["innovatiivinen", "innovatiiviset", "innovatiivisen", "innovatiivisten", "innovatiivisesti"]
  ["ketterä", "ketterät", "ketterän", "ketterien", "ketterästi"],
  ["avoin", "avoimet", "avoimen", "avoimien", "avoimesti"],
  ["yhteisöllinen", "yhteisölliset", "yhteisöllisen", "yhteisöllisten", "yhteisöllisesti"],
  ["inhimillinen", "inhimilliset", "inhimillisen", "inhimillisten", "inhimillisesti"],
  ["ymmärrettävä", "ymmärrettävät", "ymmärrettävän", "ymmärrettävien", "ymmärettävästi"]
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
  "nanopalvelu",
)

const [subject, subjectPlural, subjectPossessive, subjectPluralPosessive, toSubject] = wordList([
  prependAll(oneOf("API-", "rajapinta"), ["talous", "taloudet", "talouden", "talouksien", "talouteen"]),
  prependAll(maybe(subjectPrefix), ["ekosysteemi", "ekosysteemit", "ekosysteemin", "ekosysteemien", "ekosysteemiin"]),
  prependAll(maybe(subjectPrefix), ["arkkitehtuuri", "arkkitehtuurit", "arkkitehtuurin", "arkkitehtuurien", "arkkitehtuuriin"]),
  ["viitekehys", "viitekehykset", "viitekehyksen", "viitekehysten", "viitekehykseen"],
  ["integraatio", "integraatiot", "integraation", "integraatioiden", "integraatioon"],
  ["alustatalous", "alustataloudet", "alustatalouden", "alustatalouksien", "alustatalouteen"],
  ["alusta", "alustat", "alustan", "alustojen", "alustaan"]
])

const buzzword = [
  "tekoäly",
  "AI",
  "koneoppiminen",
  "ML",
  "big data",
  "Hadoop",
  "MapReduce",
  "MongoDB",
  "Rails",
  "PHP",
  "Scrum",
  "Kanban",
  "SAFE",
  "XP",
  "API",
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
  "Spring",
  "Azure",
  "Salesforce",
  "SAP",
  [oneOf("API", "dev", "AI", "ML", "XML", "JSON", "REST", "SQL", "DB", "SOAP", "SAFE", "ledger", "coin"), "ops"]
]

const aBuzzword = oneOf(...buzzword)

const buzzwords = () => natListFi(nOf(random(1, 4), buzzword))

const [verb] = wordList([
  ["integrointi"],
  ["kehittäminen"],
  ["rakentaminen"],
  ["ulkoistus"],
  ["ketteröitys"],
  ["kiihdytys"],
  ["estimointi"],
  ["monetisaatio"]
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


const situation = oneOf(
  time,
  "esineiden internetissä",
  "lohkoketjussa",
  "kaupan alalla",
  "julkisella puolella",
  "opetuksessa",
  "logistiikassa",
  "Kelassa",
  "verotuksessa",
  "julkishallinnossa"
)

const situationSuffix = [" ", situation]

const thingToSupport = oneOf(
  "liiketoiminnan",
  "arkkitehtuurityön",
  "ohjelmistokehityksen",
  "digityön",
  "integraatiotyön",
  "estimoinnin",
  "konfiguraatiohallinnan"
)

const asSupport = oneOf(
  "tukena",
  "apuna",
  "apulaisena",
  "kannattelijana",
  "boostaajana"
)

const inOrganization = oneOf(
  "organisaatiossa",
  "valtiohallinnossa",
  "esimiestyössä",
  "johtoportaassa",
  "henkilöstönhallinnassa",
)

const randomChar = () => String.fromCharCode(random('A'.charCodeAt(0), 'Z'.charCodeAt(0)))

const tla = oneOf(
  "API",
  "JVM",
  "KPI",
  "ROI",
  "SAP",
  "JVM",
  "BPA",
  "CI",
  "SVN",
  "GNU",
  "BS",
  "CMDB",
  "ITSM"
)

const randomAcronym = () =>
  range(0, random(2, 4))
    .map(randomChar)
    .map((x, i) => i > 0 && Math.random() > 0.75 ? x.toLowerCase() : x)
    .join("")

const subjectLike = oneOf(
  aBuzzword,
  subject,
  tla,
  randomAcronym
)

const solutionLike = oneOf(
  "ratkaisu",
  "apukeino",
  "apu",
  "avain",
  "innovaatio"
)

const inEcosystem = oneOf(
  "ekosysteemissä",
  "yhteisössä",
  "markkinassa",
  "ympäristössä"
)

const [problem, toProblems] = wordList([
  ["haaste", "haasteisiin"],
  ["ongelma", "ongelmiin"],
  ["kipupiste", "kipupisteisiin"],
  ["kipukohta", "kipukohtiin"],
  ["rajoite", "rajoitteisiin"]
])

const rhetoricalQuestion = oneOf(
  "uhka vai mahdollisuus?",
  t`${subjectPossessive} ${problem} vai${maybeWord(positiveAdjective)}kilpailuetu?`,
  "miten aloitan?",
  [subjectPossessive, " tulevaisuus?"],
  [subjectPluralPosessive, " tulevaisuus?"],
  "miksi?"
)

const pattern = oneOf(
  t`${positiveAdjectivePluralPosessive} ${subjectPluralPosessive} ${positiveAdjective} ${verb}${maybe(situationSuffix)}`,
  t`${positiveAdjectivePossessive} ${subjectPossessive} ${positiveAdjective} ${verb}${maybe(situationSuffix)}`,
  t`${oneOf(subjectPossessive, subjectPluralPosessive)}${maybeWord(positiveAdjective)}${verb}`,
  t`${buzzwords} - ${rhetoricalQuestion}`,
  t`${subjectLike} - ${subjectPossessive} ${oneOf('toinen', 'kolmas', 'neljäs')} ${oneOf('aalto', 'tuleminen', 'vaihe')}?`,
  t`${subjectLike} ${inOrganization}`,
  t`Esittelyssä ${oneOf(tla, randomAcronym)} - ${solutionLike} ${subjectPossessive} ${toProblems}?`,
  t`${subjectLike} vs ${subjectLike}`,
  t`${oneOf("Elements of", "Introduction to")} ${aBuzzword}`,
  t`${maybe([oneOf("kun", "entä jos", "mitä jos"), " "])} ${aBuzzword} ei riitä - ${oneOf("miten", "kuinka")} ${oneOf("pärjätä", "selvitä", "menestyä")} ${thingToSupport} ${inEcosystem}?`,
  t`${aBuzzword} vie työt (mutta mahdollistaa vielä enemmän uutta)`,
  [maybe([positiveAdjective, " "]), t`${subject} ${thingToSupport} ${asSupport}`],
  [positiveAdjectivePlural, " ", subjectPlural, oneOf(
    situationSuffix,
    [" - ", positiveAdverb],
    [" - ", rhetoricalQuestion],
    [t` - ${solutionLike} ${toSubject}${maybe("?")}`]
  )],
  t`${buzzwords} ${situationSuffix}`
)

export const generatePresentation = () => upperFirst(evaluate(pattern))
