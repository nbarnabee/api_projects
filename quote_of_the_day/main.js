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
      getQuote()
      getPicture()
    }
    else {
      displayQuote(JSON.parse(localStorage.getItem("dailyQuote")), JSON.parse(localStorage.getItem("dailyPicture")));
    }
  }
  else {
    getQuote();
    getPicture();
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


function displayQuote(quote, picture) {
  document.querySelector("blockquote").innerText = `${quote.quote}`;
  document.querySelector("figcaption").innerHTML = `&#8212;${quote.author}`;
  document.querySelector("small").innerHTML = `Quote courtesy of <a href="http://theysaidso.com">theysaidso.com</a>. Background image by <a
      href="${picture.url}">${picture.author}</a>
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
    localStorage.setItem("dailyPicture", JSON.stringify(data));
  });
};