import { collisionState } from "./collision-detection.js"

const KILLSCREEN_DELAY = 250;
export const gameState = {
  isIntroScreen: true,
  isGameOver: false,
  timer: 0,
}

let elapsed = 0;

const intro = document.getElementById('intro');
const killscreen = document.getElementById('killscreen');

function start() {
  gameState.isIntroScreen = false;
  intro.classList.remove('active');
  document.removeEventListener('mousedown', start);
}


// TODO: This is lazy
function restart() {
  // force page to refresh
  window.location.reload();
}

export function gameSystem() {

  if (collisionState.didCollide) {
    gameState.isGameOver = true;
  }

  if (gameState.isIntroScreen) {
    intro.classList.add('active');
    document.addEventListener('mousedown', start)
  }

  if (gameState.isGameOver) {
    // TODO: This is hacky.
    setTimeout(() => {
      killscreen.classList.add('active');
      document.addEventListener('mousedown', restart)
    }, KILLSCREEN_DELAY);
  }

}


