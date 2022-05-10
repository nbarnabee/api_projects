//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector("input").value = "";
document.querySelector("button").addEventListener("click", getDrinks);
let drinkList = [];

function getDrinks() {
  const searchTerm = document.querySelector("input").value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
  .then(res => res.json())
  .then(data => {
    document.querySelector(".card").classList.remove("hidden");
    console.log(data);
    for (let drink of data.drinks) {
      //turn each of the drinks into an object in the drink list
      drinkList.push(Drink(drink.strDrink, drink.strGlass, drink.strInstructions));
    }
    for (let e in data.drinks) {
      //make an array containing the ingredients and measurements and add that to the drink object
    let ingredientsList = [];
    let ingredientVar;
    let ingredientItem;
    let ingredientMeasureVar;
    let ingredientMeasure;
      for (let i = 1; i <= 15; i++) {
        ingredientVar = `strIngredient${i}`;
        ingredientMeasureVar = `strMeasure${i}`;
        ingredientItem = data.drinks[e][ingredientVar];
        ingredientMeasure = data.drinks[e][ingredientMeasureVar];
        if (!ingredientItem)
          break;
        else if (ingredientMeasure)
          ingredientsList.push([`${ingredientMeasure}, ${ingredientItem}`]);
        else ingredientsList.push(ingredientItem);
        }
      drinkList[e].ingredients = ingredientsList;
    };
    
/* consider rewriting the Drink thing as a constructor function, and then doing (let e in data.drinks) {
  drinkList[e] = new Drink(data.drinks[e].strDrink, data.drinks[e].strGlass, data.drinks[e].strInstructions) - and could then return the drink instruction making to a separate function and call that as an argument
}
*/


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
          listItem.textContent = element;
          document.querySelector([target]).appendChild(listItem);
        })
      };

      document.querySelector("h2").textContent = data.drinks[0].strDrink;
      document.querySelector("img").src = data.drinks[0].strDrinkThumb;
      getIngredients();
      getInstructions();
      document.querySelector("input").value = "";
    })

    .catch(err => {
      console.log(`error ${err}`)
      alert("Sorry, we didn't find anything");
      document.querySelector("input").value = "";
    })
}

function Drink(name, glass, instructions) {
  return {
    name,
    glass,
    instructions,
  }
}

// my thought is to have card items that can appear to the user
// one card will be small, with the name of the drink and possibly a picture
// the other card will appear when the small card is clicked on, and will include the full information

