const questions = [
  {
    question:
      "What is the element used and hidden in code that explains things and makes the content more readable?",
    choices: ["Notes", "Comments", "Quotations", "Comparisons"],
    answer: "Comments",
  },
  {
    question:
      "In JavaScript, what is a block of code called that is used to perform a specific task?",
    choices: ["Function", "Declaration", "Variable", "String"],
    answer: "Function",
  },
  {
    question: "Javascript is an _______ language?",
    choices: [
      "Object-Oriented",
      "Object-Based",
      "Procedural",
      "None of the above",
    ],
    answer: "Object-Oriented",
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    choices: ["var", "let", "Both A and B", "None of the above"],
    answer: "Both A and B",
  },
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    choices: [
      "getElementbyId()",
      "getElementsByClassName()",
      "Both A and B",
      "None of the above",
    ],
    answer: "Both A and B",
  },
  {
    question:
      "Upon encountering empty statements, what does the Javascript Interpreter do?",
    choices: [
      "Throws an error",
      "Ignores the statements",
      "Gives a Warning",
      "None of the above",
    ],
    answer: "Ignores the statements",
  },
  {
    question:
      "Which of the following methods can be used to display data in some form using Javascript?",
    choices: [
      "document.write()",
      "console.log()",
      "window.alert()",
      "All of the above",
    ],
    answer: "All of the above",
  },
];

const startButton = document.getElementById("start-button");
const questionDiv = document.getElementById("questions");
const descrpitQuest = document.getElementById("description-question");
const rightWrong = document.getElementById("rightWrong");
const btnContainer = document.getElementById("btn-container");
const main = document.querySelector("main");
const timeLeft = document.getElementById("time-left");
const quizDecription = document.getElementById("quiz-descripton");
const initialForm = document.getElementById("initial-form");
const initials = document.getElementById("initials");
const endPage = document.getElementById("end-page");
const backBtn = document.getElementById("go-back");
const clearBtn = document.getElementById("clear-highscores");
const viewHighscore = document.getElementById("view-highscore");
clearBtn.addEventListener("click", clearHighscores);
backBtn.addEventListener("click", goBack);
initialForm.addEventListener("submit", highscorePage);
viewHighscore.addEventListener("click", displayHighscore);

let questNum = 0;
let countdown = 100;
let timer;
let currentHighscore = 0;
let highscore = localStorage.getItem("highscore");
startButton.addEventListener("click", function () {
  displayQuestions();

  timer = setInterval(function () {
    countdown--;
    timeLeft.textContent = countdown;
    if (countdown === 0) {
      clearInterval(timer);
    }
  }, 1000);
});
function displayQuestions() {
  btnContainer.innerHTML = "";
  btnContainer.style.display = "flex";
  endPage.style.display = "none";

  for (i = 0; i < questions[questNum].choices.length; i++) {
    const btn = document.createElement("button");
    btn.className = "question-buttons";
    btnContainer.appendChild(btn);

    btn.textContent = questions[questNum].choices[i];
    const choice = btn.textContent;

    btn.addEventListener("click", function () {
      checkAnswer(choice);
    });
  }
  descrpitQuest.textContent = questions[questNum].question;
  questionDiv.style.display = "block";
  startButton.style.display = "none";
  quizDecription.style.display = "none";
}

function checkAnswer(choice) {
  rightWrong.style.display = "block";
  if (choice === questions[questNum].answer) {
    rightWrong.textContent = "Correct !";
  } else {
    rightWrong.textContent = "False !";
    countdown = countdown - 5;
  }
  if (questNum >= questions.length - 1) {
    btnContainer.style.display = "none";
    descrpitQuest.textContent = "All done!";
    quizDecription.textContent = "your final score is " + countdown + ".";
    timeLeft.textContent = countdown;
    quizDecription.style.display = "block";
    initialForm.style.display = "block";
    clearInterval(timer);

    return;
  }
  questNum++;
  btnContainer.innerHTML = "";
  displayQuestions();
}

function highscorePage(event) {
  event.preventDefault();
  let score = countdown;

  currentHighscore = score;
  quizDecription.textContent =
    "1. " + initials.value + " - " + currentHighscore;
  descrpitQuest.textContent = "High scores!";
  initialForm.style.display = "none";
  rightWrong.style.display = "none";
  endPage.style.display = "block";
  if (currentHighscore > highscore) {
    localStorage.setItem("highscore", currentHighscore);
  } else {
    console.log("try again");
  }
}

function goBack(event) {
  startButton.style.display = "block";
  quizDecription.style.display = "block";
  endPage.style.display = "none";
  quizDecription.textContent =
    "Try to answer the following code-related questions within the time limit. Keep in mind that the incorrect answers will penalize your score/time by ten seconds!";
  descrpitQuest.textContent = "Coding quiz";
  questNum = 0;
  countdown = 100;
}

function clearHighscores(event) {
  localStorage.setItem("highscore", 0);
  viewHighscore.textContent =
    "Highscore : " + localStorage.getItem("highscore");
}

function displayHighscore(event) {
  viewHighscore.textContent =
    "Highscore : " + localStorage.getItem("highscore");
}
// when it starts has to dispay a new question

// display quesiton and choices

// when choice is clickjed has to verify answer and display correct or false display new question

// oncce no more questions diplay score

// make timer
