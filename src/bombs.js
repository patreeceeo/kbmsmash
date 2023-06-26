import { GRID_WIDTH, GRID_HEIGHT } from './constants.js';
import { input } from './event-handling.js'
import { keyGrid } from './key-grid.js';

export const bombPositions = new Map();

const maxBombs = 6;
const bombCountdown = 4000;
const explodesFor = 250;
const bombRadius = 1;
const cooldown = 1000;

let surpassedTime = 0;
export function updateBombs(deltaTime) {

  surpassedTime += deltaTime;

  if (surpassedTime < 100) {
    return;
  }

  // Bomb state
  for (let [key, value] of bombPositions) {

    value.countdown -= surpassedTime;

    if (value.countdown <= 0 && value.explodedCountdown === undefined) {
      value.explodedCountdown = explodesFor;
    }

    if (value.explodedCountdown !== undefined) {
      value.explodedCountdown -= surpassedTime;
    }

    if (value.explodedCountdown <= 0) {
      // remove bomb from Map
      bombPositions.delete(key);
    }
  }

  // Create bombs
  const keyGridArr = Array.from(keyGrid.values());
  if (bombPositions.size < maxBombs) {
    for (let i = 0; i < input.keysPressed.length; i++) {
      const k = input.keysPressed.at(-i);
      let newBomb = false;
      for (let [key, value] of keyGrid) {
        if (value.character === k && !bombPositions.has(key)) {
          bombPositions.set(key, {
            x: value.x,
            y: value.y,
            explodedCountdown: undefined,
            countdown: bombCountdown
          })
          newBomb = true;
          break;
        }
      }
      if (newBomb) break;
    }
  }

  surpassedTime = 0;
}