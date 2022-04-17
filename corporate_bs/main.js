const adjective1 = ["An innovative", "A visionary", "A bleeding edge", "A revolutionary", "An elegant", "A disruptive"];
const adjective2 = ["web3", "blockchain", "mobile-first", "crowdsourced", "dynamic"];
const finalNoun = ["deliverable", "platform", "solution", "ecosystem"];
let randomAdj1, randomAdj2, randomNoun;
document.querySelector("button").addEventListener("click", generatePitch);
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

function generatePitch() {
  fetch("https://corporatebs-generator.sameerkumar.website/")
  .then(res=>res.json())
  .then(data => {
    console.log(data);
    randomAdj1 = getRandomElement(adjective1);
    randomAdj2 = getRandomElement(adjective2);
    randomNoun = getRandomElement(randomNoun);
    document.querySelector("h2").innerHTML = `${randomAdj1} ${randomAdj2} ${randomNoun} that will ${data.phrase.toLowerCase()}`;
  })
  .catch(err => {
    console.log(`error ${err}`)
  });
};


/* additional buzzwords

verbs:
pivot
disrupt
scale
ideate
leverage
democratize

adjectives:
disruptive
revolutionary
bleeding edge
lean
real time
crowdsourced
visionary
elegant
unparalleled
innovative
mobile-first
web3

nouns:
web3
blockchain
NFT
deliverable
platform
solution
convergence
ecosystem
paradigm shift
game changer
change agent
thought leader

https://zenquotes.io/

const adjective1 = ["An innovative", "A visionary", "A bleeding edge", "A revolutionary", "An elegant", "A disruptive"]
const adjective2 = ["web3", "blockchain", "mobile-first", "crowdsourced"]
const finalNoun = ["deliverable", "platform", "solution", "ecosystem"]


adjective1 + adjective2 + finalNoun that will <api result>

*/