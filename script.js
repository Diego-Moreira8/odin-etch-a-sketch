const pixelDensity = document.querySelector("#pixel-density");
const blackColor = document.querySelector("#black-color");
const manualColor = document.querySelector("#manual-color");
const randomColor = document.querySelector("#random-color");
const colorPicker = document.querySelector("#color-picker");
const resetSketch = document.querySelector("#reset-sketch");
const sketchArea = document.querySelector(".sketch-area");

let allPixels;
let currentColor = "black";

sketchAreaUpdate(); // Start the sketch area

pixelDensity.addEventListener("change", sketchAreaUpdate);
blackColor.addEventListener("change", paintTypeBlack);
manualColor.addEventListener("change", paintTypeManual);
randomColor.addEventListener("change", paintTypeRandom);
resetSketch.addEventListener("click", reset);

function sketchAreaUpdate() {
  clearSketchArea();
  generatePixels();
  definePixelSize();
}

function clearSketchArea() {
  sketchArea.innerHTML = "";
}

function generatePixels() {
  for (let i = 0; i < pixelDensity.value ** 2; i++) {
    const newPixel = document.createElement("div");
    newPixel.classList.add("blank-pixel");
    sketchArea.appendChild(newPixel);
  }
  allPixels = document.querySelectorAll(".blank-pixel");
  allPixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", paintPixel);
  });
}

function definePixelSize() {
  allPixels.forEach((pixel) => {
    pixel.style.width = `calc(100% / ${pixelDensity.value})`;
    pixel.style.height = `calc(100% / ${pixelDensity.value})`;
  });
}

function paintTypeBlack() {
  colorPicker.disabled = true;
  currentColor = "black";
}

function paintTypeManual() {
  colorPicker.disabled = false;
  currentColor = colorPicker.value;
  colorPicker.addEventListener("change", () => {
    currentColor = colorPicker.value;
  });
}

function paintTypeRandom() {
  colorPicker.disabled = true;
}

function paintPixel(e) {
  if (randomColor.checked) {
    e.target.style.backgroundColor = generateColor();
  } else {
    e.target.style.backgroundColor = currentColor;
  }
}

function generateColor() {
  let r = Math.floor(Math.random() * 205 + 51);
  let g = Math.floor(Math.random() * 205 + 51);
  let b = Math.floor(Math.random() * 205 + 51);
  return `rgb(${r}, ${g}, ${b})`;
}

function reset() {
  allPixels.forEach((pixel) => {
    pixel.style.backgroundColor = "white";
  });
}
