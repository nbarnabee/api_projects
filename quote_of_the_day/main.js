

let select = document.querySelector("select");
let category = select.options[select.selectedIndex].value;

  fetch("")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    localStorage.setItem("dailyQuote", data);
  })


