import {ANIMATION_FRAME_DURATION, character, DEATH_ANIMATION} from "./character.js";
import { bombState } from "./bombs.js";
import { collisionState } from "./collision-detection.js"

const KILLSCREEN_DELAY = DEATH_ANIMATION.length * ANIMATION_FRAME_DURATION;
export const gameState = {
  /** @type {'intro' | 'game' | 'killscreen'} */
  phase: 'intro',
  timer: 0,
}

const intro = document.getElementById('intro');
const killscreen = document.getElementById('killscreen');

function start() {
  gameState.phase = 'game';
  intro.classList.remove('active');
  document.removeEventListener('mousedown', start);
}


// TODO: This is lazy
function restart() {
  // force page to refresh
  window.location.reload();
}

const CLOCK_REFRESH_TIME = 1000;

let surpassedTime = 0;
let timeString = '00:00:00';
export function gameSystem(deltaTime) {
  gameState.timer += deltaTime;

  if (gameState.phase === 'game') {
    surpassedTime += deltaTime;
  }

  if (surpassedTime > CLOCK_REFRESH_TIME && gameState.phase ==='game') {
    const clock = document.getElementById('clock');
    clock.innerText = timeString;
    timeString = new Date(gameState.timer).toISOString().substr(11, 8);
    surpassedTime = 0;
  }

  if (gameState.phase === 'intro') {
    if (!intro.classList.contains('active')) {
      intro.classList.add('active');
      document.addEventListener('mousedown', start)
    }
  }

  if (gameState.phase === 'game' && collisionState.didCollide) {
    gameState.phase = 'killscreen';
    character.deathTime = 0;
    const clock = document.getElementById('game-over-clock');
    clock.innerText = timeString;
    const bombs = document.getElementById('game-over-bombs');
    bombs.innerText = bombState.bombsUsed;

  }

  if (gameState.phase === 'killscreen') {
    character.deathTime += deltaTime;
    if (character.deathTime >= KILLSCREEN_DELAY) {
      killscreen.classList.add('active');
      document.addEventListener('mousedown', restart)
    }
  }

}


