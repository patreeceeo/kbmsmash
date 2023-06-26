import {ANIMATION_FRAME_DURATION, character, DEATH_ANIMATION} from "./character.js";
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

export function gameSystem(deltaTime) {
  if (gameState.phase === 'game' && collisionState.didCollide) {
    gameState.phase = 'killscreen';
    character.deathTime = 0;
  }

  if (gameState.phase === 'intro') {
    if (!intro.classList.contains('active')) {
      intro.classList.add('active');
      document.addEventListener('mousedown', start)
    }
  }

  if (gameState.phase === 'killscreen') {
    character.deathTime += deltaTime;
    if (character.deathTime >= KILLSCREEN_DELAY) {
      killscreen.classList.add('active');
      document.addEventListener('mousedown', restart)
    }
  }

}


