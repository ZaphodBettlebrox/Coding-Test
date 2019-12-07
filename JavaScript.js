//Left to do:
//save highscores
// save name
//say correct or incorect and -score if wrong.

var timer = document.querySelector(".timer");
var highscore = document.querySelector(".highscore");
var landingpge = document.querySelector(".landingpage");
var startButton = document.querySelector("#startquiz");
var testpge = document.querySelector(".testpage");
var questions = document.querySelector(".question");
var resultspge = document.querySelector(".resultspage");
var results = document.querySelector(".results");
var initialspge = document.querySelector(".initialspage");
var nextQuiz = document.querySelector('button[type="button"]');
var questionTitle = document.querySelector(".questiontitle");
var selectionList = document.querySelector(".questionchoices");
var initialsButton = document.querySelector("#submitInitials");
var resetQuiz = document.querySelector("#resetquiz");
var initials = document.getElementById("initials");

var i = 0;
var secondsLeft = 60;
timer.style.visibility = "hidden";
highscore.style.visibility = "visible";
timer.textContent = "60";
var score=timer.textContent;
var name = initials.textContent;
// var storeData=timer.textContent;
// var countdown;

// <!-- pressing start quiz start questions and starts timer. -->

testpge.style.display = "none";
resultspge.style.display = "none";
initialspge.style.display = "none";

// function answer() {
// if(answer=)
// }

highscore.addEventListener("click", function() {
  resultspge.style.display = "inline";
  landingpge.style.display = "none";
});

startButton.addEventListener("click", function() {
  console.log("start");
  prepquestions();
});

// seperate and add some true and false statements
function prepquestions() {
  highscore.style.visibility = "hidden";
  landingpge.style.display = "none";
  testpge.style.display = "inline";
  timer.style.visibility = "visible";
  countdownTimer();
}

function countdownTimer() {

  countdown = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;
    // <!-- When time runs out/questions are answered the quiz ends. -->

    if (i > allQuestions.length) {
      console.log("score "+timer.textContent);
      clearInterval(countdown);
      
      populateinitials();
      
    }

    if (secondsLeft === 0) {
      console.log("score "+timer.textContent);
      clearInterval(countdown);
      populateinitials();
      
    }
  }, 1000);

  populateQuestion(i);
  i++;
}

function populateQuestion() {
  if (i < allQuestions.length) {
    var individualQuestion = allQuestions[i];
    questionTitle.innerText = individualQuestion.question;

    selectionList.innerHTML = "";
    for (key in individualQuestion.choices) {
      var radioBtnName = "question" + i + "choice";
      var choiceText = individualQuestion.choices[key];
      selectionList.appendChild(createLi(radioBtnName, choiceText));
    }
  }
}

function createLi(name, choiceText) {
  var e = document.createElement("li");
  var radioHtml = '<input type="radio" name="' + name + '"';
  radioHtml += "/>";
  radioHtml += choiceText;
  e.innerHTML = radioHtml;

  // console.log(choiceText);
  return e;
}

// nextQuiz.addEventListener("click", function() {
  
//   console.log(choiceText);
// })


nextQuiz.addEventListener("click", function() {
  console.log("next Quiz");
  populateQuestion(i);
  i++;
});

function populateinitials() {
  testpge.style.display = "none";
  initialspge.style.display = "inline";
  timer.style.visibility = "hidden";
} 

initialsButton.addEventListener("click", function() {
  console.log(name);
  
  localStorage.setItem('score', JSON.stringify(timer.textContent));

  
  console.log("submit results");
  populateResults();
});



function populateResults() {
  initialspge.style.display = "none";
  resultspge.style.display = "inline";
}

resetQuiz.addEventListener("click", function() {
  console.log("reset quiz");
  resultspge.style.display = "none";
  i = 0;
  secondsLeft = 20;
  timer.textContent = "20";
  console.log("time remaining "+secondsLeft);
  
  landingpge.style.display = "inline";
  highscore.style.visibility = "visible";

});

// <!-- Score: calculated by time remaining. Wrong answer decreases the score by a number of seconds (like 15) -->

// <!-- New page pops up with score and prompt to put in initials which are stored in "localStorage"
