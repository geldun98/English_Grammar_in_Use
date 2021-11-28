GetDataUser();
let listTrueAnswer = [
  "She's taking a picture.",
  "He's tying his shoelace.",
  "They're crossing the road.",
  "He's scratching his head.",
  "They're waving to somebody.",
  "She's hiding behind a tree.",
];
let listQuestion = [
  "She's {taking} a picture.",
  "He's {tying} his shoelace.",
  "They're {crossing} the road.",
  "He's {scratching} his head.",
  "They're {waving} to somebody.",
  "She's {hiding} behind a tree.",
];
let name;
let information;
let view;
const blank = "<span class='question-input'>.......</span>";
let listArrayQuestion = listQuestion.map((question) => question.split(' '));
let newListArrayQuestion = [];
let showListArrayQuestion = [];
listArrayQuestion.forEach((question) => {
  newListArrayQuestion = question.map((word) => {
    if (word.indexOf('{') !== -1) {
      return blank;
    } else return word;
  });
  showListArrayQuestion.push(newListArrayQuestion);
});
const showListQuestion = showListArrayQuestion.map((question) => question.join(' '));

let idQuestion = 0;
function start(id) {
  document.querySelector('.question-show').innerHTML = showListQuestion[id];
  document.querySelector('.show-image').src = `./img/pic${id}.jpg`;
}
start(idQuestion);

function check_btn(e) {
  const answer_input = e.target.innerHTML;
  const question_input = document.querySelector('.question-input');
  question_input.innerHTML = answer_input;
}
let score = 0;
function check_result() {
  const answer = document.querySelector('.question-show').textContent;

  if (answer === listTrueAnswer[idQuestion]) {
    score = score + 1;
    document.querySelector('.question-input').classList.add('true-input');
  } else {
    document.querySelector('.question-input').classList.add('false-input');
  }
  document.querySelector('.modal').classList.add('modal-true');
}
function next_question() {
  document.querySelector('.modal').classList.remove('modal-true');
  idQuestion = idQuestion + 1;
  if (idQuestion < listQuestion.length) {
    start(idQuestion);
  } else {
    endgame();
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
