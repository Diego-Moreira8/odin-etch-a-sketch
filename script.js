// Globals
let isMouseDown = false;

const DEFAULT_BLACK_SHADE = 9;
let blackShade = DEFAULT_BLACK_SHADE;

const MODES = ["Black", "Random", "Custom"];
let currentMode = 0; // An index for the mode on the MODES array

// Start UI
window.onload = createCanvasPixels(4 * 4, 3 * 4);
window.onmousedown = () => (isMouseDown = true);
window.onmouseup = () => {
  isMouseDown = false;
  blackShade = DEFAULT_BLACK_SHADE;
};

// Controls
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", resetCanvas);

const changeModeBtn = document.querySelector("#change-mode");
changeModeBtn.textContent = MODES[currentMode];
changeModeBtn.addEventListener("click", changeMode);

// Functions
function changeMode() {
  currentMode = currentMode === 2 ? 0 : currentMode + 1;
  changeModeBtn.textContent = MODES[currentMode];
}

function resetCanvas() {
  document
    .querySelectorAll(".canvas-pixel")
    .forEach((pixel) => (pixel.style.backgroundColor = "#fff"));
}

function blackPaint() {
  blackShade = blackShade > 0 ? blackShade - 1 : 0;
  return `hsl(0, 0%, ${blackShade}0%)`;
}

function randomPaint() {
  const randColor = () => Math.floor(Math.random() * 255);
  const r = randColor();
  const g = randColor();
  const b = randColor();
  return `rgb(${r}, ${g}, ${b})`;
}

function paintPixel(e) {
  if (!isMouseDown) return;
  switch (currentMode) {
    case 0:
      e.target.style.backgroundColor = blackPaint();
      break;
    case 1:
      e.target.style.backgroundColor = randomPaint();
      break;
  }
}

function createCanvasPixels(width, height) {
  const canvas = document.querySelector("#canvas");

  for (let i = 0; i < width * height; i++) {
    const newPixel = document.createElement("div");
    newPixel.classList.add("canvas-pixel");
    newPixel.style.width = `${100 / width}%`;
    newPixel.style.height = `${100 / height}%`;
    newPixel.addEventListener("mouseenter", paintPixel);
    canvas.appendChild(newPixel);
  }
}
