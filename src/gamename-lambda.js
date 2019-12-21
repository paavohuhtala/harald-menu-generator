import { generateGameName } from "./gamename"

export const handler = function(event, context, callback) {
  const results = [];
  
  for (let i = 0; i < 25; i++) {
    results.push(generateGameName())
  }

  callback(null, results)
}
