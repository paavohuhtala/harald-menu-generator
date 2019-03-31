import { maybe, oneOf, evaluate, t, lift } from "./dsl"
import { upperFirst, random, range } from "lodash/fp"
import { wordList, prependAll, nOf, natListFi, mapAll, compoundFi } from "./util"
import { fullName } from "./name"

const maybeWord = x => oneOf(" ", [" ", x, " "])

const [positiveAdjective, positiveAdjectivePlural, positiveAdjectivePossessive, positiveAdjectivePluralPosessive, positiveAdverb, positivePartitive, positiveInessive] = wordList([
  ["kestävä", "kestävät", "kestävän", "kestävien", "kestävästi", "kestävää", "kestävässä"],
  ["skaalautuva", "skaalautuvat", "skaalautuvan", "skaalautuvien", "skaalautuvasti", "skaalautuvaa", "skaalautuvassa"],
  ["innovatiivinen", "innovatiiviset", "innovatiivisen", "innovatiivisten", "innovatiivisesti", "innovatiivista", "innovatiivisessa"]
  ["ketterä", "ketterät", "ketterän", "ketterien", "ketterästi", "ketterää", "ketterässä"],
  ["avoin", "avoimet", "avoimen", "avoimien", "avoimesti", "avointa", "avoimessa"],
  ["yhteisöllinen", "yhteisölliset", "yhteisöllisen", "yhteisöllisten", "yhteisöllisesti", "yhteisöllistä", "yhteisöllisessä"],
  ["inhimillinen", "inhimilliset", "inhimillisen", "inhimillisten", "inhimillisesti", "inhimillistä", "inhimillisessä"],
  ["ymmärrettävä", "ymmärrettävät", "ymmärrettävän", "ymmärrettävien", "ymmärettävästi", "ymmärrettävää", "ymmärettävässä"],
  ["tehokas", "tehokkaat", "tehokkaan", "tehokkaiden", "tehokkaasti", "tehokasta", "tehokkaassa"],
  ["moderni", "modernit", "modernin", "modernien", "modernisti", "modernia", "modernissa"],
  ["nykyaikainen", "nykyaikaiset", "nykyaikaisen", "nykyaikaisten", "nykyaikaisesti", "nykyaikaista", "nykyaikaisessa"],
  ["kasvava", "kasvavat", "kasvavan", "kasvavien", "kasvavasti", "kasvavaa", "kasvavassa"],
  ["digitaalinen", "digitaaliset", "digitaalisen", "digitaalisten", "digitaalisesti", "digitaalista", "digitaalisessa"],
  ["selkeä", "selkeät", "selkeän", "selkeiden", "selkeästi", "selkeää", "selkeässä"],
])

const tla = oneOf(
  "AI",
  "ML",
  "CI",
  "BS",
  "XP",
  "AWS",
  "API",
  "JVM",
  "KPI",
  "ROI",
  "SAP",
  "JVM",
  "BPA",
  "SVN",
  "GNU",
  "CMDB",
  "ITSM",
  "XML",
  "JSON",
  "REST",
  "SQL",
  "PHP",
  "JIRA",
  "SAFE"
)

const subjectPrefix = oneOf(
  "yritys",
  "talous",
  "rajapinta", 
  "pilvi",
  "digi",
  "tietokanta",
  "johtamis",
  "tekoäly",
  "palvelu",
  "alusta",
  "kokonais",
  "lohkoketju",
  "mikropalvelu",
  "nanopalvelu",
  "muutos",
  [tla, "-"],
  "GraphQL-",
)

const withPrefix = (prefix, arr) => mapAll(x => compoundFi(prefix, x), arr)

const [subject, subjectPlural, subjectPossessive, subjectPluralPosessive, toSubject, subjectPartitive] = wordList([
  prependAll(oneOf("API-", "rajapinta", "alusta"), ["talous", "taloudet", "talouden", "talouksien", "talouteen", "taloutta"]),
  withPrefix(maybe(subjectPrefix), ["ekosysteemi", "ekosysteemit", "ekosysteemin", "ekosysteemien", "ekosysteemiin", "ekosysteemiä"]),
  withPrefix(maybe(subjectPrefix), ["arkkitehtuuri", "arkkitehtuurit", "arkkitehtuurin", "arkkitehtuurien", "arkkitehtuuriin", "arkkitehtuuria"]),
  withPrefix(maybe(subjectPrefix), ["viitekehys", "viitekehykset", "viitekehyksen", "viitekehysten", "viitekehykseen", "viitekehystä"]),
  withPrefix(maybe(subjectPrefix), ["integraatio", "integraatiot", "integraation", "integraatioiden", "integraatioon", "integraatiota"]),
  withPrefix(maybe(subjectPrefix), ["alusta", "alustat", "alustan", "alustojen", "alustaan", "alustaa"]),
  withPrefix(maybe(subjectPrefix), ["prosessi", "prosessit", "prosessin", "prosessien", "prosessiin", "prosesssia"]),
  withPrefix(maybe(subjectPrefix), ["järjestelmä", "järjestelmät", "järjestestelmän", "järjestelmien", "järjestelmään", "järjestelmää"])
])

