const quizData = [
    {
      "id": 1,
      "question": "How to delete a directory in Linux?",
        a: '10',
        b: '17',
        c: '26',
        d: '110',
        correct: 'c'
    },
    {
        "id": 2,
        "question": "Favirate Programing language",
          a: 'Java',
          b: 'JavaScrip',
          c: 'Python',
          d: 'C++',
          correct: 'b'
    },
    {
        "id": 3,
        "question": "What do Love Do",
          a: 'Play',
          b: 'travling',
          c: 'Coding',
          d: 'SEX',
          correct: 'C'
    }
  ]


const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll(".answer")
const questionElements = document.getElementById('question')

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

const submitBtn = document.getElementById('submitbtn')

let currentQuetion = 0;
let score  = 0;

function loadQuetion(){

  deselectAnswer();

  const currentQuizData = quizData[currentQuetion];

  questionElements.innerText = currentQuizData.question;

  a_text.innerText  = currentQuizData.a;
  b_text.innerText  = currentQuizData.b;
  c_text.innerText  = currentQuizData.c;
  d_text.innerText  = currentQuizData.d;


}

function getSelected(){
  let answer = undefined;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked){
      answer = answerEl.id;
    }
  });

  return answer;
}

//deselecct answer
function deselectAnswer(){
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}


loadQuetion();//initialize load

submitBtn.addEventListener('click', function(){
  const answer = getSelected();

  if(answer){
    if(answer === quizData[currentQuetion].correct){
      score++
    }

    currentQuetion++;

    if(currentQuetion < quizData.length){
      loadQuetion();
    }else{
      submitBtn.classList.remove("submit");
      submitBtn.classList.add("result");
      submitBtn.innerText = "Result"

      quiz.innerHTML = `
      <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
          <button class="submit" onclick="location.reload()">Reload</button>
      `;
    }
  }


});

