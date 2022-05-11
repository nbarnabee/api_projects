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
    for (let i in data.drinks) {
      drinkList[i] = new Drink(data.drinks[i].strDrink, data.drinks[i].strGlass, data.drinks[i].strInstructions);
      getInstructions(data.drinks[i], i);
    }
  })
  .catch(err => {
    console.log(`error ${err}`)
    alert("Sorry, we didn't find anything");
    document.querySelector("input").value = "";
  })
};

function getInstructions(obj, index) {
  let ingredientsList = [];
    let ingredientVar;
    let ingredientMeasureVar;
      for (let i = 1; i <= 15; i++) {
        ingredientVar = `strIngredient${i}`;
        ingredientMeasureVar = `strMeasure${i}`;
        if (!obj[ingredientVar])
          break;
        else ingredientsList.push([obj[ingredientMeasureVar], obj[ingredientVar]]);
      drinkList[index].ingredients = ingredientsList;
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

    .catch(err => {
      console.log(`error ${err}`)
      alert("Sorry, we didn't find anything");
      document.querySelector("input").value = "";
    })
}
/*  Drink as a constructor function/class */

class Drink {
  constructor(name, glass, instructions) {
    this.name = name;
    this.glass = glass;
    this.instructions = instructions;
  }
}


// my thought is to have card items that can appear to the user
// one card will be small, with the name of the drink and possibly a picture
// the other card will appear when the small card is clicked on, and will include the full information

