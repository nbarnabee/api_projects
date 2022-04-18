
document.getElementById("question-getter").addEventListener("click", getQuestions);


function getQuestions() {
  let url;
  let amount = document.getElementById("question-amount").value;
  if (amount && amount>0) 
    url = `https://opentdb.com/api.php?amount=${amount}`;
    else url = `https://opentdb.com/api.php?amount=1`;
  fetch(url)
  .then(result => result.json())
  .then(data => {
  console.log(data);
  })
  .catch(error => {
    console.log(`Error: ${error}`);
    // any additional error messages here
  })
}


// structure is data.results[NUM]....

/*  Ok, we're doing a few things here.
1. assemble the questions/answers

data.results.forEach(result => makeQuestionBlock(result));

function makeQuestionBlock(result) {
  let question = result.question;
  let difficulty = result.difficulty;
  let category = result.difficulty;
  if (result.type = "multiple") {
    let answerSet = result.incorrect_answers.push(result.correct_answer);
    let answerSetFinal = shuffleArray(answerSet)
    }
    else let answerSetFinal = ["True", "False"];
  makeAnswerList(answerSetFinal);
  
// for multiple choice questions, need radio buttons for each one
// for true/false questions, need two radio buttons


//run the answerSet through the random scrambler function

function shuffleArray(arr) {
  for (let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random()*(i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

question format:
`<section class="question"><h3>${question}</h3><small>Category: ${category}, Difficulty: ${difficulty}</small>`





2. put them on the page

document.querySelector(".quiz").appendChild

3. evaluate the response






*/