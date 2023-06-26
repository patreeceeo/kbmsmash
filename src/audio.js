const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

/**
  * @type {Record<string, GainNode>}
  */
const gainNodes = {
  bombExplode: audioContext.createGain(),
  death: audioContext.createGain(),
  walk: audioContext.createGain(),
}

/**
  * @param {string} selector
  * @param {keyof typeof gainNodes} key
  * @returns {HTMLMediaElement}
  */
function createTrack(selector, key) {
  const audioElement = document.querySelector(selector);
  const track = audioContext.createMediaElementSource(audioElement);
  track.connect(gainNodes[key]).connect(audioContext.destination);
  return /** @type HTMLMediaElement */(audioElement);
}

/**
  * @type {Record<string, HTMLMediaElement>}
  */
const audioElements = {
  bombExplode: createTrack("#audio-bomb-explode", "bombExplode"),
  death: createTrack("#audio-death", "death"),
  walk: createTrack("#audio-walk", "walk"),
}


// pass it into the audio context

// Play or pause track depending on state
/**
  * @param {keyof typeof audioElements} sfx
  */
export function play(sfx, volume = 1) {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  try {
    gainNodes[sfx].gain.value = volume;
    audioElements[sfx].play();
  } catch (e) {
    console.log(e);
  }
}
