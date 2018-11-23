import { nth, upperFirst } from "lodash/fp"
import { maybe, oneOf, evaluate } from "./dsl"
import { prependAll, wordList, __ } from "./util"

const [firstName, firstNameP] = wordList([
  ["Harald", "Haraldin"],
  ["Helga", "Helgan"],
  ["Sven", "Svenin"],
  ["Asterix", "Asterixin"],
  ["Obelix", "Obelixin"],
  ["Conan", "Conanin"],
  ["Thor", "Thorin"],
  ["Björn", "Björnin"],
  ["Sigurd", "Sigurdin"],
  ["Ragnar", "Ragnarin"],
  ["Loki", "Lokin"],
  ["Fredrik", "Fredrikin"],
  ["Torbjörn", "Torbjörnin"],
  ["Väinämöinen", "Väinämöisen"],
  ["Mielikki", "Mielikin"],
  ["Ilmatar", "Ilmattaren"],
  ["Ilmarinen", "Ilmarisen"],
  ["Joukahainen", "Joukahaisen"],
  ["Freija", "Freijan"],
  ["Odin", "Odinin"],
  ["Arvid", "Arvidin"],
  ["Peppi", "Pepin"],
  ["Eemil", "Eemilin"],
  ["Eemeli", "Eemelin"]
])

const title = oneOf(
  "tietäjä",
  "heimopäällikkö",
  "viikinkipäällikkö",
  "shamaani",
  "trubaduuri",
  "kuningas",
  "kuningatar",
  "ylipappi",
  "keisari",
  "keisarinna",
  "piispa",
  "kauppias",
  "tutkimusmatkailija",
  "kapteeni",
  "laivuri",
  "perämies",
  "teurastaja"
)

const fullName = oneOf(
  firstName,
  [maybe([title, " "]), firstName, " ", firstNameP, oneOf("poika", "tytär")]
)

const fullNameP = oneOf(
  firstNameP,
  [title, " ", firstNameP],
  [maybe([title, " "]), firstName, " ", firstNameP, oneOf("pojan", "tyttären")]
)

const [foodSource, foodSourceP] = wordList([
  [fullName, fullNameP],
  ["Tuonela", "Tuonelan"],
  ["Aifur", "Aifurin"],
  ["Heimdal", "Heimdalin"],
  ["Jäämeri", "Jäämeren"],
  ["Baltia", "Baltian"],
  ["Pohjolan emäntä", "Pohjolan emännän"],
  ["Athosvuori", "Athosvuoren"],
  ["Valkyyri", "Valkyyrioiden"],
  ["Iona", "Ionan"],
  ["Iirien neito", "Iirien neidon"],
  ["Vuohipaimen", "Vuohipaimenen"],
  ["Ryytimaa", "Ryytimaan"],
  ["Ruurik", "Ruurikin"],
  ["Kangasmetsä", "Kangasmetsien"],
  ["Kallioranta", "Kalliorannan"],
  ["Lofootit", "Lofoottien"],
  ["Uusi maailma", "Uuden maailman"],
  ["Kalastaja", "Kalastajan"],
  ["Kapteeni", "Kapteenin"],
  ["Shamaani", "Shamaanin"],
  ["Teurastaja", "Teurastajan"]
])

const marinade = oneOf(
  "olut",
  "sahti",
  "sima",
  "viini"
)

const [adjectiveSingular, adjectivePlural, adjectivePartitive, adjectivePluralPartitive] = wordList([
  ["valtava", "valtavat", "valtavaa", "valtavia"],
  ["mahtava", "mahtavat", "mahtavaa", "mahtavia"],
  ["reilu", "reilut", "reilua", "reiluja"],
  ["tuhti", "tuhdit", "tuhtia", "tuhteja"],
  ["juhlallinen", "juhlalliset", "juhlallista", "juhlallisia"],
  ["parempi", "paremmat", "parempaa", "parempia"],
  ["herkullinen", "herkulliset", "herkullista", "herkullisia"],
  ["pikkelöity", "pikkelöidyt", "pikkelöityä", "pikkelöityjä"],
  ["friteerattu", "friteeratut", "friteerattua", "friteerattuja"],
  ["liekitetty", "liekitetyt", "liekitettyä", "liekitettyjä"],
  ["ihanampi", "ihanammat", "ihanampaa", "ihanampia"],
  prependAll(maybe(marinade), ["marinoitu", "marinoidut", "marinoitua", "marinoituja"]),
  ["kuivattu", "kuivatut", "kuivattua", "kuivattuja"],
  ["karamellisoitu", "karamellisoidut", "karamellisoitua", "karamellisoituja"],
  ["ylikypsä", "ylikypsät", "ylikypsää", "ylikypsiä"],
  ["kuorrutettu", "kuorrutetut", "kuorrutettua", "kuorrutettuja"]
])

