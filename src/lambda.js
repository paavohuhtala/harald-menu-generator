import { generateMeal } from "./harald"
import { generatePresentation } from "./pohina"

export const handler = function(event, context, callback) {
  const generator = "pohina" in event.queryStringParameters ? generatePresentation : generateMeal;

  const results = [];
  
  for (let i = 0; i < 10; i++) {
    results.push(generator())
  }

  callback(null, results)
}
