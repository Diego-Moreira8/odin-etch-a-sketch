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

function paintPixel(e) {
  if (!mouseDown) return;
  e.target.style.backgroundColor = `hsl(0, 0%, ${blackShade}0%)`;
  blackShade = blackShade > 0 ? blackShade - 1 : 0;
}

window.onload = createCanvasPixels(12, 9);
