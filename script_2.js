const pixelDensity = document.querySelector("#pixel-density");
const sketchArea = document.querySelector(".sketch-area");

let allPixels;

sketchAreaUpdate(); // Start the sketch area

pixelDensity.addEventListener("change", sketchAreaUpdate);

sketchArea.addEventListener("mousedown", selectPixel);

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
}

function definePixelSize() {
  const blankPixel = document.querySelectorAll(".blank-pixel");
  blankPixel.forEach((item) => {
    // ...to fit in the sketch area
    item.style.width = `calc(100% / ${pixelDensity.value})`;
    item.style.height = `calc(100% / ${pixelDensity.value})`;
  });
}

function selectPixel() {
  allPixels.forEach((e) => {
    e.addEventListener("mouseenter", paintPixel);
    e.addEventListener("mouseup", () => {
      console.log("up");
      e.removeEventListener("mouseenter", paintPixel);
    });
  });
}

function paintPixel(e) {
  console.log("enter");
  let pixel = e.target;
  pixel.style.backgroundColor = "red";
}
