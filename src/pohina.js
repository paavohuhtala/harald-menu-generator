import { maybe, oneOf, evaluate, t, lift } from "./dsl"
import { upperFirst, random, range, startCase, nth } from "lodash/fp"
import { wordList, prependAll, nOf, natListFi, mapAll, compoundFi } from "./util"
import { fullName } from "./name"

const maybeWord = x => oneOf(" ", [" ", x, " "])
const maybeWordL = x => oneOf("", [" ", x])
const maybeWordR = x => oneOf("", [x, " "])

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

const buzzwordCommon = [
  "big data",
  "data",
  "Hadoop",
  "MapReduce",
  "MongoDB",
  "Rails",
  "Scrum",
  "Kanban",
  "Ethereum",
  "Bitcoin",
  "Watson",
  "DB2",
  "Serverless",
  "Spring",
  "Azure",
  "Salesforce",
  "Blockhain",
  "ITIL 4",
  "SIAM",
  "VeriSM",
  tla,
  [oneOf("API", "dev", "AI", "ML", "XML", "JSON", "REST", "SQL", "DB", "SOAP", "SAFE", "ledger", "coin"), "ops"]
]

const buzzwordEn = [
  ...buzzwordCommon,
  "Integration",
  "Platforms",
  "Machine Learning",
  "Artificial Intelligence",
  "Application Programming Interface",
  "Digitalization",
]

const buzzwordFi = [
  ...buzzwordCommon,
  "tekoäly",
  "koneoppiminen",
  "integraatiot",
  "rajapinnat",
  "alustatalous",
  "lohkoketjut",
  "digitalisaatio",
  "konenäkö"
]

const aBuzzword = oneOf(...buzzwordFi)

const buzzwords = () => natListFi(nOf(random(1, 4), buzzwordFi))

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
  "taulukkolaskennassa"
)

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
  t`${positiveAdjectivePluralPosessive} ${subjectPluralPosessive} ${positiveAdjective} ${verb}${maybeWordL(situation)}`,
  t`${positiveAdjectivePossessive} ${subjectPossessive} ${positiveAdjective} ${verb}${maybeWordL(situation)}`,
  t`${oneOf(subjectPossessive, subjectPluralPosessive)}${maybeWord(positiveAdjective)}${verb}${maybeWordL(situation)}`,
  t`${buzzwords} - ${rhetoricalQuestion}`,
  t`${subjectLike} - ${subjectPossessive} ${oneOf('toinen', 'kolmas', 'neljäs')} ${oneOf('aalto', 'tuleminen', 'vaihe')}?`,
  t`${subjectLike} ${inOrganization}`,
  t`Esittelyssä ${oneOf(tla, randomAcronym)} - ${solutionLike} ${subjectPossessive} ${toProblems}?`,
  t`${subjectLike} vs ${subjectLike}`,
  t`${oneOf("Elements of", "Introduction to")} ${aBuzzword}`,
  t`${maybe([oneOf("kun", "entä jos", "entäs jos", "mitä jos"), " "])}${aBuzzword} ei riitä - ${oneOf("miten", "kuinka")} ${oneOf("pärjätä", "selvitä", "menestyä")} ${thingToSupport} ${inEcosystem}?`,
  t`${aBuzzword} vie työt (mutta mahdollistaa vielä enemmän uutta)`,
  t`Kohti ${positivePartitive} ${subjectPartitive}${maybe(t` - ${positiveAdverb}`)}`,
  t`Kohti ${positivePartitive} ${subjectPartitive}${maybe(t` - ${oneOf("neuvoksi", "avuksi", "tueksi")} ${buzzwords}`)}`,
  t`${maybeWordR(positiveAdjective)}${subject} ${thingToSupport} ${asSupport}`,
  t`${positiveAdjectivePlural} ${subjectPlural} ${situation}`,
  t`${positiveAdjectivePlural} ${subjectPlural} - ${positiveAdverb}${maybe(t` ja ${positiveAdverb}`)}`,
  t`${positiveAdjectivePlural} ${subjectPlural} - ${rhetoricalQuestion}`,
  t`${positiveAdjectivePlural} ${subjectPlural} - ${solutionLike} ${toSubject}${maybe("?")}`,
  t`${buzzwords} ${situation}`,
  t`${thingToSupport} ${problems} ja ${subjectLike}`,
)

const upperFirstT = lift(upperFirst)

const seniorityPrefix = oneOf(
  "Senior",
  "Junior"
)

const rank = oneOf(
  "Chief",
  "Leading",
  "Vice",
  "Head"
)

const titleSubject = oneOf(
  oneOf(...buzzwordEn),
  "Outsourcing",
  "Innovation",
  "Automation",
  "Data Processing",
  t`Business Process${maybeWordL(oneOf("Automation", "Configuration", "Acceleration"))}`,
  "Service Management",
  "Operating",
  "Operations",
  "Quality",
  "Customer Satisfaction",
  "Profit",
  "Process",
  "Digital Business",
  "Financial"
)

const baseTitle = oneOf(
  "Manager",
  "Officer",
  "Director",
  "Engineer",
  "Evangelist",
  "Architect",
  "Consultant",
  "Futurist",
  "Analyst",
  "Designer",
  "Developer",
  "Digitalist",
  "Expert",
  "Trainer",
  "Innovationeer"
)

const bonusTitle = oneOf(
  "TEDx speaker",
  "journalist",
  "writer",
  "humanist",
  "co-founder",
  "lecturer",
  "politician",
  "Twitter user",
  "biker",
  "cyclist",
  "Founder",
  "Chairman",
  "dad",
  "mom",
  "runner",
  "vegan"
)

const bonusTitles = () => ", " + range(0, random(1, 3)).map(bonusTitle).map(evaluate).join(", ")

const titleCase = lift(x => x.split(" ").map(upperFirst).join(" "))

const acronymize = x => () => {
  const fx = evaluate(x)

  const acronym = fx.split(" ").map(nth(0)).join("")
  return `${acronym} (${fx})`
}

const maybeMap = (f, x) => () => oneOf(
  f(x),
  x,
)

const title = [maybeMap(acronymize, titleCase(oneOf(
  t`${maybeWordR(seniorityPrefix)}${maybeWordR(rank)}${titleSubject} ${baseTitle}`,
  t`${maybeWordR(seniorityPrefix)}${baseTitle} of ${titleSubject}`,
  t`${baseTitle}, ${titleSubject} department`
))), maybe(bonusTitles)]

export const generatePresentation = () => ({
  title: evaluate(upperFirstT(presentationName)),
  author: {
    name: evaluate(fullName),
    title: evaluate(title)
  }
})
