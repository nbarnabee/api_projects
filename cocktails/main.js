//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector("button").addEventListener("click", getDrink);

function getDrink() {
const searchTerm = document.querySelector("input").value

fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    console.log(data.drinks[0]);

    /* --- Building the list of instructions --- */
    let instructionList = data.drinks[0].strInstructions.split(". ");
    instructionList.forEach(element => {
      let instructionPoint = document.createElement("li");
      instructionPoint.innerText = element;
      document.querySelector("#instructions").appendChild(instructionPoint);
    });

    /* --- Building the list of ingredients --- */
    function buildIngredientsArr() {
    let ingredientsList = [];
    let ingredientVar;
    let ingredientItem;
    let ingredientMeasureVar;
    let ingredientMeasure;
    for (let i = 1; i <= 15; i++) {
    ingredientVar = `strIngredient${i}`;
    ingredientMeasureVar = `strMeasure${i}`;
    ingredientItem = data.drinks[0][ingredientVar];
    ingredientMeasure = data.drinks[0][ingredientMeasureVar];
    if (!ingredientItem) 
      break;
    else if (ingredientMeasure) 
      ingredientsList.push(`${ingredientMeasure} ${ingredientItem}`);
    else ingredientsList.push(ingredientItem);
    }
    console.log(ingredientsList);
    makeList(ingredientsList);
    };
 
    function makeList(arr) {
      arr.forEach(element => {
      let ingredient = document.createElement("li");
      ingredient.innerText = element;
      document.querySelector("#ingredients").appendChild(ingredient);
    })};

    document.querySelector("h2").innerText = data.drinks[0].strDrink;
    document.querySelector("img").src = data.drinks[0].strDrinkThumb;
    document.querySelector("img").alt = `Photograph of a ${searchTerm}`;
    document.querySelector(".glass").innerText = `Select a ${data.drinks[0].strGlass}`;
    buildIngredientsArr();
  })
  .catch(err => {
    console.log(`error ${err}`)
  })
}