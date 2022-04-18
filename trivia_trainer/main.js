
document.getElementById("question-getter").addEventListener("click", getQuestions);


function getQuestions() {
  document.querySelector(".quiz-display").innerHTML="";
  let url;
  let amount = document.getElementById("question-amount").value;
  let select = document.querySelector("select");
  let difficulty = select.options[select.selectedIndex].value;
  url = buildURL(difficulty, amount)
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

function buildURL(difficulty, amount) {
  if (!amount || amount <= 0)
    amount = 1;
  if (difficulty) 
    url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`
  else 
    url = `https://opentdb.com/api.php?amount=1`;
  console.log(url);
  return url;
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
    <small>${category}, ${difficulty}</small>
    <fieldset>
    <label>${answerSet[0]}<input type="radio" value="${answerSet[0]}"</label>
    <label>${answerSet[1]}<input type="radio" value="${answerSet[1]}"</label>
    </fieldset>`
  else 
  questionBlock.innerHTML = `<section class="question">
    <h3>${question}</h3>
    <small>${category}, ${difficulty}</small>
    <fieldset class="flex-column">
    <label><input type="radio" value="${answerSet[0]}">${answerSet[0]}</label>
    <label><input type="radio" value="${answerSet[1]}">${answerSet[1]}</label>
    <label><input type="radio" value="${answerSet[2]}">${answerSet[2]}</label>
    <label><input type="radio" value="${answerSet[3]}">${answerSet[3]}</label>
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