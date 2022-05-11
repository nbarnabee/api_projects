document.querySelector("input").value = "";
document.querySelector("button").addEventListener("click", getDrinks);
let drinkList = [];

function getDrinks() {
  const searchTerm = document.querySelector("input").value;
  drinkList = [];
  document.querySelector(".card-container").innerHTML = "";
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
  .then(res => res.json())
  .then(data => {
    for (let i in data.drinks) {
      drinkList[i] = new Drink(
        data.drinks[i].strDrink, 
        data.drinks[i].strGlass,
        data.drinks[i].strAlcoholic,
        data.drinks[i].strDrinkThumb, 
        data.drinks[i].strInstructions
        );
      getIngredients(data.drinks[i], i);
    }
    for (let drink of drinkList) {
      drink.makeDrinkCardSmall();
    }
  })
  .catch(err => {
    console.log(`error ${err}`)
    alert("Sorry, we didn't find anything");
    document.querySelector("input").value = "";
  })
};

function getIngredients(obj, index) {
  let ingredients = [];
    let ingredientVar;
    let ingredientMeasureVar;
      for (let i = 1; i <= 15; i++) {
        ingredientVar = `strIngredient${i}`;
        ingredientMeasureVar = `strMeasure${i}`;
        if (!obj[ingredientVar])
          break;
        else ingredients.push([obj[ingredientMeasureVar], obj[ingredientVar]]);
      drinkList[index].ingredients = ingredients;
      };
};

/*
       --- Building the list of instructions --- 
    function getInstructions() {
      let instructionList = [`Select a ${data.drinks[0].strGlass}`];
      instructionList = instructionList.concat(data.drinks[0].strInstructions.split(". "));
      makeList(instructionList, "#instructions");
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

/*  Drink as a constructor function/class */

class Drink {
  constructor(name, glass, alcoholic, image, instructions) {
    /* all of the following are strings */
    this.name = name;   
    this.glass = glass;
    this.alcoholic = alcoholic;
    this.image = image;  
    this.instructions = instructions;  
    /* the Drink has an additional property -- this.ingredients -- which is added by the getIngredients function, and is a 2D array with the following syntax: ["measure", "ingredient"] */
  };
  makeDrinkCardSmall() {
    let drinkCardSmall = document.createElement("figure");
    drinkCardSmall.innerHTML = `<img src=${this.image} class="card--small__img"><figcaption class="card--small__txt"><ul class="card--small__list"><li><h2>${this.name}</h2></li><li>(${this.alcoholic})</li><li>Rating</li></ul></figcaption>`;
    drinkCardSmall.classList.add("card--small");
    document.querySelector(".card-container").appendChild(drinkCardSmall);
  }
}


// my thought is to have card items that can appear to the user
// one card will be small, with the name of the drink and possibly a picture
// the other card will appear when the small card is clicked on, and will include the full information

