import { GRID_WIDTH, GRID_HEIGHT } from './constants.js';
import { input } from './event-handling.js'
import { keyGrid } from './key-grid.js';

const colors = [
  '#8dd836',
  '#008751',
  '#edd446',
  '#e48e2a',
  '#cc3636',
  '#761f28',
  '#e97fc2',
  '#b3b3b3'
];

// TODO: should move this into bombState
export const bombPositions = new Map();

export const bombState = {
  bombsUsed: 0
};


const maxBombs = 9;
const bombCountdown = 1600;
const explodesFor = 600;
const bombRadius = 1;

let surpassedTime = 0;
export function updateBombs(deltaTime) {

  surpassedTime += deltaTime;

  if (surpassedTime < 100) {
    return;
  }

  // Bomb state
  for (let [key, value] of bombPositions) {

    // bomb sprikeKey is 1-6 bomb art
    value.countdown -= surpassedTime;

    if (value.countdown <= 0 && value.explodedCountdown === undefined) {
      value.explodedCountdown = explodesFor;
      value.spriteSet = 'explode';
      value.spriteKey = '8';
    }

    if (value.explodedCountdown !== undefined) {
      value.explodedCountdown -= surpassedTime;
      value.spriteKey = `${Math.max(0,Math.ceil((value.explodedCountdown / explodesFor) * 8))}`;
    } else {
      value.spriteKey = `${Math.max(0,Math.ceil((value.countdown / bombCountdown) * 6))}`;
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
          bombState.bombsUsed++;
          bombPositions.set(key, {
            x: value.x,
            y: value.y,
            explodedCountdown: undefined,
            countdown: bombCountdown,
            spriteSet: 'bomb',
            spriteKey: '6',

            color: colors[Math.floor(Math.random() * colors.length)]
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