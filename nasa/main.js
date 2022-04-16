fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)
  //and do whatever else you want to do with it here
  if (data.media_type==="video") {
    document.querySelector("iframe").src=data.url;
    document.querySelector("iframe").classList.remove("hidden");
  }
    else document.querySelector("img").src=data.url;
  document.querySelector("h1").innerText=`${data.date}:  ${data.title}`;
  document.querySelector(".explanation").innerText=data.explanation;
})
.catch(err => {
    console.log(`error ${err}`)
});