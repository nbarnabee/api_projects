window.onload = checkQuote

function checkQuote() {
  if (localStorage.getItem("dailyQuote")) {
    const current = new Date(), 
      currentTime = current.getTime(),
      currentDate = current.getDay(),
      timeStored = localStorage.getItem("timeStored"),
      dateStored = localStorage.getItem("dateStored");
    if (dateStored != currentDate || currentTime > (timeStored + 86400000)) {
      console.log(dateStored != currentDate);
      console.log(currentTime > (timeStored + 86400000));
      localStorage.clear();
      getQuote();
      getTimeStamp();
    }
    else {
      let quote = JSON.parse(localStorage.getItem("dailyQuote"));
      displayQuote(quote);
    }
  }
  else {
    getQuote();
    getTimeStamp();
  }
}

function getQuote() {
  console.log("Making a new fetch request");
  fetch("https://quotes.rest/qod?category=inspire&language=en")
  .then(response => response.json())
  .then(data => {
    displayQuote(data.contents.quotes[0]);
    localStorage.setItem("dailyQuote", JSON.stringify(data.contents.quotes[0]));
  })
};

function getTimeStamp() {
  const now = new Date(),
  time = now.getTime(),
  date = now.getDay();
  localStorage.setItem("timeStored", time);
  localStorage.setItem("dateStored", date);
};

function displayQuote(quote) {
  document.querySelector("blockquote").textContent = `${quote.quote}`;
  document.querySelector("figcaption").innerHTML = `&#8212;${quote.author}`;
};