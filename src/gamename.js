import { maybe, oneOf, evaluate, t, lift, oneOfCanRepeat, oneOfWeighted } from "./dsl"
import { random } from "lodash/fp"
import { wordList, __, maybeWeighted } from "./util"
import { firstNameEn, fullNameEn } from "./name"

const maybeR = x => oneOf("", [x, " "])

const dropArticle = lift(n => n.split(" ")[1])

const lowerCaseInTitle = ["the", "a", "an", "of", "and"]
const upperCaseInTitle = ["FPS", "RPG"]

const titleCasefy = lift(s => s.split(" ").map((word, i) => {
    if (word === "") {
        return ""
    }

    if (upperCaseInTitle.includes(word.toUpperCase())) {
        return word.toUpperCase()
    }
    else if (i === 0 || !lowerCaseInTitle.includes(word.toLowerCase())) {
        return word[0].toUpperCase() + word.slice(1)
    } else {
        return word[0].toLowerCase() + word.slice(1)
    }
}).join(" "))

const genre = oneOf(
    "fantasy",
    "FPS",
    "RPG",
    oneOf("racing", "racer", "kart"),
    "adventure",
    "simulator",
    "tycoon",
    "shooter",
    "strategy"
)

const personTitle = oneOf(
    "king",
    "knight",
    "hero",
    "villain",
    "sorcerer",
    "warlock",
    "architect",
    "builder",
    "peasant",
    "dungeon master"
)

const place = oneOf(
    "castle",
    "dungeon",
    "world",
    "mars",
    "moon",
    "factory",
    "prison",
    "office",
    "museum",
    "earth",
    "restaurant",
    "fortress",
    "station"
)

const mechanicAdjectives = [
    "fast",
    "slippery",
    "extreme",
    "flappy",
    "weird",
    "groovy",
    "difficult",
    "complicated",
    "casual",
    oneOf("inverse", "inverted")
]

const mechanicAdjective = oneOf(...mechanicAdjectives)

const adjective = oneOf(
    ...mechanicAdjectives,
    "cool",
    "radical",
    "subtle",
    "terrible",
    "ridiculous",
    "modern",
    "realistic",
    "authentic",
    "happy",
    "colourful",
    "vivid",
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "black",
    "white",
    "crimson",
    oneOf("gray", "grey"),
    "ordinary",
    "extraordinary",
    "magical",
    "cursed",
    "wacky",
    "doomed",
    "medieval",
    "ancient",
    "industrial",
    "kafkaesque",
    "grand",
    "energetic",
    "broken",
    "twisted",
    "hyper",
    "cosmic",
    "futuristic",
    "future",
    "barbaric",
    "dead",
    "dark",
    "danish",
    "swedish",
    "english",
    "finnish",
    "norwegian",
    "american",
    "japanese",
    "victorian",
    "golden",
    "platinum",
    "bloody",
    "gory"
)

const [anObject, objects, massNoun] = wordList([
    ["a memory", "memories", "memory"],
    ["a crime", "crimes", "crime"],
    ["a murder", "murders", "murder"],
    ["a hug", "hugs", __],
    ["a conflict", "conflicts", __],
    ["a war", "wars", __],
    ["a friendship", "friendships", "friendship"],
    ["a treasure", "treasures", "treasure"],
    ["an island", "islands", __],
    ["a spell", "spells", __],
    ["a dance", "dances", "dance"],
    ["a potion", "potions", __],
    ["an artifact", "artifacts", __],
    ["a sword", "swords", __],
    ["an axe", "axes", __],
    ["a staff", "staves", __],
    ["a hat", "hats", __],
    ["a shield", "shields", __],
    ["a gem", "gems", __],
    ["a goat", "goats", __],
    ["a dog", "dogs", __],
    ["a cat", "cats", __],
    ["a panda", "pandas", __],
    ["a duck", "ducks", __],
    ["a goose", "geese", __],
    ["a bear", "bears", __],
    ["a monster", "monsters", __],
    ["a zombie", "zombies", __],
    ["an ogre", "ogres", __],
    ["an octopus", oneOf("octopuses", "octopi"), __],
    ["a fish", __, "fish"],
    ["a horse", "horses", __],
    ["a snake", "snakes", __],
    ["a dad", "dads", __],
    ["a mom", "moms", __],
    ["a skull", "skulls", __],
    ["a soul", "souls", "soul"],
    ["a spreadsheet", "spreadsheets", __],
    ["a stapler", "staplers", __],
    ["a civilization", "civilizations", __],
    ["a hit", "hits", __],
    ["a button", "buttons", __],
    ["a joystick", "joysticks", __],
    ["a crisis", "crises", __],
    ["a sky", "skies", __],
    ["a song", "songs", __],
    ["a curse", "curses", __],
    [__, __, "gold"],
    [__, __, "ice"],
    [__, __, "fire"],
    [__, __, "loot"],
    [__, __, "violence"],
    [__, __, "peace"],
    [__, __, "profit"],
    [__, __, "chaos"],
    [__, __, "duty"],
    [__, __, "magic"],
    [__, __, "doom"],
    [__, __, "warfare"],
    [__, __, "cereal"],
    [__, __, "groove"]
])

