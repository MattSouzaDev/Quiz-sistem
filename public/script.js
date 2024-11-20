const question = document.querySelector(".questoes");  //questoes
const salvar = document.querySelector(".salvar");
const valueInput = document.querySelector("#value")
const answers = document.querySelector(".answers"); //option
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish .btnRestart");
const exitBtn = document.getElementById("exitBtn");
const nextBtn = document.getElementById("nextBtn");
const exitModal = document.getElementById("exitModal");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const form = document.getElementById('data-form');

import questions from "./questoes.js";


let currentIndex = 0;
let questionsCorrect = 0;

// Mostrar Modal quando "SAIR" for clicado
exitBtn.addEventListener("click", () => {
  exitModal.style.display = "flex";
});

// adicionando evento para o botao "PRÓXIMO"
nextBtn.addEventListener("click", nextQuestion);

// Esconder Modal quando "NAO" for clicado
noBtn.addEventListener("click", () => {
  exitModal.style.display = "none";
});

// Redirecionar a pagina quando "SIM" for clicado
yesBtn.addEventListener("click", () => {
  window.location.href = "index.html"; 
});

btnRestart.addEventListener("click", () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
});

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function autoInput(x) {
  valueInput.value = x; // Auto completar input
  valueInput.readOnly = true;  //e permitir usuario mudar o valor de questoes corretas
}

salvar.addEventListener("click", () => {
  exitModal.style.display = "none"
  autoInput(questionsCorrect)
  finish();
})

function finish() {
  textFinish.innerHTML = `<h2> Você acertou ${questionsCorrect} de ${questions.length} <\h2>`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
  autoInput(questionsCorrect);
}

function loadQuestion() {
  question.innerHTML = "";
  answers.innerHTML = "";


  
  
  const p = document.createElement('p')
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  
  let item = questions[currentIndex];
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;
    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();


// Handle form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  const formData = new FormData(form); // Get form data
  const data = {
    name: formData.get('name'),
    value: formData.get('value'),
  };

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // responseMessage.textContent = 'Data inserted successfully!';
      // responseMessage.style.color = 'green';
      form.reset(); // Clear the form
      window.location.href = "index.html"; // Example redirect
    } else {
      throw new Error('Failed to insert data');
    }
  } catch (error) {
    console.error('Error:', error);
    // responseMessage.textContent = 'Error inserting data. Please try again.';
    // responseMessage.style.color = 'red';
  }
});