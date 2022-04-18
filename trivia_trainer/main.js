
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
    data.results.forEach(result => makeQuestionBlock(result));
  })
  .catch(error => {
    console.log(`Error: ${error}`);
    // any additional error messages here
  })
}

function makeQuestionBlock(result) {
  let question = result.question;
  let difficulty = result.difficulty;
  let category = result.category;
  let questionBlock = document.createElement("section");questionBlock.innerHTML = `<section class="question"><h3>${question}</h3><small>Category: ${category}<br>Difficulty: ${difficulty}</small>`
  document.querySelector(".quiz-display").appendChild(questionBlock);
}


// structure is data.results[NUM]....

/*
  if (result.type = "multiple") {
    let answerSet = result.incorrect_answers.push(result.correct_answer);
    let answerSetFinal = shuffleArray(answerSet)
    }
    else let answerSetFinal = ["True", "False"];
  makeAnswerList(answerSetFinal);

  */
  
// for multiple choice questions, need radio buttons for each one
// for true/false questions, need two radio buttons


//run the answerSet through the random scrambler function

function shuffleArray(arr) {
  for (let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random()*(i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
