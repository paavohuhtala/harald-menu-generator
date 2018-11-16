import { nth, upperFirst } from "lodash/fp"
import { maybe, oneOf, evaluate } from "./dsl"
import { prependAll } from "./util"

const firstNames = [
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
]

const firstName = oneOf(...firstNames.map(nth(0)))
const firstNameP = oneOf(...firstNames.map(nth(1)))

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

const foodSources = [
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
]

const foodSource = oneOf(...foodSources.map(nth(0)))
const foodSourceP = oneOf(...foodSources.map(nth(1)))

const marinade = oneOf(
  "olut",
  "sahti",
  "sima",
  "viini"
)

const adjectives = [
  ["valtava", "valtavat", "valtavaa", "valtavia"],
  ["mahtava", "mahtavat", "mahtavaa", "mahtavia"],
  ["reilu", "reilut", "reilua", "reiluja"],
  ["tuhti", "tuhdit", "tuhtia", "tuhteja"],
  ["juhlallinen", "juhlalliset", "juhlallista", "juhlallisia"],
  ["parempi", "paremmat", "parempaa", "parempia"],
  ["herkullinen", "herkulliset", "herkullista", "herkullisia"],
  ["suolattu", "suolatut", "suolattua", "suolattuja"],
  ["pikkelöity", "pikkelöidyt", "pikkelöityä", "pikkelöityjä"],
  ["friteerattu", "friteeratut", "friteerattua", "friteerattuja"],
  ["liekitetty", "liekitetyt", "liekitettyä", "liekitettyjä"],
  ["ihanampi", "ihanammat", "ihanampaa", "ihanampia"],
  prependAll(maybe(marinade), ["marinoitu", "marinoidut", "marinoitua", "marinoituja"]),
  ["paahdettu", "paahdetut", "paahdettua", "paahdettuja"],
  ["kuivattu", "kuivatut", "kuivattua", "kuivattuja"],
  ["karamellisoitu", "karamellisoidut", "karamellisoitua", "karamellisoituja"],
  ["ylikypsä", "ylikypsät", "ylikypsää", "ylikypsiä"],
  ["revitty", "revityt", "revittyä", "revittyjä"],
  ["pariloitu", "pariloidut", "pariloitua", "pariloituja"],
  ["kuorrutettu", "kuorrutetut", "kuorttutettua", "kuorrutettuja"]
]

const adjectiveSingular = oneOf(...adjectives.map(nth(0)))
const adjectivePlural = oneOf(...adjectives.map(nth(1)))
const adjectivePartitive = oneOf(...adjectives.map(nth(2)))
const adjectivePluralPartitive = oneOf(...adjectives.map(nth(3)))

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
  ["hevosenfilee", "hevosta"],
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

const mealParts = [
  prependAll(mainIngredient, ["kiusaus", "kiusausta"]),
  prependAll(mainIngredient, ["laatikko", "laatikkoa"]),
  prependAll(maybe(mainIngredient), ["makkara", "makkaraa"]),
  prependAll(maybe(mainIngredient), ["hampurilainen", "hampurilaista"]),
  prependAll(mainIngredient, ["keitto", "keittoa"]),
  prependAll(mainIngredient, ["pihvi", "pihviä"]),
  prependAll(mainIngredient, ["kakku", "kakkua"]),
  prependAll(mainIngredient, ["salaatti", "salaattia"]),
  prependAll(mainIngredient, ["rulla", "rullaa"]),
  prependAll(maybe(mainIngredient), ["paisti", "paistia"]),
  prependAll(maybe(mainIngredient), ["kebab", "kebabia"]),
  prependAll(mainIngredient, ["muhennos", "muhennosta"]),
  ["leike", "leikettä"],
  ["perunamuusi", "perunamuusia"],
  ["murskattu peruna", "murskattua perunaa"],
  ["viiriäinen", "viiriäistä"],
  ["leipäjuusto", "leipäjuustoa"],
  ["peruna", "perunaa"],
  ["lanttu", "lanttua"],
  ["palsternakka", "palsternakkaa"],
  ["lehtikaali", "lehtikaalta"],
  ["lammassärä", "lammassärää"],
  ["ankankoipi", "ankankoipea"],
  [mainIngredient, mainIngredientPartitive]
]

