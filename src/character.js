import {HEIGHT, WIDTH} from "./constants.js";
import {clamp} from "./vec2.js";

const character = {
  position: { x: WIDTH / 2, y: HEIGHT / 2 },
  velocity: { x: 0, y: 0},
  radius: 24,
  spriteKey: "rightDown"
}

export const VELOCITY_SCALE = 0.008;

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

  if(magnitude < 0.2) {
    return;
  }
  if(angle < sliceAngle || angle > (360 - sliceAngle) || angle > (180 - sliceAngle) && angle < (180 + sliceAngle)) {
    cV.x = magnitude * scale * Math.sign(xIn);
  }
  if(angle > (90 - sliceAngle) && angle < (90 + sliceAngle) || angle > (270 - sliceAngle) && angle < (270 + sliceAngle)) {
    cV.y = magnitude * scale * Math.sign(yIn);
  }
  if(angle > (45 - sliceAngle) && angle < (45 + sliceAngle) || angle > (45 + 90 - sliceAngle) && angle < (45 + 90 + sliceAngle) || angle > (45 + 180 - sliceAngle) && angle < (45 + 180 + sliceAngle) || angle > (45 + 270 - sliceAngle) && angle < (45 + 270 + sliceAngle)) {
    cV.x = magnitude * scale * Math.sign(xIn);
    cV.y = magnitude * scale * Math.sign(yIn);
    clamp(cV, scale);
  }
}

export function updateSpriteKey() {
  const { x: xV, y: yV } = character.velocity;
  let key = character.spriteKey;
  if(xV > 0 && yV > 0) {
    key = "rightDown";
  }
  if(xV > 0 && yV < 0) {
    key = "rightUp";
  }
  if(xV < 0 && yV > 0) {
    key = "leftDown";
  }
  if(xV < 0 && yV < 0) {
    key = "leftUp";
  }
  if(xV > 0 && yV === 0) {
    key = "right";
  }
  if(xV < 0 && yV === 0) {
    key = "left";
  }
  if(xV === 0 && yV > 0) {
    key = "down";
  }
  if(xV === 0 && yV < 0) {
    key = "up";
  }
  character.spriteKey = key;
}

export { character }
