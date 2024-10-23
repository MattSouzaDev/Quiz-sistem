//Esses const estão selecionando elementos do HTML usando document.querySelector, que permite selecionar elementos baseados em seus seletores CSS.
const question = document.querySelector(".questoes");
const answers = document.querySelector(".answers");// answers é um class do div do html  do main.html
const spnQtd = document.querySelector(".spnQtd"); 
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

//linha 11 importa o objeto questoes.js, as perguntas.
import questions from "./questoes.js";

//declaração de variaveis, currentIndex mantem o indice da pergunta atual
// questionsCorrect é o contador de respostas corretas.
let currentIndex = 0;
let questionsCorrect = 0;

//quando restartado, essa função zera os contadores
btnRestart.addEventListener("click", () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
});

//a cada elemento clicado o atributo dara-correct é definido com "true" e questionsCorrect é incrementado.
function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect+=2;// Incrementa por 2 em vez de 1
  }

 // function nextQuestion(e) {
   // if (e.target.getAttribute("data-correct") === "true") {
     // questionsCorrect += 2;
      //e.target.classList.add("correct");
    //} else {
      //e.target.classList.add("incorrect");
      //const correctAnswer = document.querySelector('[data-correct="true"]');
      //correctAnswer.classList.add("correct");
    //}
  
    // Disable all buttons to prevent further clicks
    //document.querySelectorAll(".answer").forEach((button) => {
    //  button.disabled = true;
    //});
  
           // setTimeout(() => {
     // if (currentIndex < questions.length - 1) {
     //   currentIndex++;
      //  loadQuestion();
     // } else {
    //    finish();
    //  }
  //  }, 2000); // Delay to show the result before moving to the next question
 // }
  

  //verificação se há mais perguntas para ser respondida
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  textFinish.innerHTML = `Sua pontuação: ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  const p = document.createElement('p')
  //spnQtd.innerHTML atualiza o elemento spnQtd para mostrar a progresso atual.
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  //linha 49 armazena a pergunta atual
  let item = questions[currentIndex];
  //linha 51 limpa respostas antigas
  answers.innerHTML = "";
  //linha 53 exibe a pergunta atual no elemento question
  console.log(question.innerHTML = item.question)

  //linha 56 cria botões para cada resposta
  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

// linha 69 adiona um evento de clique a cada botão de resposta para chmar a função nextQuestion quando clicado.
//Essa parte do código basicamente lida com o carregamento das perguntas e suas respectivas respostas, além de finalizar
// o quiz e exibir a pontuação final.  
document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}


loadQuestion();