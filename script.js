// Constants
const MODES = ["PRETO", "ALEATÓRIO", "CUSTOMIZADA"]; // Black, Random, Custom
const DEFAULT_BLACK_SHADE = 90;

// Globals
let isMouseDown = false;
let currentMode = 2; // An index for the mode on the MODES array
let blackShade = DEFAULT_BLACK_SHADE;
let customColor = "#000";
let lastElement; // For getTouch function

// DOM elements
const canvas = document.querySelector("#canvas");
const changeModeBtn = document.querySelector("#change-mode");
const colorPicker = document.querySelector("#color-picker");
const resetBtn = document.querySelector("#reset");

// Window events
window.onload = createCanvasPixels(50);
window.onmousedown = () => (isMouseDown = true);
window.onmouseup = () => {
  isMouseDown = false;
  blackShade = DEFAULT_BLACK_SHADE;
};
window.onload = changeMode(); // Start the change mode button

// Event listeners
canvas.addEventListener("touchmove", (e) => {
  const TOUCHED_ELEMENT = getTouchedElement(e);
  if (TOUCHED_ELEMENT) paintPixel(TOUCHED_ELEMENT);
});
changeModeBtn.addEventListener("click", changeMode);
resetBtn.addEventListener("click", resetCanvas);
colorPicker.addEventListener("change", (e) => (customColor = e.target.value));

// Functions
function getTouchedElement(e) {
  const X = e.touches[0].clientX;
  const Y = e.touches[0].clientY;
  const TOUCHED_ELEMENT = document.elementFromPoint(X, Y);

  if (lastElement === TOUCHED_ELEMENT) return;

  lastElement = TOUCHED_ELEMENT;
  return TOUCHED_ELEMENT;
}

function changeMode() {
  const textDiv = changeModeBtn.firstElementChild;

  currentMode = currentMode === 2 ? 0 : currentMode + 1;
  textDiv.textContent = MODES[currentMode];

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
  // Progressive darkening effect.
  // blackShade resets when window.onmouseup is fired
  blackShade = blackShade > 0 ? blackShade - 10 : 0;
  return `hsl(0, 0%, ${blackShade}%)`;
}

function randomPaint() {
  const randColor = () => Math.floor(Math.random() * 255);
  const r = randColor();
  const g = randColor();
  const b = randColor();
  return `rgb(${r}, ${g}, ${b})`;
}

function paintPixel(target) {
  if (target.parentElement.id !== "canvas") return;

  switch (currentMode) {
    case 0:
      target.style.backgroundColor = blackPaint();
      break;
    case 1:
      target.style.backgroundColor = randomPaint();
      break;
    case 2:
      target.style.backgroundColor = customColor;
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
    newPixel.style.backgroundColor = "#fff";
    newPixel.addEventListener("mouseenter", (e) => {
      if (!isMouseDown) return;
      paintPixel(e.target);
    });
    canvas.appendChild(newPixel);
  }
}
