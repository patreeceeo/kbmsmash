// array of keys pressed
const input = {
  keysPressed: [],
  movement: { x: 0, y: 0 }
};

const canvas = document.getElementById('foreground');

canvas.addEventListener("click", async () => {
  await canvas.requestPointerLock();
});

document.addEventListener("mousemove", (e) => {
  input.movement.x += e.movementX;
  input.movement.y += e.movementY;
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