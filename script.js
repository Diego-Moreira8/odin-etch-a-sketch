const sketchArea = document.querySelector(".sketch-area");

let pixelsToDisplay = 16;

for (let i = 0; i < pixelsToDisplay ** 2; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("blank-pixel");
  sketchArea.appendChild(pixel);
}
