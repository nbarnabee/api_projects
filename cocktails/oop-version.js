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
        );
      getIngredients(data.drinks[i], i);
      getInstructions(data.drinks[i], i);
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

    function getInstructions(obj, index) {
      let instructionList = [];
      instructionList = instructionList.concat(obj.strInstructions.split(". "));
      drinkList[index].instructions = instructionList;
    };

    /*
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
    /* the Drink has additional properties -- this.ingredients and this.instructions -- which are added by the getIngredients and getInstructions functions
    ingredients is a 2D array with the following syntax: ["measure", "ingredient"] */
  };

  makeDrinkCardSmall() {
    let drinkCardSmall = document.createElement("figure");
    drinkCardSmall.innerHTML = `<img src=${this.image} class="card--small__img"><figcaption class="card--small__txt"><ul class="card--small__list"><li><h2 class="card--small__title">${this.name}</h2><small>(${this.alcoholic})</small></li><li>Rating</li></ul></figcaption>`;
    drinkCardSmall.classList.add("card--small");
    document.querySelector(".card-container").appendChild(drinkCardSmall);
  };

  makeDrinkCardLarge() {
    let drinkCardLarge = document.createElement("section");
  }
}


