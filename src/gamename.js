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
    "earth"
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
    "casual"
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
    "gray",
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
    "victorian"
)

const [anObject, objects, massNoun] = wordList([
    ["a memory", "memories", "memory"],
    ["a conflict", "conflicts", __],
    ["a war", "wars", __],
    ["a friendship", "friendships", "friendship"],
    ["a treasure", "treasures", "treasure"],
    ["an island", "islands", __],
    ["a spell", "spells", __],
    ["a dance", "dances", "dance"],
    ["a potion", "potions", "potion"],
    ["an artifact", "artifacts", __],
    ["a sword", "swords", __],
    ["an axe", "axes", __],
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
    ["a dad", "dads", __],
    ["a mom", "moms", __],
    ["a skull", "skulls", __],
    ["a soul", "souls", "soul"],
    ["a spreadsheet", "spreadsheets", __],
    ["a civilization", "civilizations", __],
    [__, __, "gold"],
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
    [__, __, "groove"],
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
    "Prime"
)

const gameNameSuffix = oneOfWeighted(
    [0.7, () => ` ${random(2, 7).toString()}`],
    [0.5, " Saga"],
    [0.5, " Story"],
    [0.25, " Zero"],
    [0.15, ": Reckoning"],
    [0.01, ": Revengence"],
    [0.20, ": Revenge"],
    [0.15, ": Rebirth"],
    [0.15, t`${oneOf(": ", " ")} Redemption`],
    [0.15, t`: ${oneOf("Survivor", "Survive")}`],
    [0.1, ": Armageddon"],
    [0.25, ": Afermath"],
    [0.25, ": Endgame"],
    [0.15, ": Awakening"],
    [0.4, t`${oneOf(": ", " ")}Remastered`],
    [0.1, ": Revision"],
    [0.4, t`${oneOf(": ", " ")}${oneOf("Episode", "Chapter")} ${() => random(0, 7).toString()}`],
    [0.8, t`: ${adjective} ${massNoun}`],
    [0.2, " 64"],
)

const classicGame = oneOf(
    "Tetris",
    "Pac Man",
    "Chess",
    "Mario",
    "Sonic",
    "Halo"
)

const gameName = titleCasefy([
    maybeWeighted(0.05, gamePrefix),
    oneOfWeighted(
        [0.25, t`${maybeR(adjective)}${personTitle}'s ${maybeR(adjective)}${adventure}`],
        [0.25, t`${adjective} ${personTitle}`],
        [0.25, t`The ${adjective} ${adventure}`],
        [1.0, t`The ${adjective} ${oneOf(object, objects)}`],
        [0.1, t`Call of ${massNoun}`],
        [1.0, t`${adjective} ${massNoun}`],
        [0.25, t`${mechanicAdjective} ${classicGame}`],
        [0.25, t`${classicGame} ${genre}`],
        [0.25, t`Final ${genre}`],
        [0.1, t`${titleCasefy(place)}Bound`],
        [0.5, t`${object} ${object}`],
        [0.1, t`${lift(x => t`${x} ${x}`)(object)} Revolution`],
        [1.0, t`${maybeWeighted(0.05, ["My "])}${adjective} ${oneOf(object, objects, massNoun)}`],
        [1.0, t`${object} ${commonGameNameWord}`],
        [0.10, t`${oneOf(object, massNoun)} Simulator`],
        [0.10, t`${someAdventure} for ${oneOf(
            anObject,
            ["the ", maybeR(adjective), oneOf(object, objects)],
        )}`]
    ),
    maybeWeighted(0.25, [gameNameSuffix])]
)

export const generateGameName = () => evaluate(gameName)
