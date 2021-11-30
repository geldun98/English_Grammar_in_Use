let idQuestion = 0;
let state = 0;
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

const listQuestion = [
  "They don't have anywhere to live right now.",
  'Emily has just started a new job.',
  "I don't like living here any more.",
  'Things are not so good at at work.',
  'Hurry up, Sally!',
  'Lisa has an exam next week.',
  "They don't need their car any more.",
  "I'm going on holiday next next.",
];
const listAnswer = [
  'The company is losing money.',
  "She's studying hard for it.",
  "They're staying with friends.",
  "I'm really looking forward to it.",
  "They're trying to sell it.",
  'Everybody is waiting for you.',
  "She's working in a coffee shop.",
  "I'm thinking of moving.",
];

const trueListAnswer = [
  listQuestion[0].concat(' ').concat(listAnswer[2]),
  listQuestion[1].concat(' ').concat(listAnswer[6]),
  listQuestion[2].concat(' ').concat(listAnswer[7]),
  listQuestion[3].concat(' ').concat(listAnswer[0]),
  listQuestion[4].concat(' ').concat(listAnswer[5]),
  listQuestion[5].concat(' ').concat(listAnswer[1]),
  listQuestion[6].concat(' ').concat(listAnswer[4]),
  listQuestion[7].concat(' ').concat(listAnswer[3]),
];
const showListAnswer = listAnswer.map((item) => `<div class="section__item"> ${item}</div>`);
const showAnswer = [
  `
<div class="section__choose"></div> `,
  `<div class="section__item"></div>`,
  ...showListAnswer,
  `<div class="section__item "></div>`,
  `<div class="section__item "></div>`,
];
let selectAnswer = '....';
function handleAnswer() {
  document.querySelector('.section').innerHTML = showAnswer.join(' ');
}
handleAnswer();

function showQuestion(id) {
  if (selectAnswer !== '....') {
    document.querySelector('.check-btn').classList.remove('hideBtn');
  }
  if (id === state) {
    document.querySelector('.check-btn').classList.add('hideBtn');
    console.log(state, id);
    state = state + 1;
  }
  document.querySelector('.question-show').innerHTML = `${listQuestion[id]} ${selectAnswer}`;
}
showQuestion(idQuestion);
function checkscroll(e) {
  const distant = 70;
  const arrayDistant = [
    distant,
    2 * distant,
    3 * distant,
    4 * distant,
    5 * distant,
    6 * distant,
    7 * distant,
    8 * distant,
  ];
  switch (e.target.scrollTop) {
    case arrayDistant[0]: {
      selectAnswer = listAnswer[arrayDistant[0] / distant - 1];
      showQuestion(idQuestion);

      break;
    }
    case arrayDistant[1]: {
      selectAnswer = listAnswer[arrayDistant[1] / distant - 1];
      showQuestion(idQuestion);
      break;
    }
    case arrayDistant[2]: {
      selectAnswer = listAnswer[arrayDistant[2] / distant - 1];
      showQuestion(idQuestion);
      break;
    }
    case arrayDistant[3]: {
      selectAnswer = listAnswer[arrayDistant[3] / distant - 1];
      showQuestion(idQuestion);
      break;
    }
    case arrayDistant[4]: {
      selectAnswer = listAnswer[arrayDistant[4] / distant - 1];
      showQuestion(idQuestion);
      break;
    }
    case arrayDistant[5]: {
      selectAnswer = listAnswer[arrayDistant[5] / distant - 1];
      showQuestion(idQuestion);
      break;
    }
    case arrayDistant[6]: {
      selectAnswer = listAnswer[arrayDistant[6] / distant - 1];
      showQuestion(idQuestion);
      break;
    }
    case arrayDistant[7]: {
      selectAnswer = listAnswer[arrayDistant[7] / distant - 1];
      showQuestion(idQuestion);
      break;
    }
    default:
      selectAnswer = '....';
  }
}

function handleCheck() {
  const finalAnswer = document.querySelector('.question-show').innerHTML;
  if (finalAnswer === trueListAnswer[idQuestion]) {
    score = score + 1;
    document.querySelector('.check-btn').classList.add('trueNext');
    document.querySelector('.check-next-true').classList.remove('trueNext');
  } else {
    document.querySelector('.check-btn').classList.add('trueNext');
    document.querySelector('.check-next-false').classList.remove('trueNext');
  }
}
function handleNext() {
  document.querySelector('.check-btn').classList.remove('trueNext');
  document.querySelector('.check-next-true').classList.add('trueNext');
  document.querySelector('.check-next-false').classList.add('trueNext');
  idQuestion = idQuestion + 1;
  if (idQuestion < listQuestion.length) {
    selectAnswer = '....';
    document.querySelector('.section').scrollTop = 0;
    showQuestion(idQuestion);
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
