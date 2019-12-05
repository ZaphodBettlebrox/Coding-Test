var timer = document.querySelector(".timer");
var highscore = document.querySelector(".highscore");
var landingpge = document.querySelector(".landingpage");
var startButton = document.querySelector('button[type="submit"]');
var testpge = document.querySelector(".testpage");
var questions = document.querySelector(".question");
var resultspge = document.querySelector(".resultspage");
var results = document.querySelector(".results");
var initialspge = document.querySelector(".initialspage");
var nextQuiz = document.querySelector('button[type="button"]')
var questionTitle = document.querySelector(".questiontitle");
var selectionList = document.querySelector(".questionchoices");

var i = 0;
timer.style.visibility = "hidden";
timer.textContent = "__";

// <!-- pressing start quiz start questions and starts timer. -->

testpge.style.display = "none";
resultspge.style.display = "none";
// landingpge.style.display = "none";
initialspge.style.display = "none";

startButton.addEventListener("click", function() {
  console.log("start");

  var secondsLeft = 10;
  timer.style.visibility = "visible";

  prepquestions();

  var countdown = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(countdown);
      populateinitials();
    }
  }, 1000);
});

function prepquestions() {
  landingpge.style.display = "none";
  testpge.style.display = "inline";

 
  populateQuestion(i);
  i++;
}

function populateQuestion() {
  if (i < allQuestions.length){
  var individualQuestion = allQuestions[i];
  questionTitle.innerText = individualQuestion.question;

  selectionList.innerHTML = ""; //reset choices list
  for (key in individualQuestion.choices) {
    var radioBtnName = "question" + i + "_choice";
    var choiceText = individualQuestion.choices[key];
    selectionList.appendChild(createLi(radioBtnName, choiceText));
  }
}}

function createLi(name, choiceText) {
  var e = document.createElement("li");
  var radioHtml = '<input type="radio" name="' + name + '"';
  radioHtml += "/>";
  radioHtml += choiceText;
  e.innerHTML = radioHtml;
  return e;
}

nextQuiz.addEventListener("click",function(){
console.log("clicked");

if (i > allQuestions.length - 1) {
  populateinitials();
}
populateQuestion(i);
  i++;

})

function populateinitials(){
   testpge.style.display = "none";
    initialspge.style.display = "inline"; 
}

// <!-- Score: calculated by time remaining. Wrong answer decreases the score by a number of seconds (like 15) -->

// <!-- When time runs out/questions are answered the quiz ends. -->

// <!-- New page pops up with score and prompt to put in initials which are stored in "localStorage"
