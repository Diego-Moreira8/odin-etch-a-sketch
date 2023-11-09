// Globals
let isMouseDown = false;

const DEFAULT_BLACK_SHADE = 9;
let blackShade = DEFAULT_BLACK_SHADE;

const MODES = ["Black", "Random", "Custom"];
let currentMode = 0; // An index for the mode on the MODES array

let customColor = "#000";

// Start UI
window.onload = createCanvasPixels(20);
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

const colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("change", setCurrCustomColor);

// Functions
function setCurrCustomColor(e) {
  customColor = e.target.value;
}

function changeMode() {
  currentMode = currentMode === 2 ? 0 : currentMode + 1;
  changeModeBtn.textContent = MODES[currentMode];

  const colorPickerWrap = document.querySelector(".color-picker-wrap");
  if (currentMode === 2) {
    colorPickerWrap.classList.add("active");
  } else {
    colorPickerWrap.classList.remove("active");
  }
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
    case 2:
      e.target.style.backgroundColor = customColor;
      break;
    default:
      console.error(`Unknown mode: ${currentMode}`);
  }
}

function createCanvasPixels(density) {
  const WIDTH = 4 + density;
  const HEIGHT = 3 + density;
  const canvas = document.querySelector("#canvas");

  for (let i = 0; i < WIDTH * HEIGHT; i++) {
    const newPixel = document.createElement("div");
    newPixel.classList.add("canvas-pixel");
    newPixel.style.width = `${100 / WIDTH}%`;
    newPixel.style.height = `${100 / HEIGHT}%`;
    newPixel.addEventListener("mouseenter", paintPixel);
    canvas.appendChild(newPixel);
  }
}
