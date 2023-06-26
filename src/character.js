import { HEIGHT, WIDTH } from "./constants.js";
import { clamp } from "./vec2.js";

const character = {
  position: { x: WIDTH / 2, y: HEIGHT / 2 },
  velocity: { x: 0, y: 0 },
  radius: 24,
  spriteKey: "rightDown",
  deathTime: 0,
};

export const VELOCITY_SCALE = 0.008;
/** milliseconds */
export const ANIMATION_FRAME_DURATION = 150;

const sliceAngle = 360 / 16;
/**
 * @param {import("./event-handling.js").Polar} inputPosition
 * @param {number} deltaTime
 */
export function updateVelocity(inputPosition, deltaTime) {
  const { angle, magnitude, x: xIn, y: yIn } = inputPosition;
  const scale = deltaTime * VELOCITY_SCALE;
  const cV = character.velocity;

  cV.x = cV.y = 0;

  if(character.deathTime > 0) {
    return;
  }
  if (magnitude < 0.2) {
    return;
  }
  if (
    angle < sliceAngle ||
    angle > 360 - sliceAngle ||
    (angle > 180 - sliceAngle && angle < 180 + sliceAngle)
  ) {
    cV.x = magnitude * scale * Math.sign(xIn);
  }
  if (
    (angle > 90 - sliceAngle && angle < 90 + sliceAngle) ||
    (angle > 270 - sliceAngle && angle < 270 + sliceAngle)
  ) {
    cV.y = magnitude * scale * Math.sign(yIn);
  }
  if (
    (angle > 45 - sliceAngle && angle < 45 + sliceAngle) ||
    (angle > 45 + 90 - sliceAngle && angle < 45 + 90 + sliceAngle) ||
    (angle > 45 + 180 - sliceAngle && angle < 45 + 180 + sliceAngle) ||
    (angle > 45 + 270 - sliceAngle && angle < 45 + 270 + sliceAngle)
  ) {
    cV.x = magnitude * scale * Math.sign(xIn);
    cV.y = magnitude * scale * Math.sign(yIn);
    clamp(cV, scale);
  }
}

export const DEATH_ANIMATION = [
  "die1",
  "die2",
  "die3",
  "die4",
  "die5",
  "die6",
  "die7",
  "die8",
  "die9",
]

export function updateSpriteKey() {
  const { x: xV, y: yV } = character.velocity;
  let key = character.spriteKey;

  if (character.deathTime > 0) {
    const deathTime = character.deathTime;
    const frame = Math.floor(deathTime / ANIMATION_FRAME_DURATION);
    if (frame < DEATH_ANIMATION.length) {
      key = DEATH_ANIMATION[frame];
    } else {
      key = DEATH_ANIMATION[DEATH_ANIMATION.length - 1];
    }
  } else {
    if (xV > 0 && yV > 0) {
      key = "rightDown";
    }
    if (xV > 0 && yV < 0) {
      key = "rightUp";
    }
    if (xV < 0 && yV > 0) {
      key = "leftDown";
    }
    if (xV < 0 && yV < 0) {
      key = "leftUp";
    }
    if (xV > 0 && yV === 0) {
      key = "right";
    }
    if (xV < 0 && yV === 0) {
      key = "left";
    }
    if (xV === 0 && yV > 0) {
      key = "down";
    }
    if (xV === 0 && yV < 0) {
      key = "up";
    }
  }
  character.spriteKey = key;
}

export { character };
