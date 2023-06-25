import { GRID_WIDTH, GRID_HEIGHT } from './constants.js';
import { input } from './event-handling.js'
import { keyGrid } from './key-grid.js';

const bombPositions = new Map();

const maxBombs = 5;
const bombCountDown = 5000;
const explodesFor = 1000;
const bombRadius = 1;
const cooldown = 1000;

let surpassedTime = 0;
export function updateBombs(deltaTime) {
  surpassedTime += deltaTime;
  if (surpassedTime < 100) {
    return;
  }

  surpassedTime = 0;

  // activate bombs
  const keyGridArr = Array.from(keyGrid.values());
  if (bombPositions.size < maxBombs) {
    for (let i = 0; i < input.keysPressed.length; i++) {
      const k = input.keysPressed[i];
      for (let j = 0; j < keyGridArr.length; j++) {
        const v = keyGridArr[j];
        const key = `${v.x},${v.y}`;
        if (v.character === k && !bombPositions.has(key)) {
          bombPositions.set(key, {
            x: v.x,
            y: v.y,
            exploded: false,
            explodedCountDown: undefined,
            active: true,
            activatedCountDown: bombCountDown
          })
          break;
        }
      }
    }
  }
}