const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

/**
  * @param {string} selector
  * @returns {HTMLMediaElement}
  */
function createTrack(selector) {
  const audioElement = document.querySelector(selector);
  const track = audioContext.createMediaElementSource(audioElement);
  track.connect(audioContext.destination);
  return /** @type HTMLMediaElement */(audioElement);
}

/**
  * @type {Record<string, HTMLMediaElement>}
  */
const audioElements = {
  bombExplode: createTrack("#audio-bomb-explode"),
  death: createTrack("#audio-death"),
  walk: createTrack("#audio-walk"),
}

// pass it into the audio context

// Play or pause track depending on state
/**
  * @param {keyof typeof audioElements} sfx
  */
export function play(sfx) {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  try {
    audioElements[sfx].play();
  } catch (e) {
    console.log(e);
  }
}
