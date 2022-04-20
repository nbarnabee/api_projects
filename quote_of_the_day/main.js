window.onload = checkQuote

function checkQuote() {
  if (localStorage.getItem("dailyQuote")) {
    const current = new Date(), 
      currentTime = current.getTime(),
      currentDate = current.getDate(),
      timeStored = localStorage.getItem("timeStored"),
      dateStored = localStorage.getItem("dateStored");
    if (dateStored != currentDate || currentTime > (timeStored + 86400000)) {
      localStorage.clear();
      getQuote()
    }
    else displayQuote(localStorage.getItem("dailyQuote"));
  };
  getQuote();
}

function getQuote() {
  fetch("https://quotes.rest/qod?category=inspire&language=en")
  .then(response => response.json())
  .then(data => {
    displayQuote(data);
    localStorage.setItem("dailyQuote", data);
    const now = new Date(),
      time = now.getTime(),
      date = now.getDay();
    localStorage.setItem("timeStored", time);
    localStorage.setItem("dateStored", date);
  })
}
