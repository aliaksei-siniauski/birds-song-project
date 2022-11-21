import { birdsDataBy } from './js/birds.js'


let questionIndex = 0; // current question
let score = 0;
let gameScore = document.querySelector(".score__point")


let currentItemSong = new Audio('/src/music/correct-answer.wav')
let wrongItemSong = new Audio('/src/music/wrong-answer.mp3')
let currentBirdVoice = new Audio();
let currentTime = 0;
let isPlay = false;
let audioBird = new Audio();

/* BirdCard settings */

const cardBirdName = document.querySelector('.card__name');
const cardBirdImage = document.querySelector('.card__img');
const cardBirdSoecies = document.querySelector('.card__soecies');
const cardBirdText = document.querySelector('.card__text');
const birdItem = document.querySelectorAll('.answer-list__item')
const birdTitle = document.querySelector(".question__title");
const birdImage = document.querySelector('.question-bird__img')
const birdCard = document.querySelector(".card");
const instruction = document.querySelector(".instruction");
const levelButton = document.querySelector('.level__button')
const categoryLink = document.querySelectorAll('.list__link')
const birdItemName = document.querySelectorAll(".bird-title")
const cicleItems = document.querySelectorAll(".cicle")
let audioPlayQuestion = document.querySelector('.player-icon')
const gameOver = document.querySelector(".game-over")
const gaveOverScore = document.querySelector('.game-over__subtitle')




showQuestion()

function getRandomNum() {
  return Math.floor((Math.random() * 6));
}


function showQuestion() {
  let currentQuestionItem = birdsDataBy[questionIndex];
  let randomAnswerOfQuestion = currentQuestionItem[getRandomNum()];
  currentBirdVoice.src = randomAnswerOfQuestion.audio;
  let maxScore = 5;
  for (let i = 0; i < birdItemName.length; i++) {
    birdItemName[i].textContent = currentQuestionItem[i].name;
  }
  birdItem.forEach((item) => {
    item.addEventListener('click', showBirdItemInformation)
    item.addEventListener('click', showRightAnswer)

  })

  function showBirdItemInformation() {
    birdCard.classList.remove("card-display");
    instruction.classList.add("instruction-display");
    let birdItemName = this.querySelector(".bird-title");
    for (let i = 0; i < currentQuestionItem.length; i++) {
      if (birdItemName.textContent === currentQuestionItem[i].name) {
        cardBirdImage.src = currentQuestionItem[i].image;
        cardBirdImage.style.width = "200";
        audioBird.src = currentQuestionItem[i].audio;
        cardBirdName.textContent = currentQuestionItem[i].name;
        cardBirdSoecies.textContent = currentQuestionItem[i].species;
        cardBirdText.textContent = currentQuestionItem[i].description
      }
    }
  }

  function showRightAnswer() {
    let birdItemName = this.querySelector(".bird-title")
    let cicle = this.querySelector(".cicle");
    if (birdItemName.textContent === randomAnswerOfQuestion.name) {
      cicle.style.backgroundColor = 'green';
      birdItemName.style.color = 'green';
      levelButton.style.color = 'green';
      levelButton.style.backgroundColor = '#00bc8c';
      levelButton.removeAttribute = 'disabled';
      score += maxScore;
      gameScore.textContent = score;
      currentItemSong.muted = false;
      currentItemSong.currentTime = 0;
      currentItemSong.play();
      birdImage.src = randomAnswerOfQuestion.image;
      birdTitle.textContent = randomAnswerOfQuestion.name;
      birdItem.forEach(item => {
        item.removeEventListener('click', showRightAnswer);
      });
      console.log("This is current answer");
      if (questionIndex < 5) {
        questionIndex++;
      }
    }
    else {
      cicle.style.backgroundColor = 'red';
      birdItemName.style.color = 'red';
      wrongItemSong.muted = false;
      wrongItemSong.currentTime = 0;
      wrongItemSong.play();
      this.removeEventListener('click', showRightAnswer);
      maxScore--;
    }
  }

}


