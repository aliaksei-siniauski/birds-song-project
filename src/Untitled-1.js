/* Audio */

audioPlayQuestion.addEventListener('click', playAudioQuestion);
audioCardPlayer.addEventListener('click', playAudioInfo);

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

function playAudioInfo() {
    audioBird.currentTime = 0;
    audioBird.src = infoBirdVoice.src;
    if (!isPlay) {
        audioBird.play();
        isPlay = true;
        audioCardPlayer.classList.add("pause");
    } else {
        audioBird.pause();
        isPlay = false;
        audioCardPlayer.classList.remove("pause");
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

function updateProgressbar() {
    setInterval(() => {
        const progressBar = document.querySelector(".progress-bar");
        progressBar.style.width = (audioBird.currentTime / audioBird.duration) * 100 + "%";
        document.querySelector(".current-time").textContent = getTimeCodeFromNum(
            audioBird.currentTime
        );
        getTimeCodeFromNum(currentTime);
    }, 500);
}




/*  */

const getTimeCodeFromNumInfo = (currentTime) => {
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

function loadedInfoAudioBirdSong() {
    infoBirdVoice.onloadedmetadata = () => {
        let totalTime = document.querySelector(".card-player .total-time")
        totalTime.innerText = getTimeCodeFromNumInfo(infoBirdVoice.duration)
    };
}


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








function playAudioQuestion() {
    audioBird.currentTime = 0;
    audioBird.src = currentBirdVoice.src;
    updateProgressbar()
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

function playAudioInfo() {
    audioBird.currentTime = 0;
    audioBird.src = infoBirdVoice.src;
    updateProgressbarInfo()
    if (!isPlay) {
        audioBird.play();
        isPlay = true;
        audioCardPlayer.classList.add("pause");
    } else {
        audioBird.pause();
        isPlay = false;
        audioCardPlayer.classList.remove("pause");
    }
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

function loadedCurrentAudioBirdSong() {
    currentBirdVoice.onloadedmetadata = () => {
        let totalTime = document.querySelector(".total-time")
        totalTime.innerText = getTimeCodeFromNum(currentBirdVoice.duration)
    };
}

function updateProgressbar() {
    setInterval(() => {
        const progressBar = document.querySelector(".progress-bar");
        progressBar.style.width = (audioBird.currentTime / audioBird.duration) * 100 + "%";
        document.querySelector(".current-time").textContent = getTimeCodeFromNum(
            audioBird.currentTime
        );
        getTimeCodeFromNum(currentTime);
    }, 500);
}


///


function updateProgressbarInfo() {
    setInterval(() => {
        const progressBar = document.querySelector(".card-player .progress-bar");
        progressBar.style.width = (audioBird.currentTime / audioBird.duration) * 100 + "%";
        document.querySelector(".card-player .current-time").textContent = getTimeCodeFromNumInfo(
            audioBird.currentTime
        );
        getTimeCodeFromNumInfo(currentTime);
    }, 500);

}


const getTimeCodeFromNumInfo = (currentTime) => {
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

function loadedInfoAudioBirdSong() {
    infoBirdVoice.onloadedmetadata = () => {
        let totalTime = document.querySelector(".card-player .total-time")
        totalTime.innerText = getTimeCodeFromNumInfo(infoBirdVoice.duration)
    };
}



/* Progress bar */

const audioProgress = document.querySelector(".progress-bar");
let songDuration = document.querySelector('.total-time');
let songCurrentTime = document.querySelector('.current-time');

function updateProgressValue() {
    if (audio.duration) {
        audioCurrentTime = audio.currentTime;
        songDuration.innerHTML = `${playList[songNum].duration}`;
        songCurrentTime.innerHTML = formatTime(audio.currentTime);
        audioProgress.value = 100 * (audio.currentTime / audio.duration);
        if (audioProgress.value === audio.duration) {
            playNext();
        }
    }
}




Old


///



function loadedInfoAudioBirdSong() {
    infoBirdVoice.onloadedmetadata = () => {
    };
}




/* cURRENT sONG */

function playAudioInfo() {
    audioBird.src = infoBirdVoice.src;
    if (!isPlay) {
        audioBird.play();
        isPlay = true;
        audioCardPlayer.classList.add("pause");
    } else {
        audioBird.pause();
        isPlay = false;
        audioCardPlayer.classList.remove("pause");
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
