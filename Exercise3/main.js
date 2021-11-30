let idQuestion = 0;

let score = 0;
let name;
let information;
let view;
GetDataUser();

function getIP(json) {
  information = json.ip;
}

function GetDataUser() {
  urlGet =
    'https://script.google.com/macros/s/AKfycbwdRidXHM1G-gpQ71cZkzQY3rpPSbv-j37bQ45WMS7_xhCJA7mNKiJzsoUx0zFYKiX9Iw/exec?action=getUsers';
  fetch(urlGet)
    .then((res) => res.json())
    .then((data) => {
      view = data.length;
    });
}

let inputAnswer = `<span  class="inputAnswer" contenteditable="true" spellcheck="false"></span>`;
let listQuestion = [
  `(It / start) ${inputAnswer} to rain and we don't have an umbrella.`,
  `Can I turn off the TV or  ${inputAnswer} (you / watch) it?`,
  `The situation is already bad, and ${inputAnswer} (it / get) worse.`,
  `${inputAnswer} (Tom / not / work) today. He's taken the day off.`,
  `A: ${inputAnswer} (Kata / enjoy) her new job? <br> B: Yes. She's very happy.`,
  `Laura is in the kitchen. ${inputAnswer} (She / do) the washing-up.`,
  `Unemployment is already very high, and ${inputAnswer} (it / increase).`,
  `Why ${inputAnswer} (you / laugh)? What's so funny?`,
  `I want to lose weight, so this week ${inputAnswer} (I / not / eat) lunch.`,
  `John has been in the same job for a long time. ${inputAnswer} (He / begin) to get bored with it.`,
];
let listAnswer = [
  [`It's starting`, `It is starting`],
  ['Are you watching'],
  [`It's getting`, `It is getting`],
  [`Tom is not working`, `Tom isn't working`, `Tom's not working`],
  [`Is Kate enjoying`],
  [`She's doing`, `She is doing`],
  [`It is increasing`, `it's increasing`],
  [`are you laughing`],
  [`I'm not eating`, `I am not eating`],
  [`He's beginning`, `He is beginning`],
];
function start(id) {
  document.querySelector('.check-result-button').classList.add('hideActive');
  document.querySelector('.question-show').innerHTML = listQuestion[id];
}
start(idQuestion);

function handleActive() {
  document.querySelector('.check-result-button').classList.remove('hideActive');
}

function hanleCheckTrue() {
  score = score + 1;
  document.querySelector('.check-result').classList.add('activeNone');
  document.querySelector('.check-true').classList.remove('activeNone');
}
function hanleCheckFalse() {
  document.querySelector('.check-result').classList.add('activeNone');
  document.querySelector('.check-false').classList.remove('activeNone');
}
function handleNext() {
  idQuestion = idQuestion + 1;
  if (idQuestion < listQuestion.length) {
    document.querySelector('.check-result').classList.remove('activeNone');
    document.querySelector('.check-true').classList.add('activeNone');
    document.querySelector('.check-false').classList.add('activeNone');
    start(idQuestion);
  } else {
    endgame();
  }
}
function handleCheck() {
  const selectAnswer = document.querySelector('.inputAnswer').textContent;

  if (listAnswer[idQuestion].some((answer) => answer.trim().toUpperCase() === selectAnswer.trim().toUpperCase())) {
    hanleCheckTrue();
  } else {
    hanleCheckFalse();
  }
}

function endgame() {
  document.querySelector('.app').classList.add('check-end');
  document.querySelector('.endgame').classList.remove('check-end');
  document.querySelector('.endgame-nameUser').innerHTML = `${name}`;
  document.querySelector('.endgame-score').innerHTML = `${score}/${listQuestion.length}`;
  document.querySelector('.endgame-view').innerHTML = `View: ${view}`;
  PostDataUser();
}

function PostDataUser() {
  const urlPost =
    'https://script.google.com/macros/s/AKfycbwdRidXHM1G-gpQ71cZkzQY3rpPSbv-j37bQ45WMS7_xhCJA7mNKiJzsoUx0zFYKiX9Iw/exec?action=addUser';

  const dataUser = {
    Name: `${name}`,
    Score: `${score}/${listQuestion.length}`,
    Information: information,
  };
  fetch(urlPost, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(dataUser), // body data type must match "Content-Type" header
  });
}

function enterSubmit(e) {
  if (e.keyCode === 13) {
    submitName();
  }
}
function submitName() {
  name = document.querySelector('.name-input').value;

  if (name.length < 3) {
    document.querySelector('.name-check').classList.remove('check-input');
  } else {
    document.querySelector('.app').classList.remove('check-end');
    document.querySelector('.name').classList.add('check-end');
  }
}
function focusName() {
  document.querySelector('.name-check').classList.add('check-input');
  document.querySelector('.name-input').value = '';
}
