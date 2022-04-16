document.querySelector("button").onclick = getByDate;
let baseURL = "https://api.nasa.gov/planetary/apod?api_key=NGbXFaC948GisO5Nx2TmrXLKYXBa5dVQ2c5OjFKw";
getPOTD(baseURL);

function getByDate() {
  let dateValue = document.querySelector("input").value;
  let date = `https://api.nasa.gov/planetary/apod?api_key=NGbXFaC948GisO5Nx2TmrXLKYXBa5dVQ2c5OjFKw&date=${dateValue}`;

  getPOTD(date);
}


function getPOTD(url) {
  const iframe = document.querySelector("iframe");
  const img = document.querySelector("img");
  const copyright = document.querySelector(".copyright");

  fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.media_type==="video") {
      iframe.src=data.url;
      iframe.classList.remove("hidden");
      img.src="";
      }
      else {
        if (!iframe.classList.contains("hidden"))
          iframe.classList.add("hidden");
        img.src=data.url;
      };
    if (data.copyright)
      copyright.innerHTML = `&copy; ${data.copyright}`
      else copyright.innerHTML = "";
    document.querySelector("h1").innerText=`${data.date}:  ${data.title}`;
    document.querySelector(".explanation").innerText=data.explanation;
  })
  .catch(err => {
      console.log(`error ${err}`)
  });
}