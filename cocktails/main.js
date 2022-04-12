//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector("button").addEventListener("click", getDrink);

function getDrink() {
const searchTerm = document.querySelector("input").value

fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    document.querySelector("h2").innerText = data.drinks[0].strDrink;
    document.querySelector("img").src = data.drinks[0].strDrinkThumb;
    document.querySelector("img").alt = `Photograph of a ${searchTerm}`;
    document.querySelector("#instructions").innerText = data.drinks[0].strInstructions;
  })
  .catch(err => {
    console.log(`error ${err}`)
  })
}