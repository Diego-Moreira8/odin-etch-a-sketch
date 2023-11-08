const MODES = ["Black", "Random", "Custom"];
let currentMode = 0;
const changeModeBtn = document.querySelector("#change-mode");
changeModeBtn.textContent = MODES[currentMode];
changeModeBtn.addEventListener("click", () => {
  currentMode = currentMode === 2 ? 0 : currentMode + 1;
  changeModeBtn.textContent = MODES[currentMode];
});

const DEFAULT_BLACK_SHADE = 9;
let mouseDown = false;
let blackShade = DEFAULT_BLACK_SHADE;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => {
  mouseDown = false;
  blackShade = DEFAULT_BLACK_SHADE;
};

const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", resetCanvas);

function resetCanvas() {
  const pixels = document.querySelectorAll(".canvas-pixel");
  pixels.forEach((p) => (p.style.backgroundColor = "#fff"));
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

const blackPaint = () => {
  blackShade = blackShade > 0 ? blackShade - 1 : 0;
  return `hsl(0, 0%, ${blackShade}0%)`;
};

const randomPaint = () => {
  const randColor = () => Math.floor(Math.random() * 255);
  const r = randColor();
  const g = randColor();
  const b = randColor();
  return `rgb(${r}, ${g}, ${b})`;
};

function paintPixel(e) {
  if (!mouseDown) return;
  switch (currentMode) {
    case 0:
      e.target.style.backgroundColor = blackPaint();
      break;
    case 1:
      e.target.style.backgroundColor = randomPaint();
      break;
  }
}

window.onload = createCanvasPixels(4 * 4, 3 * 4);
