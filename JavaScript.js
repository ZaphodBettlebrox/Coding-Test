//Left to do:
//say correct or incorect and -score if wrong (line 134)
//pull a list from local storage of all scores (line 161)
// fix radioRemoved on (119)

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
var score = timer.textContent;
var name = initials.textContent;


var answertext;
var choicetext;

// <!-- pressing start quiz start questions and starts timer. -->

testpge.style.display = "none";
resultspge.style.display = "none";
initialspge.style.display = "none";


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
      console.log("score " + timer.textContent);
      clearInterval(countdown);

      populateinitials();
    }

    if (secondsLeft === 0) {
      console.log("score " + timer.textContent);
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
      var choiceText = individualQuestion.choices[key];
      selectionList.appendChild(createLi(choiceText));
    }
    
  }
}

function createLi(choiceText) {
  var e = document.createElement("li");
  var radioHtml = '<input type="radio" name="choice"/>';
  
  
  

  radioHtml += choiceText;
  e.innerHTML = radioHtml;

  radioRemoved =radioHtml.replace('<input type="radio" name="choice"/>', '');
  
  // console.log(radioRemoved);
  console.log(allQuestions[i].answer);
  console.log(document.querySelector(".questionchoices").textContent);
  

  return e;
}

nextQuiz.addEventListener("click", function() {


  // var radios = radioRemoved;
  var r = 0, len = radioRemoved.length;
  var checked = false;  
  
  for( ; r < len; r++ ) {
     if(radios[r].checked) {
       checked = true;
       var userAnswer = radioRemoved;
     }
  } 
  // if user click submit button without selecting any option, alert box should be say "please select choice answer".
  if(!checked) {
    alert("please select choice answer");
    secondsLeft--;
    return;
  }
  // Correct answer
  if(userAnswer === allQuestions[i].answer) {
     alert("Answer is correct!");
    

  }
  // incorrect answer
  else {
     alert("Answer is wrong!");
     secondsLeft--;
    
}})

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
  var username = document.getElementById('initials').value;
  var StorageScore = username +" score";
  var StorageUsername = username +" username";
  
  localStorage.setItem(StorageScore, JSON.stringify(timer.textContent));
  localStorage.setItem(StorageUsername, JSON.stringify(username));

  populateResults();
});

function populateResults() {
  // var SScorePull, SUsernamePull;

  initialspge.style.display = "none";
  resultspge.style.display = "inline";

  // var SScorePull = localStorage.getItem('StorageScore');
  // SScorePull = JSON.parse(StorageScore)
  // var SUsernamePull = localStorage.getItem('StorageUsername');
  // SUsernamePull = JSON.parse(StorageUsername)
 
}

resetQuiz.addEventListener("click", function() {
  console.log("reset quiz");
  resultspge.style.display = "none";
  i = 0;
  secondsLeft = 60;
  timer.textContent = "60";
  console.log("time remaining " + secondsLeft);

  landingpge.style.display = "inline";
  highscore.style.visibility = "visible";
});

// <!-- Score: calculated by time remaining. Wrong answer decreases the score by a number of seconds (like 15) -->

// <!-- New page pops up with score and prompt to put in initials which are stored in "localStorage"
