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
      getPicture();
      getTimeStamp();
    }
    else {
      let quote = JSON.parse(localStorage.getItem("dailyQuote"));
      let picture = JSON.parse(localStorage.getItem("dailyPicture"));
      displayQuote(quote);
      displayPicture(picture);
    }
  }
  else {
    getQuote();
    getPicture();
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

function getPicture() {
  let id = Math.floor(Math.random() * 1000 + 1);
  fetch(`https://picsum.photos/id/${id}/info`)
  .then(response => response.json())
  .then(data => {
    displayPicture(data);
    localStorage.setItem("dailyPicture", JSON.stringify(data));
  });
};


function getTimeStamp() {
  const now = new Date(),
  time = now.getTime(),
  date = now.getDay();
  localStorage.setItem("timeStored", time);
  localStorage.setItem("dateStored", date);
};

function displayQuote(quote) {
  document.querySelector("blockquote").innerText = `${quote.quote}`;
  document.querySelector("figcaption").innerHTML = `&#8212;${quote.author}`;
};

function displayPicture(picture) {
  document.querySelector("small").innerHTML = `Quote courtesy of <a href="http://theysaidso.com">theysaidso.com</a>. Background image by <a
      href="${picture.url}">${picture.author}</a>`
}