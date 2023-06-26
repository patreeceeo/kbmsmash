import { collisionState } from "./collision-detection.js"

const KILLSCREEN_DELAY = 250;
export const gameState = {
  phase: 'intro', // intro | game | killscreen
  timer: 0,
}

let elapsed = 0;

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

let time = 0
let timer = undefined;
export function gameSystem(deltaTime) {
  time += deltaTime;

  if (collisionState.didCollide) {
    gameState.phase = 'killscreen';
  }

  if (gameState.phase === 'intro') {
    if (!intro.classList.contains('active')) {
      intro.classList.add('active');
      document.addEventListener('mousedown', start)
    }
  }

  if (timer === undefined && gameState.phase === 'killscreen') {
    timer = setTimeout(() => {
      killscreen.classList.add('active');
      document.addEventListener('mousedown', restart)
    }, KILLSCREEN_DELAY);
  }

}


