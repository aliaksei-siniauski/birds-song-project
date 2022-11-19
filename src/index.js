import { birdsDataBy } from './js/birds.js'


let questionIndex = 0; // current question
let score = 0;
let currentBirdVoice = new Audio();
let currentItemSong = new Audio()
let wrongItemSong = new Audio

/* BirdCard settings */

const cardBirdName = document.querySelector('.card__name');
const cardBirdImage = document.querySelector('.card__img');
const cardBirdSoecies = document.querySelector('.card__soecies');
const cardBirdText = document.querySelector('.card__text');
const birdItem = document.querySelectorAll('.answer-list__item')


showQuestion()

function getRandomNum() {
  return Math.floor((Math.random() * 6));
}


function showQuestion() {
  let currentQuestionItem = birdsDataBy[questionIndex];
  let randomAnswerOfQuestion = currentQuestionItem[getRandomNum()];
  currentBirdVoice.src = randomAnswerOfQuestion.audio;

  birdItem.forEach((item) => {
    item.addEventListener('click', showBirdItemInformation)
  })

  function showBirdItemInformation() {
    const birdCard = document.querySelector(".card")
    const instruction = document.querySelector(".instruction")
    birdCard.classList.remove("card-display")
    instruction.classList.add("instruction-display")
    let birdItemName = this.querySelector(".bird-title")
    for (let i = 0; i < currentQuestionItem.length; i++) {
      if (birdItemName.textContent === currentQuestionItem[i].name) {
        cardBirdImage.src = currentQuestionItem[i].image;
        cardBirdName.textContent = currentQuestionItem[i].name;
        cardBirdSoecies.textContent = currentQuestionItem[i].species;
        cardBirdText.textContent = currentQuestionItem[i].description
      }
    }
  }

}



function showRightAnswer() {

}


/* Audio */

let audioPlayQuestion = document.querySelector('.question__player-icon')
audioPlayQuestion.addEventListener('click', playAudioQuestion);


let currentTime = 0;
let isPlay = false;
let audioBird = new Audio();


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
