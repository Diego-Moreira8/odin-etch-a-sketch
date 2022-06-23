const pixelDensity = document.querySelector("#pixel-density");
const sketchArea = document.querySelector(".sketch-area");

sketchAreaUpdate(); // Start the sketch area

pixelDensity.addEventListener("change", sketchAreaUpdate);

function sketchAreaUpdate() {
  // removes all pixels from before
  while (sketchArea.lastElementChild) {
    sketchArea.removeChild(sketchArea.lastElementChild);
  }
  // create and draw pixels
  for (let i = 0; i < pixelDensity.value ** 2; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("blank-pixel");
    sketchArea.appendChild(pixel);
  }
  // style pixels...
  const blankPixel = document.querySelectorAll(".blank-pixel");
  blankPixel.forEach((item) => {
    // ...to fit in the sketch area
    item.style.width = `calc(100% / ${pixelDensity.value})`;
    item.style.height = `calc(100% / ${pixelDensity.value})`;
    // ...to draw on mouse hover
    sketchArea.addEventListener("mousedown", () => {
      item.addEventListener("mouseover", paintPixel);
    });
    sketchArea.addEventListener("mouseup", () => {
      item.removeEventListener("mouseover", paintPixel);
    });
    function paintPixel() {
      item.style.backgroundColor = "red";
    }
  });
}
