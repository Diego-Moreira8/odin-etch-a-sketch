const pixelDensity = document.querySelector("#pixel-density");
const sketchArea = document.querySelector(".sketch-area");

let allPixels;

sketchAreaUpdate(); // Start the sketch area

pixelDensity.addEventListener("change", sketchAreaUpdate);

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

function paintPixel(e) {
  e.target.style.backgroundColor = "black";
}
