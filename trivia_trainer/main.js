
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
  })
}

function makeQuestionBlock(result) {
  let question = result.question;
  let difficulty = result.difficulty;
  let category = result.category;
  let answerSet;
  if (result.type === "multiple")
    answerSet = makeAnswerList(result.correct_answer, result.incorrect_answers)
    else answerSet = ["True", "False"];
  console.log(answerSet);
  let questionBlock = document.createElement("section");
  if (answerSet.length == 2)
    questionBlock.innerHTML = `<section class="question">
    <h3>${question}</h3>
    <small>${category}</small>
    <fieldset>
    <label>${answerSet[0]}<input type="checkbox" value="${answerSet[0]}"</label>
    <label>${answerSet[1]}<input type="checkbox" value="${answerSet[1]}"</label>
    </fieldset>`
  else 
  questionBlock.innerHTML = `<section class="question">
    <h3>${question}</h3>
    <small>${category}</small>
    <fieldset class="flex-column">
    <label><input type="checkbox" value="${answerSet[0]}">${answerSet[0]}</label>
    <label><input type="checkbox" value="${answerSet[1]}">${answerSet[1]}</label>
    <label><input type="checkbox" value="${answerSet[2]}">${answerSet[2]}</label>
    <label><input type="checkbox" value="${answerSet[3]}">${answerSet[3]}</label>
    </fieldset>`
  document.querySelector(".quiz-display").appendChild(questionBlock);
};



function makeAnswerList(trueString, answerArr) {
  answerArr.push(trueString);
  return shuffleArray(answerArr);
}

function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random()*(i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


/*
 let answerSet;
  let answerSetFinal;
  if (result.type === "multiple") {
    answerSet = result.incorrect_answers.slice().push(result.correct_answer);
    answerSetFinal = shuffleArray(answerSet)
    }
    else answerSetFinal = ["True", "False"];
  console.log(answerSetFinal);
  // makeAnswerList(answerSetFinal);



    let answer;
  let answerBlock = document.createElement("fieldset").appendChild(
arr.forEach(e => {
  answer = document.createElement("label");
  answer.innerHTML = `${e}<input type="radio" value="${e}">`}))
  return answerBlock;
}

*/

  
// for multiple choice questions, need radio buttons for each one
// for true/false questions, need two radio buttons


//run the answerSet through the random scrambler function

