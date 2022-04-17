const adjective1 = ["An innovative", "A visionary", "A bleeding edge", "A revolutionary", "An elegant", "A disruptive", "An agile", "A lean"];
const adjective2 = ["web3", "blockchain", "mobile-first", "crowdsourced", "dynamic"];
const randomNoun = ["deliverable", "platform", "solution", "ecosystem"];
document.querySelector("button").addEventListener("click", generatePitch);

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]};

function generatePitch() {
  fetch("https://corporatebs-generator.sameerkumar.website/")
  .then(res=>res.json())
  .then(data => {
    document.querySelector("h2").innerHTML = `${getRandomElement(adjective1)} ${getRandomElement(adjective2)} ${getRandomElement(randomNoun)} that will ${data.phrase.toLowerCase()}`;
  })
};


/* additional buzzwords

verbs:
pivot
disrupt
scale
ideate
leverage
democratize

nouns:
paradigm shift
game changer
change agent
thought leader

*/