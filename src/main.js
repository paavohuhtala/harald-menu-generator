
import { generateGameName } from "./gamename"

document.addEventListener("DOMContentLoaded", () => {
  const resultsUl = document.getElementById("results")
  
  const generate10 = () => {
    resultsUl.innerHTML = ""
    for (let i = 0; i < 50; i++) {
      const elem = document.createElement("li")

      const gameName = generateGameName() 
      elem.innerText = gameName
      resultsUl.appendChild(elem)
    }
  }
  
  generate10()
  document.getElementById("generate").addEventListener("click", generate10)
})
