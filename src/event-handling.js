import {getForegroundCanvas} from "./graphics.js";

const canvas = getForegroundCanvas();
/** @typedef {{angle: number, magnitude: number, x: number, y: number}} Polar */
const input = {
  // array of keys pressed
  keysPressed: [],
  position: { angle: 0, magnitude: 0, x: 0, y: 0 },
  leftClick: false,
  get hasPointerLock() {
    return document.pointerLockElement === canvas;
  }
};

let firstMove = true;

canvas.addEventListener("click", async () => {
  if(!input.hasPointerLock) {
    await canvas.requestPointerLock();
    firstMove = true;
  }
});

document.addEventListener("mousemove", (e) => {
  if (input.hasPointerLock) {
    if(!firstMove && input.leftClick){
      const { movementX, movementY } = e;
      const pos = input.position;
      pos.x += Math.min(movementX, 10) / 10;
      pos.y += Math.min(movementY, 10) / 10;
    }
    firstMove = false;
  }
}, false);

document.addEventListener("mousedown", (e) => {
  if (input.hasPointerLock) {
    if (e.button === 0) {
      input.leftClick = true;
    }
  }
});

document.addEventListener("mouseup", (e) => {
  if (input.hasPointerLock) {
    if (e.button === 0) {
      input.leftClick = false;
    }
  }
});

// on esc, break out of pointer lock
document.addEventListener("keydown", (e) => {
  // ignore repeat events
  if (e.repeat) return;

  input.keysPressed.push(e.key);
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    document.exitPointerLock();
    return;
  }
  input.keysPressed = input.keysPressed.filter((key) => key !== e.key);
});

export { input }
