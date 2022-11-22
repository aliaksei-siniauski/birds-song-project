import { birdsDataBy } from './js/birds.js'



let questionIndex = 0; // current question
let point = 0;
let gameScore = document.querySelector(".point__point")


let currentItemSong = new Audio('/src/music/correct-answer.wav')
let wrongItemSong = new Audio('/src/music/wrong-answer.mp3')

let audioBird = new Audio();


let currentBirdVoice = new Audio();
let infoBirdVoice = new Audio()


let isPlay = false;


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
const gameOver = document.querySelector(".game-over")
const gaveOverScore = document.querySelector('.game-over__subtitle')
let audioPlayQuestion = document.querySelector('.question__player .question__player-icon')
let audioCardPlayer = document.querySelector('.card-player .player-icon')




function getRandomNum() {
    return Math.floor((Math.random() * 6));
}


function showQuestion() {
    let currentQuestionItem = birdsDataBy[questionIndex];
    let randomAnswerOfQuestion = currentQuestionItem[getRandomNum()];
    currentBirdVoice.src = randomAnswerOfQuestion.audio;
    let maxScore = 5;
    loadedCurrentAudioBirdSong();
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
                infoBirdVoice.src = currentQuestionItem[i].audio;
                cardBirdName.textContent = currentQuestionItem[i].name;
                cardBirdSoecies.textContent = currentQuestionItem[i].species;
                cardBirdText.textContent = currentQuestionItem[i].description
            }
        }
        loadedInfoAudioBirdSong();
    }

    function showRightAnswer() {
        let birdItemName = this.querySelector(".bird-title")
        let cicle = this.querySelector(".cicle");
        if (birdItemName.textContent === randomAnswerOfQuestion.name) {
            pauseCurrentSong();
            cicle.style.backgroundColor = 'green';
            birdItemName.style.color = 'green';
            levelButton.style.color = 'green';
            levelButton.style.backgroundColor = '#00bc8c';
            levelButton.removeAttribute = 'disabled';
            point += maxScore;
            gameScore.textContent = point;
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

showQuestion()


function goToTheNextLevel() {
    pauseCurrentSong()
    songCurrentTime.textContent = "0:00";
    audioProgress.style.width = "0" + '%';
    pauseBirdSongInfo()
    songCurrentTimeInfoBird.textContent = "0:00";
    audioProgressInfoBird.style.width = "0" + '%';
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
    audioPlayQuestion.classList.remove("pause");
    isPlay = false;

    if (questionIndex === 5) {
        levelButton.textContent = 'Паспрабаваць яшчэ';
        showFinishModal()
    }
    showQuestion();

}


levelButton.addEventListener("click", goToTheNextLevel)


function showFinishModal() {
    gameOver.classList.remove('game-over--display');
    if (point !== 30) {
        gaveOverScore.textContent = "Вы прайшлі віктаріну з вынікам " + point + "/30. Паспрабаваць яшчэ?";
    } else {
        gaveOverScore.textContent = "Вы прайшлі віктаріну з вынікам " + point + "/30. Вы вельмі ўважлівы чалавек!!! Паспрабаваць яшчэ?";
    }
}


/* Audio */

audioPlayQuestion.addEventListener('click', playAudioQuestion);
audioCardPlayer.addEventListener('click', playAudioInfo);



function loadedCurrentAudioBirdSong() {
    currentBirdVoice.onloadedmetadata
}


function loadedInfoAudioBirdSong() {
    infoBirdVoice.onloadedmetadata
}



function playAudioQuestion() {

    if (!isPlay) {
        playCurrentSong()
        isPlay = true;
        pauseBirdSongInfo()

    } else {
        pauseCurrentSong()
        isPlay = false;
    }
}


function playAudioInfo() {
    if (!isPlay) {
        playBirdSongInfo()
        isPlay = true;
        pauseCurrentSong()
    } else {
        pauseBirdSongInfo()
        isPlay = false;
    }
}


function playCurrentSong() {
    audioPlayQuestion.classList.add("pause");
    currentBirdVoice.play();
}

function playBirdSongInfo() {
    audioCardPlayer.classList.add("pause");
    infoBirdVoice.play();
}

function pauseCurrentSong() {
    currentBirdVoice.pause();
    audioPlayQuestion.classList.remove("pause");
}

function pauseBirdSongInfo() {
    infoBirdVoice.pause();
    audioCardPlayer.classList.remove("pause");
}


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


/* Progress bar */

const audioProgress = document.querySelector(".progress-bar");
let songDuration = document.querySelector('.total-time');
let songCurrentTime = document.querySelector('.current-time');
const timeline = document.querySelector(".timeline");


function updateProgressValue() {
    if (currentBirdVoice.duration) {
        songDuration.textContent = getTimeCodeFromNum(currentBirdVoice.duration);
        songCurrentTime.textContent = getTimeCodeFromNum(currentBirdVoice.currentTime);
        audioProgress.style.width = (currentBirdVoice.currentTime / currentBirdVoice.duration) * 100 + "%";
        timeline.addEventListener("click", rewindTimline);
    }
}

currentBirdVoice.addEventListener("timeupdate", updateProgressValue);
currentBirdVoice.addEventListener('ended', () => {
    audioPlayQuestion.classList.remove("pause");
    songCurrentTime.textContent = "0:00";
    currentBirdVoice.currentTime = audioBird.currentTime;
    isPlay = false;
})

const audioProgressInfoBird = document.querySelector(".card-player .progress-bar");
let songDurationInfoBird = document.querySelector('.card-player .total-time');
let songCurrentTimeInfoBird = document.querySelector('.card-player .current-time');
const timelineInfoBird = document.querySelector(".card-player .timeline");


function updateProgressValueForBirdInfo() {
    if (infoBirdVoice.duration) {
        songDurationInfoBird.textContent = getTimeCodeFromNum(infoBirdVoice.duration);
        songCurrentTimeInfoBird.textContent = getTimeCodeFromNum(infoBirdVoice.currentTime);
        audioProgressInfoBird.style.width = (infoBirdVoice.currentTime / infoBirdVoice.duration) * 100 + "%";
        timelineInfoBird.addEventListener("click", rewindTimlineForInfoBird);
    }
}


infoBirdVoice.addEventListener("timeupdate", updateProgressValueForBirdInfo);
infoBirdVoice.addEventListener('ended', () => {
    infoBirdVoice.classList.remove("pause");
    songCurrentTimeInfoBird.textContent = "0:00";
    infoBirdVoice.currentTime = audioBird.currentTime;
    isPlay = false;
})




/* Click on timeline to skip around
 */



function rewindTimline(el) {
    const timlineWidth = el.target.offsetWidth;
    const clickOffSetX = el.offsetX;
    const durationAudioTrek = currentBirdVoice.duration;
    currentBirdVoice.currentTime = (clickOffSetX / timlineWidth) * durationAudioTrek;
};


function rewindTimlineForInfoBird(el) {
    const timlineWidth = el.target.offsetWidth;
    const clickOffSetX = el.offsetX;
    const durationAudioTrek = infoBirdVoice.duration;
    infoBirdVoice.currentTime = (clickOffSetX / timlineWidth) * durationAudioTrek;
};




/* click volume slider to change volume */



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
