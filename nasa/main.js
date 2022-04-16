document.querySelector("button").onclick = getByDate;
let baseURL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
getPOTD(baseURL);

function getByDate() {
  let dateValue = document.querySelector("input").value;
  let date = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateValue}`;
  getPOTD(date);
}

function getPOTD(url) {
  // const iframe = document.querySelector("iframe");
  // const img = document.querySelector("img");
  fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.media_type==="video") {
      document.querySelector("iframe").src=data.url;
      document.querySelector("iframe").classList.remove("hidden");
      document.querySelector("img").src="";
    }
      else document.querySelector("img").src=data.url;
    if (data.copyright)
    {console.log(data.copyright);
      document.querySelector(".copyright").innerHTML = `&copy; ${data.copyright}`};
    document.querySelector("h1").innerText=`${data.date}:  ${data.title}`;
    document.querySelector(".explanation").innerText=data.explanation;
  })
  .catch(err => {
      console.log(`error ${err}`)
  });
}



function getByDate() {
  value = document.querySelector("input").value;
  fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${value}`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    //and do whatever else you want to do with it here
    if (data.media_type==="video") {
      document.querySelector("iframe").src=data.url;
      document.querySelector("iframe").classList.remove("hidden");
      document.querySelector("img").src="";
    }
      else {
        if (!document.querySelector("iframe").classList.contains("hidden"))
          document.querySelector("iframe").classList.add("hidden");
        document.querySelector("img").src=data.url;
      }

    if (data.copyright) {
      document.querySelector(".copyright").innerHTML = `&copy; ${data.copyright}`}
      else document.querySelector(".copyright").innerHTML = "";

    document.querySelector("h1").innerText=`${data.date}:  ${data.title}`;
    document.querySelector(".explanation").innerText=data.explanation;
  })
  .catch(err => {
      console.log(`error ${err}`)
  });
}