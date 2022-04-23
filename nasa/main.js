window.onload = setCurrentDate;
window.onload = checkFavs;
document.getElementById("date-picker").onclick = getByDate;
document.getElementById("fav-picker").onclick = getByFav;
document.getElementById("add-to-favs").onclick = addToFavs;
let baseURL = "https://api.nasa.gov/planetary/apod?api_key=NGbXFaC948GisO5Nx2TmrXLKYXBa5dVQ2c5OjFKw";
getPOTD(baseURL);


function setCurrentDate() {
  let now = new Date();
  let today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  document.getElementById("selected-date").valueAsDate = today;
  document.getElementById("selected-date").max = now.toLocaleDateString("en-ca");
}

function checkFavs() {
  if (localStorage.getItem("favs"))
  populateMenu();
}

function getByDate() {
  let dateValue = document.getElementById("selected-date").value;
  let url = `https://api.nasa.gov/planetary/apod?api_key=NGbXFaC948GisO5Nx2TmrXLKYXBa5dVQ2c5OjFKw&date=${dateValue}`;
  getPOTD(url);
}

function getByFav() {
  const select = document.querySelector("select");
  const favValue = select.options[select.selectedIndex].value;
  let url = `https://api.nasa.gov/planetary/apod?api_key=NGbXFaC948GisO5Nx2TmrXLKYXBa5dVQ2c5OjFKw&date=${favValue}`;
  getPOTD(url);
}

function addToFavs() {
  let newFav = document.getElementById("selected-date").value;
  if (localStorage.getItem("favs")) 
    localStorage.setItem("favs", `${localStorage.getItem("favs")}  ${newFav}`);
  else localStorage.setItem("favs", newFav);
  populateMenu();
}

function populateMenu() {
  let favList = localStorage.getItem("favs").split(" ").filter(element => element !== "");
  let uniqueList = favList.filter((fav, i) => favList.indexOf(fav) === i).sort((a, b) => a > b ? 1 : -1);
  console.log(favList);
  console.log(uniqueList);
  uniqueList.forEach(fav => {
    let newOption = document.createElement("option");
    newOption.value = fav;
    newOption.innerHTML = `${fav}`;
    document.getElementById("favorites").appendChild(newOption);
  });
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
    document.querySelector("h1").textContent=`${data.date}:  ${data.title}`;
    document.querySelector(".explanation").textContent=data.explanation;
  })
  .catch(err => {
      console.log(`error ${err}`)
  });
}