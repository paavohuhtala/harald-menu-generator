import { generateMeal } from "./harald"

export const handler = function(event, context, callback) {
  const results = [];
  
  for (let i = 0; i < 25; i++) {
    results.push(generateMeal())
  }

  callback(null, results)
}
