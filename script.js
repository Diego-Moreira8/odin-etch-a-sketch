const sketchArea = document.querySelector(".sketch-area");

let pixelsToDisplay = prompt("Entre com o tamanho do quadro");

for (let i = 0; i < pixelsToDisplay ** 2; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("blank-pixel");
  sketchArea.appendChild(pixel);
}

const blankPixel = document.querySelectorAll(".blank-pixel");
blankPixel.forEach((item) => {
  item.style.width = `calc(100% / ${pixelsToDisplay})`;
  item.style.height = `calc(100% / ${pixelsToDisplay})`;
});
