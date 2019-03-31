import { generatePresentation } from "./pohina"

export const handler = function(event, context, callback) {
  const results = [];
  
  for (let i = 0; i < 10; i++) {
    results.push(generatePresentation())
  }

  callback(null, results)
}