const mainIngredients = [
  ["kinkku", "kinkkua"],
  ["kala", "kalaa"],
  ["kana", "kanaa"],
  ["lohi", "lohta"],
  ["siika", "siikaa"],
  ["silakka", "silakkaa"],
  ["silli", "silli"],
  ["särki", "särkeä"],
  ["turska", "turskaa"],
  ["kolja", "koljaa"],
  ["hummeri", "hummeria"],
  ["kaviaari", "kaviaari"],
  ["mäti", "mätiä"],
  ["lahna", "lahnaa"],
  ["tofu", "tofua"],
  ["seitan", "seitania"],
  ["härkis", "härkistä"],
  ["poro", "poroa"],
  ["hirvi", "hirveä"],
  ["lammas", "lammasta"],
  ["kauris", "kaurista"],
  ["rapu", "rapua"],
  ["härkä", "härkää"],
  ["juusto", "juustoa"],
  ["kalkkuna", "kalkkunaa"],
  ["punajuuri", "punajuurta"]
]

const ingredientModifier = oneOf(
  "suola",
  "graavi",
  "savu",
  "kylmäsavu",
  "chili",
  "pippuri",
  "tilli",
  "yrtti",
  "terva",
  "sinappi",
  "sahti"
)

const mainIngredient = [maybe(ingredientModifier), oneOf(...mainIngredients.map(nth(0)))]
const mainIngredientPartitive = [maybe(ingredientModifier), oneOf(...mainIngredients.map(nth(1)))]

const [mealPart, mealPartPartitive, mealPartPlural, mealPartPluralPartitive] = wordList([
  prependAll(mainIngredient, ["kiusaus", "kiusausta", __, __]),
  prependAll(mainIngredient, ["laatikko", "laatikkoa", __, __]),
  prependAll(maybe(mainIngredient), ["makkara", "makkaraa", "makkarat", "makkaroita"]),
  prependAll(maybe(mainIngredient), ["hampurilainen", "hampurilaista", __, __]),
  prependAll(mainIngredient, ["keitto", "keittoa", __, __]),
  prependAll(mainIngredient, ["pihvi", "pihviä", "pihvit", "pihvejä"]),
  prependAll(mainIngredient, ["kakku", "kakkua", "kakut", "kakkuja"]),
  prependAll(maybe(mainIngredient), ["salaatti", "salaattia", __, __]),
  prependAll(mainIngredient, ["rulla", "rullaa", __, __]),
  prependAll(maybe(mainIngredient), ["paisti", "paistia", __, __]),
  prependAll(maybe(mainIngredient), ["kebab", "kebabia", __, __]),
  prependAll(mainIngredient, ["muhennos", "muhennosta", __, __]),
  prependAll(oneOf("liha", mainIngredient), ["pulla", "pullaa", "pullat", "pullia"]),
  ["rosvopaisti", "rosvopaistia", __, __],
  ["leike", "leikettä", "leikkeet", "leikkeitä"],
  ["perunamuusi", "perunamuusia", __, __],
  ["murskattu peruna", "murskattua perunaa", "murskatut perunat", "murskattuja perunoita"],
  ["viiriäinen", "viiriäistä", "viiriäisenkoivet", "viiriäisenkoipia"],
  ["leipäjuusto", "leipäjuustoa", __, __],
  ["peruna", "perunaa", "perunat", "perunoita"],
  ["lanttu", "lanttua", "lantut", "lanttuja"],
  ["palsternakka", "palsternakkaa", "palsternakat", "palsternakkoja"],
  ["lehtikaali", "lehtikaalta", __, __],
  ["lammassärä", "lammassärää", __, __],
  ["ankankoipi", "ankankoipea", "ankankoivet", "ankankoipia"],
  prependAll(maybe(mainIngredient), [__, __, "nakit", "nakkeja"]),
  prependAll(maybe(oneOf("juures", "bataatti", "maalais", "ristikko")), [__, __, "ranskalaiset", "ranskalaisia"]),
  [__, __, "tikkuperunat", "tikkuperunoita"],
  [__, __, "kilpiperunat", "kilpiperunoita"],
  [__, __, "lohkoperunat", "lohkoperunoita"],
  [__, __, "ravunpyrstöt", "ravunpyrstöjä"],
  prependAll(oneOf("järvi", "joki", "sini"), ["simpukka", "simpukkaa", "simpukat", "simpukoita"]),
  [__, __, "muikut", "muikkuja"],
  [mainIngredient, mainIngredientPartitive, __, __]
])

