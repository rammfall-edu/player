import { calcTime } from "./js/utils.js";

const playButton = document.querySelector('.player__btn');
const muteButton = document.querySelector('.sound__btn');
const audio = document.querySelector('audio');
const timelineAll = document.querySelector('.timeline__all');
const timelineCurrent = document.querySelector('.timeline__current');
const soundInput = document.querySelector('.sound__input');
const rangeTimeline = document.querySelector('.range-timeline')
const player = document.querySelector('.player');
/**
 * @type {'paused' | 'played'}
 */
let playState = 'paused';
/**
 * @type {'full' | 'muted'}
 */
let muteState = 'full';
let soundInputLastValue = soundInput.value;
let ref = null;


audio.addEventListener('loadedmetadata', () => {
  timelineAll.innerText = calcTime(audio.duration);
});

audio.addEventListener('progress', () => {
  // console.log(audio.buffered.length);
  // console.log(audio.currentTime);
});

const whilePlaying = () => {
  const { currentTime, duration } = audio;
  const percentOfTrack = (currentTime * 100) / duration;
  timelineCurrent.innerText = calcTime(currentTime);
  rangeTimeline.value = percentOfTrack;
  player.style.setProperty('--seek-before-width', `${percentOfTrack}%`);
  timelineAll.innerText = calcTime(duration);

  ref = requestAnimationFrame(whilePlaying);
};

playButton.addEventListener('click', async () => {
  if (playState === 'paused') {
    await audio.play();
    requestAnimationFrame(whilePlaying);
    playButton.classList.add('player__btn--paused');

    playState = 'played';
  } else if (playState === 'played') {
    await audio.pause();
    cancelAnimationFrame(ref);
    playButton.classList.remove('player__btn--paused');

    playState = 'paused';
  }

});

soundInput.value = 100;

soundInput.addEventListener('input', (event) => {
  const { value } = event.target;

  soundInputLastValue = value;
  audio.volume = value / 100;
})


muteButton.addEventListener('click', () => {
  if (muteState === 'full') {
    audio.volume = 0;
    soundInput.value = 0;
    muteState = 'muted';
    muteButton.classList.add('sound__btn--mute');
  } else if (muteState === 'muted') {
    audio.volume = soundInputLastValue / 100;
    soundInput.value = soundInputLastValue;
    muteState = 'full';
    muteButton.classList.remove('sound__btn--mute');
  }
})

