const input = {
  // array of keys pressed
  keysPressed: [],
  position: { x: 0 , y: 0 }
};

const canvas = document.getElementById('foreground');
let firstMove = true;

canvas.addEventListener("click", async () => {
  await canvas.requestPointerLock();
  firstMove = true;
});

document.addEventListener("mousemove", (e) => {
  if (document.pointerLockElement === canvas) {
    if(!firstMove){
      const { movementX, movementY } = e;
      input.position.x = Math.min(input.position.x + Math.abs(movementX) / 10, 1) * Math.sign(movementX);
      input.position.y = Math.min(input.position.y + Math.abs(movementY) / 10, 1) * Math.sign(movementY);
    }
    firstMove = false;
  }
}, false);


// on esc, break out of pointer lock
document.addEventListener("keydown", (e) => {
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
