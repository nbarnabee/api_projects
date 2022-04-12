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
    function getInstructions() {
    let instructionList = [`Select a ${data.drinks[0].strGlass}`];
    instructionList = instructionList.concat(data.drinks[0].strInstructions.split(". "));
    makeList(instructionList, "#instructions");
   };

    /* --- Building the list of ingredients --- */
    function getIngredients() {
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
    makeList(ingredientsList, "#ingredients");
    };

    function makeList(arr, target) {
      document.querySelector([target]).innerHTML = "";
      arr.forEach(element => {
      let listItem = document.createElement("li");
      listItem.innerText = element;
      document.querySelector([target]).appendChild(listItem);
    })};

    document.querySelector("h2").innerText = data.drinks[0].strDrink;
    document.querySelector("img").src = data.drinks[0].strDrinkThumb;
    getIngredients();
    getInstructions();
  })

  .catch(err => {
    console.log(`error ${err}`)
  })
}