const [sauceModifier, sauceModifierPartitive, sauceModifierAdessive] = wordList([
  ["juustoinen", "juustoista", "juustoisella"],
  ["tulinen", "tulista", "tulisella"],
  ["pippurinen", "pippurista", "pippurisella"]
  ["kermainen", "kermaista", "kermaisella"],
  ["makea", "makeaa", "makealla"],
  ["suolainen", "suolaista", "suolaisella"],
  ["pikantti", "pikanttia", "pikantilla"],
  ["terästetty", "terästettyä", "terätetyllä"],
  ["kesäinen", "kesäistä", "kesäisellä"],
  ["jouluinen", "jouluista", "jouluisella"]
])

const [baseSauce, baseSaucePartitive, baseSauceAdessive] = wordList([
  ["kasti", "kastia", "kastilla"],
  ["kastike", "kastiketta", "kastikkeella"],
  ["liemi", "lientä", "liemellä"],
  ["soossi", "soossia", "soossilla"],
  ["mousse", "moussea", "moussella"],
  ["pyree", "pyreetä", "pyreellä"],
  ["vaahto", "vaahtoa", "vaahdolla"],
  ["dippi", "dippiä", "dipillä"],
  ["hilloke", "hilloketta", "hillokkeella"],
])

const sauceIngredient = oneOf(mainIngredient, oneOf(
  "tomaatti",
  "vuohenjuusto",
  "palsternakka",
  "sipuli",
  "valkosipuli",
  "lakka",
  "puolukka",
  "mustikka",
  "oravanmarja",
  "kuusenkerkkä",
  "katajanmarja",
  "pihlajanmarja",
  "olut",
  "viini",
  "herukka",
  "vaahterasiirappi",
  "rosmariini",
  "sinappi",
  "voi",
  "herkkusieni",
  "tatti",
  "korvasieni"
))

const sauce = oneOf(
  [" ja ", maybe([foodSourceP, " "]), maybe([sauceModifierPartitive, " "]), maybe(ingredientModifier), maybe(sauceIngredient), baseSaucePartitive],
  [" ja ", maybe([foodSourceP, " "]), maybe([sauceModifier, " "]), maybe(ingredientModifier), maybe(sauceIngredient), baseSauce],
  [" ", maybe([foodSourceP, " "]), maybe([sauceModifierAdessive, " "]), maybe(ingredientModifier), maybe(sauceIngredient), baseSauceAdessive]
)

const [cookingMethodSingular, cookingMethodPlural, cookingMethodPartitive, cookingMethodPluralPartitive] = wordList([
  ["paistettu", "paistetut", "paistettua", "paistettuja"],
  ["keitetty", "keitetyt", "keitettyä", "keitettyjä"],
  ["suolattu", "suolatut", "suolattua", "suolattuja"],
  ["höyrytetty", "höyrytetyt", "höyrytettyä", "höyrytettyjä"],
  ["nuotiolla paistettu", "nuotiolla paistetut", "nuotiolla paistettua", "nuotiolla paistettuja"],
  ["hiillostettu", "hiillostetut", "hiillostettua", "hiillostettuja"],
  ["savustettu", "savustetut", "savustettua", "savustettuja"],
  ["revitty", "revityt", "revittyä", "revittyjä"],
  ["pariloitu", "pariloidut", "pariloitua", "pariloituja"],
  ["paahdettu", "paahdetut", "paahdettua", "paahdettuja"]
])

const meal = [oneOf(
  [maybe([cookingMethodSingular, " "]), maybe([adjectiveSingular, " "]), mealPart],
  [maybe([cookingMethodPlural, " "]), maybe([adjectivePlural, " "]), mealPartPlural],
  [maybe([cookingMethodPartitive, " "]), maybe([adjectivePartitive, " "]), mealPartPartitive],
  [maybe([cookingMethodPluralPartitive, " "]), maybe([adjectivePluralPartitive, " "]), mealPartPluralPartitive],
), maybe(sauce)]

const pattern = oneOf(
  [maybe([foodSourceP, " "]), meal, " sekä ", maybe([foodSourceP, " "]), meal],
  [fullNameP, " ", meal],
  [meal, " ", foodSourceP, " ", oneOf("tapaan", "tyyliin", "hovista", "nuotiolta", "leiristä")],
  [meal, " á la ", foodSource]
)

export const generateMeal = () => upperFirst(evaluate(pattern))
