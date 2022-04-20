window.onload = checkQuote

function checkQuote() {
  if (localStorage.getItem("dailyQuote")) {
    console.log("Cached quote found");
    const current = new Date(), 
      currentTime = current.getTime(),
      currentDate = current.getDay(),
      timeStored = localStorage.getItem("timeStored"),
      dateStored = localStorage.getItem("dateStored");
      console.log(currentTime, timeStored, currentDate, dateStored);
    if (dateStored != currentDate || currentTime > (timeStored + 86400000)) {
      console.log(dateStored != currentDate);
      console.log(currentTime > (timeStored + 86400000));
      console.log("Clearing yesterday's quote");
      localStorage.clear();
      console.log("Old quote cleared; fetching new quote");
      getQuote()
    }
    else {
      console.log("Displaying the cached quote");
      displayQuote(JSON.parse(localStorage.getItem("dailyQuote")));
    }
  }
  else {
    console.log("No quote found; fetching new quote"); 
    getQuote();
  }
}


function getQuote() {
  console.log("Making a new fetch request");
  fetch("https://quotes.rest/qod?category=inspire&language=en")
  .then(response => response.json())
  .then(data => {
    displayQuote(data.contents.quotes[0]);
    localStorage.setItem("dailyQuote", JSON.stringify(data.contents.quotes[0]));
    const now = new Date(),
      time = now.getTime(),
      date = now.getDay();
    localStorage.setItem("timeStored", time);
    localStorage.setItem("dateStored", date);
  })
};


function displayQuote(quote) {
  console.log(quote);
  document.querySelector("blockquote").innerText = `${quote.quote}`;
  document.querySelector("figcaption").innerHTML = `&#8212;${quote.author}`;
  getPicture();
};


//data.quote
//data.tags
//

// check picture ids and dimensions???
// https://picsum.photos/WIDTHVAR/HEIGHTVAR
//landscape ratio 16:9
//1.78
//width = height*1.78, so height = width/1.78

function getPicture() {
  let id = Math.floor(Math.random() * 1000 + 1);
  fetch(`https://picsum.photos/id/${id}/info`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
  });
};