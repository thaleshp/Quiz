const scoreArea = document.querySelector('.scoreArea');
const questionArea = document.querySelector('.questionArea');

let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

//events

document
  .querySelector('.scoreArea button')
  .addEventListener('click', resetEvents);

function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];

    let pct = Math.floor((currentQuestion / questions.length) * 100);
    document.querySelector('.progress--bar').style.width = `${pct}%`;

    scoreArea.style.display = 'none';
    questionArea.style.display = 'block';

    document.querySelector('.question').innerHTML = q.question;
    document.querySelector('.options').innerHTML = '';

    let optionsHtml = '';
    for (let i in q.options) {
      optionsHtml += `<div data-op="${i}" class="option"><span>${
        parseInt(i) + 1
      }</span>${q.options[i]}</div>`;
    }

    document.querySelector('.options').innerHTML = optionsHtml;

    document.querySelectorAll('.options .option').forEach(item => {
      item.addEventListener('click', optionClickEvent);
    });
  } else {
    finishQuiz();
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute('data-op'));

  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
  }

  currentQuestion++;
  showQuestion();
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100);

  if (points < 30) {
    document.querySelector('.scoreText1').innerHTML =
      'Vai estudar seu vagabundo!';
    document.querySelector('.scorePct').style.color = '#ff0000';
  } else if (points >= 30 && points < 70) {
    document.querySelector('.scoreText1').innerHTML =
      'Muito bom, mas da para melhorar!!';
    document.querySelector('.scorePct').style.color = '#ffff00';
  } else if (points >= 70) {
    document.querySelector('.scoreText1').innerHTML = 'Você é PIKA';
    document.querySelector('.scorePct').style.color = '#0D630D';
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
  document.querySelector(
    '.scoreText2'
  ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

  scoreArea.style.display = 'block';
  questionArea.style.display = 'none';
  document.querySelector('.progress--bar').style.width = `100%`;
}

function resetEvents() {
  correctAnswers = 0;
  currentQuestion = 0;
  showQuestion();
}
