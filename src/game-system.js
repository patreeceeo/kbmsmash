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

const CLOCK_REFRESH_TIME = 1000;

let killScreenTimer = undefined;
let surpassedTime = 0;
export function gameSystem(deltaTime) {
  gameState.timer += deltaTime;

  if (gameState.phase === 'game') {
    surpassedTime += deltaTime;
  }

  if (surpassedTime > CLOCK_REFRESH_TIME && gameState.phase ==='game') {
    const clock = document.getElementById('clock');
    const timeString = new Date(gameState.timer).toISOString().substr(11, 8)
    clock.innerText = timeString;
    surpassedTime = 0;
  }


  if (collisionState.didCollide) {
    gameState.phase = 'killscreen';
  }

  if (gameState.phase === 'intro') {
    if (!intro.classList.contains('active')) {
      intro.classList.add('active');
      document.addEventListener('mousedown', start)
    }
  }

  if (killScreenTimer === undefined && gameState.phase === 'killscreen') {
    killScreenTimer = setTimeout(() => {
      killscreen.classList.add('active');
      document.addEventListener('mousedown', restart)
    }, KILLSCREEN_DELAY);
  }

}