const object = dropArticle(anObject)

const anAdventure = oneOf(
    "a quest",
    "an adventure",
    "a search",
    "an odyssey",
    "a trip",
    "a journey"
)

const adventure = dropArticle(anAdventure)

const someAdventure = oneOfCanRepeat(anAdventure, t`The ${adventure}`)

const gamePrefix = oneOfWeighted(
    [1.0, "Super "],
    [0.2, t`${oneOf(firstNameEn, fullNameEn)}'s `],
    [0.15, t`${oneOf(firstNameEn, fullNameEn)} and `],
    [0.05, "Sid Meier's "],
)

const commonGameNameWord = oneOf(
    t`${maybe("Dance ")}Party`,
    "Effect",
    "Battle",
    "Jousting",
    "Trigger",
    "Solid",
    "Prime",
    "Manager",
    "Game",
    "Clicker"
)

const gameNameSuffix = oneOfWeighted(
    [0.7, () => ` ${random(2, 7).toString()}`],
    [0.2, " Saga"],
    [0.2, " Story"],
    [0.2, " Zero"],
    [0.15, ": Reckoning"],
    [0.01, ": Revengence"],
    [0.15, ": Revenge"],
    [0.15, ": Rebirth"],
    [0.15, t`${oneOf(": ", " ")}Redemption`],
    [0.2, t`: ${oneOf("Survivor", "Survive")}`],
    [0.1, ": Armageddon"],
    [0.1, ": Afermath"],
    [0.15, ": Endgame"],
    [0.1, ": Awakening"],
    [0.4, t`${oneOf(": ", " ")}Remastered`],
    [0.1, ": Revision"],
    [0.4, t`${oneOf(": ", " ")}${oneOf("Episode", "Chapter")} ${() => random(0, 7).toString()}`],
    [1, t`: ${adjective} ${massNoun}`],
    [0.2, " 64"],
    [0.7, () => ` ${random(1980, 2020).toString()}`],
    [0.3, t` ${oneOf("for", "of")} ${massNoun}${maybe([" and ", massNoun])}`]
)

const classicGame = oneOf(
    "Tetris",
    "Pac Man",
    "Chess",
    "Mario",
    "Sonic",
    "Halo"
)

const objectPlace = t`${maybeR(object)}${place}`

const placeName = oneOf(
    t`Escape from ${maybeR(adjective)}${objectPlace}`,
    t`Return to ${maybeR(adjective)}${objectPlace}`,
    t`${object} of ${maybeR(adjective)}${objectPlace}`,
    t`Mission to ${maybeR(adjective)}${objectPlace}`,
    t`${objectPlace} ${oneOf("heist", "assault", "siege", "expedition", "raid")}`
)

const gameName = titleCasefy([
    maybeWeighted(0.05, gamePrefix),
    oneOfWeighted(
        [0.25, t`${maybeR(adjective)}${personTitle}'s ${maybeR(adjective)}${adventure}`],
        [0.25, t`${adjective} ${personTitle}`],
        [0.25, t`${maybeWeighted(0.3, "The ")}${adjective} ${adventure}`],
        [1.0, t`${maybeWeighted(0.3), "The "}${adjective} ${oneOf(object, objects)}`],
        [0.1, t`Call of ${massNoun}`],
        [1.0, t`${adjective} ${massNoun}`],
        [0.25, t`${mechanicAdjective} ${classicGame}`],
        [0.25, t`${classicGame} ${genre}`],
        [0.25, t`Final ${genre}`],
        [0.05, t`${titleCasefy(place)}Bound`],
        [0.1, [maybe(t`${oneOf(firstNameEn, personTitle)}'s `), placeName]],
        [0.5, t`${object} ${object}`],
        [0.1, t`${lift(x => t`${x} ${x}`)(object)} Revolution`],
        [1.0, t`${maybeWeighted(0.05, ["My "])}${adjective} ${oneOf(object, objects, massNoun)}`],
        [1.0, t`${object} ${commonGameNameWord}`],
        [1.0, t`${adjective} ${commonGameNameWord}`],
        [1.0, t`${place} ${oneOf(object, objects)}`],
        [0.10, t`${oneOf(object, massNoun)} Simulator`],
        [0.10, t`${someAdventure} for ${oneOf(
            anObject,
            ["the ", maybeR(adjective), oneOf(object, objects)],
        )}`]
    ),
    maybeWeighted(0.25, [gameNameSuffix])]
)

export const generateGameName = () => evaluate(gameName)
