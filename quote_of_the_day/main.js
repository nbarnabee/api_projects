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


function displayQuote(data) {
  getPicture();
}


//data.quote
//data.tags
//

// check picture ids and dimensions???
// https://picsum.photos/WIDTHVAR/HEIGHTVAR
//landscape ratio 16:9
//1.78
//width = height*1.78, so height = width/1.78

function getPicture() {
  let picWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  let picHeight = picWidth/1.78;
  fetch(`https://picsum.photos/${picWidth}/${picHeight}`)
  .then(data => {
    document.querySelector("main").setAttribute("background-image", data);
  });
}