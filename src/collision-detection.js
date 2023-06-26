import { character } from "./character.js";
import { bombPositions } from "./bombs.js";
import { GRID_HEIGHT, GRID_WIDTH, HEIGHT, WIDTH } from "./constants.js";

function pointCircle(px, py, cx, cy, r) {
  const distX = px - cx;
  const distY = py - cy;
  const distance = Math.sqrt((distX * distX) + (distY * distY));

  if (distance <= r) {
    return true;
  }
  return false;
}

const collisionState = {
  didCollide: false,
}

export const START_RADIUS = 20;
export const EXPLODE_RADIUS = 60;
const REFRESH_TIME = 50;
let surpassedTime = 0;
export function collisionDetection(deltaTime) {
  surpassedTime += deltaTime;
  if (surpassedTime < REFRESH_TIME) return;
  surpassedTime = 0;

  for (const [key, val] of bombPositions) {
    const { x, y, explodedCountdown, color } = val;
    const radius = explodedCountdown ? EXPLODE_RADIUS : START_RADIUS;
    const xCenter = (x + 0.5) * (WIDTH / GRID_WIDTH);
    const yCenter = (y + 0.5) * (HEIGHT / GRID_HEIGHT);

    const collision = pointCircle(character.position.x, character.position.y, xCenter, yCenter, radius);
    if (collision) {
      collisionState.didCollide = true;
      break;
    }
  }


}