function goToTheNextLevel() {
  levelButton.style.color = "red";
  levelButton.style.backgroundColor = '#303030';
  birdCard.classList.add("card-display");
  instruction.classList.remove("instruction-display");
  birdImage.src = '/src/images/bird.jpg';
  birdTitle.textContent = '*****';
  for (let i = 0; i < birdItem.length; i++) {
    cicleItems[i].style.backgroundColor = '#444'
    categoryLink[i].classList.remove('list__link--active');
    birdItemName[i].style.color = 'white';
  }
  categoryLink[questionIndex].classList.add('list__link--active')
  showQuestion();
  audioPlayQuestion.classList.remove("pause");
  isPlay = false;

  if (questionIndex === 5) {
    levelButton.textContent = 'Паспрабаваць яшчэ';
    showFinishModal()
  }
}
levelButton.addEventListener("click", goToTheNextLevel)


function showFinishModal() {
  gameOver.classList.remove('game-over--display');
  gaveOverScore.textContent = "Вы прайшлі віктаріну з вынікам " + score + "/30. Паспрабаваць яшчэ?";

}


/* Audio */

audioPlayQuestion.addEventListener('click', playAudioQuestion);

function playAudioQuestion() {
  audioBird.currentTime = 0;
  audioBird.src = currentBirdVoice.src;
  if (!isPlay) {
    audioBird.play();
    isPlay = true;
    audioPlayQuestion.classList.add("pause");
  } else {
    audioBird.pause();
    isPlay = false;
    audioPlayQuestion.classList.remove("pause");
  }
}

//click on timeline to skip around

const timeline = document.querySelector(".timeline");
const rewindTimline = (el) => {
  const timlineWidth = el.target.offsetWidth;
  const clickOffSetX = el.offsetX;
  const durationAudioTrek = audioBird.duration;
  audioBird.currentTime = (clickOffSetX / timlineWidth) * durationAudioTrek;
};
timeline.addEventListener("click", rewindTimline);

//check audio percentage and update time accordingly

const getTimeCodeFromNum = (currentTime) => {
  let currentSeconds = parseInt(currentTime);
  let currentMinutes = parseInt(currentSeconds / 60);
  currentSeconds -= currentMinutes * 60;
  const currentHours = parseInt(currentMinutes / 60);
  currentMinutes -= currentHours * 60;

  if (currentHours === 0)
    return `${currentMinutes}:${String(currentSeconds % 60).padStart(2, 0)}`;
  return `${String(currentHours).padStart(2, 0)}:${currentMinutes}:${String(
    currentSeconds % 60
  ).padStart(2, 0)}`;
};

setInterval(() => {
  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = (audioBird.currentTime / audioBird.duration) * 100 + "%";
  document.querySelector(".current-time").textContent = getTimeCodeFromNum(
    audioBird.currentTime
  );
  getTimeCodeFromNum(currentTime);
}, 500);


function placeAudioPredict() {
  currentBirdVoice.onloadedmetadata = () => {
    let totalTime = document.querySelector(".total-time")
    totalTime.innerText = getTimeCodeFromNum(currentBirdVoice.duration)
  };
}
placeAudioPredict()

//click volume slider to change volume

const volumeIcon = document.querySelector(".volume-icon");
volumeIcon.addEventListener("click", () => {
  audioBird.muted = !audioBird.muted;
  if (!audioBird.muted) {
    volumeIcon.classList.remove("mute");

  } else {
    volumeIcon.classList.add("mute");
  }
});

const volumeRange = document.querySelector(".volume-range");
volumeRange.addEventListener("input", () => {
  audioBird.volume = Math.trunc(volumeRange.value) / 100;
  if (volumeRange.value == 0) {
    volumeIcon.classList.add("mute");
  } else {
    volumeIcon.classList.remove("mute");
  }
});

volumeRange.oninput = () => {
  let volumeProgress = document.querySelector(".volume-progress");
  volumeProgress.value = volumeRange.value;
};
