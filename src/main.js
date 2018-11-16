
import { generateMeal } from "./harald"

document.addEventListener("DOMContentLoaded", () => {
  const resultsUl = document.getElementById("results")
  
  const generate10 = () => {
    resultsUl.innerHTML = ""
    for (let i = 0; i < 10; i++) {
      const elem = document.createElement("li")
      elem.innerText = generateMeal()
      resultsUl.appendChild(elem)
    }
  }
  
  generate10()
  document.getElementById("generate").addEventListener("click", generate10)
})