const buzzword = [
  "tekoäly",
  "koneoppiminen",
  "big data",
  "Hadoop",
  "MapReduce",
  "MongoDB",
  "Rails",
  "Scrum",
  "Kanban",
  "integraatiot",
  "rajapinnat",
  "alustatalous",
  "lohkoketjut",
  "Ethereum",
  "Bitcoin",
  "Watson",
  "DB2",
  "serverless",
  "Spring",
  "Azure",
  "Salesforce",
  "digitalisaatio",
  tla,
  [oneOf("API", "dev", "AI", "ML", "XML", "JSON", "REST", "SQL", "DB", "SOAP", "SAFE", "ledger", "coin"), "ops"]
]

const aBuzzword = oneOf(...buzzword)

const buzzwords = () => natListFi(nOf(random(1, 4), buzzword))

const [verb] = wordList([
  ["integrointi"],
  ["kehittäminen"],
  ["rakentaminen"],
  ["ulkoistus"],
  ["optimointi"],
  ["ketteröitys"],
  ["kehitys"],
  ["implementaatio"],
  ["kiihdytys"],
  ["estimointi"],
  ["monetisaatio"]
])

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
  "julkishallinnossa",
  "konesalissa",
  "pilvessä",
  "prosessien automaatiossa",
  "prosessiautomaatiossa",
  "logistiikassa",
  "taulukkolaskennassa"
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

const inEcosystem = compoundFi(maybe(subjectPrefix), oneOf(
  "ekosysteemissä",
  "yhteisössä",
  "markkinassa",
  "ympäristössä"
))

const [problem, problems, toProblems] = wordList([
  ["haaste", "haasteet", "haasteisiin"],
  ["ongelma", "ongelmat", "ongelmiin"],
  ["kipupiste", "kipupisteet", "kipupisteisiin"],
  ["kipukohta", "kipukohdat", "kipukohtiin"],
  ["rajoite", "rajoitteet", "rajoitteisiin"]
])

const rhetoricalQuestion = oneOf(
  "uhka vai mahdollisuus?",
  t`${subjectPossessive} ${problem} vai${maybeWord(positiveAdjective)}kilpailuetu?`,
  "miten aloitan?",
  [subjectPossessive, " tulevaisuus?"],
  [subjectPluralPosessive, " tulevaisuus?"],
  "miksi?"
)

const presentationName = oneOf(
  t`${positiveAdjectivePluralPosessive} ${subjectPluralPosessive} ${positiveAdjective} ${verb}${maybe(situationSuffix)}`,
  t`${positiveAdjectivePossessive} ${subjectPossessive} ${positiveAdjective} ${verb}${maybe(situationSuffix)}`,
  t`${oneOf(subjectPossessive, subjectPluralPosessive)}${maybeWord(positiveAdjective)}${verb}${maybe(situationSuffix)}`,
  t`${buzzwords} - ${rhetoricalQuestion}`,
  t`${subjectLike} - ${subjectPossessive} ${oneOf('toinen', 'kolmas', 'neljäs')} ${oneOf('aalto', 'tuleminen', 'vaihe')}?`,
  t`${subjectLike} ${inOrganization}`,
  t`Esittelyssä ${oneOf(tla, randomAcronym)} - ${solutionLike} ${subjectPossessive} ${toProblems}?`,
  t`${subjectLike} vs ${subjectLike}`,
  t`${oneOf("Elements of", "Introduction to")} ${aBuzzword}`,
  t`${maybe([oneOf("kun", "entä jos", "entäs jos", "mitä jos"), " "])} ${aBuzzword} ei riitä - ${oneOf("miten", "kuinka")} ${oneOf("pärjätä", "selvitä", "menestyä")} ${thingToSupport} ${inEcosystem}?`,
  t`${aBuzzword} vie työt (mutta mahdollistaa vielä enemmän uutta)`,
  t`Kohti ${positivePartitive} ${subjectPartitive}${maybe(t` - ${positiveAdverb}`)}`,
  t`Kohti ${positivePartitive} ${subjectPartitive}${maybe(t` - ${oneOf("neuvoksi", "avuksi", "tueksi")} ${buzzwords}`)}`,
  [maybe([positiveAdjective, " "]), t`${subject} ${thingToSupport} ${asSupport}`],
  t`${positiveAdjectivePlural} ${subjectPlural} ${situationSuffix}`,
  t`${positiveAdjectivePlural} ${subjectPlural} - ${positiveAdverb}${maybe(t` ja ${positiveAdverb}`)}`,
  t`${positiveAdjectivePlural} ${subjectPlural} - ${rhetoricalQuestion}`,
  t`${positiveAdjectivePlural} ${subjectPlural} - ${solutionLike} ${toSubject}${maybe("?")}`,
  t`${buzzwords}${maybeWord(positiveInessive)}${situationSuffix}`,
  t`${thingToSupport} ${problems} ja ${subjectLike}`,
)

const upperFirstT = lift(upperFirst)

export const generatePresentation = () => ({
  title: evaluate(upperFirstT(presentationName)),
  author: {
    name: evaluate(fullName)
  }
})
