import questions from "./questoes.js";

const questoes = document.querySelector(".question");
const option = document.querySelector(".option");
const nota = document.querySelector(".score");
const content = document.querySelector(".container");
const exitBtn = document.getElementById("exitBtn");
const exitModal = document.getElementById("exitModal");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const nextBtn = document.getElementById("nextBtn");
const textFinish = document.querySelector(".textFinish");
const contentFinish = document.querySelector(".contentFinish");

let currentIndex = 0;
let questionsCorrect = 0;

loadQuestion();

// Show modal when "SAIR" is clicked
exitBtn.addEventListener("click", () => {
  exitModal.style.display = "flex";
});

// Hide modal when "Não" is clicked
noBtn.addEventListener("click", () => {
  exitModal.style.display = "none";
});

// Redirect when "Sim" is clicked
yesBtn.addEventListener("click", () => {
  alert("Saindo do quiz!");
  window.location.href = "index.html"; // Example redirect
});

// Add event listener for "PRÓXIMO" button
nextBtn.addEventListener("click", nextQuestion);

function nextQuestion(e) {
  const selectedOption = e.target;
  if (selectedOption.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  questoes.innerHTML = "";
  option.innerHTML = "";

  const currentQuestion = questions[currentIndex];
  questoes.innerHTML = currentQuestion.question;
  nota.innerHTML = `${currentIndex + 1}/${questions.length}`;

  currentQuestion.answers.forEach((answer) => {
    const div = document.createElement("div");
    div.innerHTML = `<button class= "options" data-correct = "${answer.correct}"> ${answer.option} </button>`
    div.setAttribute("data-correct", answer.correct);
    div.addEventListener("click", nextQuestion);

    option.appendChild(div);
  });
}

loadQuestion()