const mealPart = oneOf(...mealParts.map(nth(0)))
const mealPartPartitive = oneOf(...mealParts.map(nth(1)))

const pluralMealParts = [
  prependAll(oneOf("liha", mainIngredient), ["pullat", "pullia"]),
  prependAll(mainIngredient, ["rullat", "rullia"]),
  prependAll(mainIngredient, ["pihvit", "pihvejä"]),
  ["nakit", "nakkeja"],
  ["ranskalaiset", "ranskalaisia"],
  ["tikkuperunat", "tikkuperunoita"],
  ["kilpiperunat", "kilpiperunoita"],
  ["lohkoperunat", "lohkoperunoita"],
  ["pihvit", "pihvejä"],
  ["ravunpyrstöt", "ravunpyrstöjä"],
  ["järvisimpukat", "järvisimpukoita"],
  ["muikut", "muikkuja"],
  prependAll(maybe(mainIngredient), ["leivät", "leipiä"])
]

const mealPartPlural = oneOf(...pluralMealParts.map(nth(0)))
const mealPartPluralPartitive = oneOf(...pluralMealParts.map(nth(1)))

const sauceModifiers = [
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
]

const sauceModifier = oneOf(...sauceModifiers.map(nth(0)))
const sauceModifierPartitive = oneOf(...sauceModifiers.map(nth(1)))
const sauceModifierAdessive = oneOf(...sauceModifiers.map(nth(2)))

const baseSauces = [
  ["kasti", "kastia", "kastilla"],
  ["kastike", "kastiketta", "kastikkeella"],
  ["liemi", "lientä", "liemellä"],
  ["soossi", "soossia", "soossilla"],
  ["mousse", "moussea", "moussella"],
  ["pyree", "pyreetä", "pyreellä"],
  ["vaahto", "vaahtoa", "vaahdolla"],
  ["dippi", "dippiä", "dipillä"],
  ["hilloke", "hilloketta", "hillokkeella"]
]

const baseSauce = oneOf(...baseSauces.map(nth(0)))
const baseSaucePartitive = oneOf(...baseSauces.map(nth(1)))
const baseSauceAdessive = oneOf(...baseSauces.map(nth(2)))

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
  "olut",
  "viini",
  "herukka",
  "vaahterasiirappi",
  "rosmariini",
  "sinappi"
))

const sauce = oneOf(
  [" ja ", maybe([foodSourceP, " "]),  maybe([sauceModifierPartitive, " "]), maybe(ingredientModifier), maybe(sauceIngredient), baseSaucePartitive],
  [" ja ", maybe([foodSourceP, " "]), maybe([sauceModifier, " "]), maybe(ingredientModifier), maybe(sauceIngredient), baseSauce],
  [" ", maybe([foodSourceP, " "]), maybe([sauceModifierAdessive, " "]), maybe(ingredientModifier), maybe(sauceIngredient), baseSauceAdessive]
)

const valmistustapa = oneOf("paistettua", "keitettyä", "suurustettua", "suolattua", "höyrytetty", "nuotiolla paistettua", "hiillostettua", "savustettua")

const meal = [oneOf(
  [maybe([adjectiveSingular, " "]), mealPart],
  [maybe([adjectivePlural, " "]), mealPartPlural],
  [valmistustapa, " ", maybe([adjectivePartitive, " "]), mealPartPartitive],
  [maybe([adjectivePluralPartitive, " "]), mealPartPluralPartitive],
), maybe(sauce)]

const pattern = oneOf(
  [maybe([foodSourceP, " "]), meal, " sekä ", maybe([foodSourceP, " "]), meal],
  [fullNameP, " ", meal],
  [meal, " ", foodSourceP, " ", oneOf("tapaan", "hovista", "nuotiolta", "leiristä")],
  [meal, " á la ", foodSource]
)

export const generateMeal = () => upperFirst(evaluate(pattern))
