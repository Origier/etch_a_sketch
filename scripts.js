const pixelDemand = document.querySelector('#pixel-demand');
const pixelateBtn = document.querySelector('#pixelate');
let sketchContainer = document.querySelector('#sketch-container'); 
let sketchPixels = [];
let sketchRows = [];
let numberOfPixels = 16;
let pixelHeight;
let initialRun = false;

pixelateBtn.addEventListener('click', pixelateContainer)

createGrid(numberOfPixels);

function pixelateContainer() {
  removeGrid(numberOfPixels);
  numberOfPixels = pixelDemand.value;
  numberOfPixels = parseInt(numberOfPixels);
  if(isNaN(numberOfPixels)){
    alert('Try entering an integer.');
  } else {
    createGrid(numberOfPixels);
  }
}

function createGrid(pixels) {
  for (let i = 0; i < pixels; i++) {
    createRow(i);
    for (let j = 0; j < pixels; j++) {
      createPixel(j, pixels);
      sketchRows[i].appendChild(sketchPixels[j]);
    }
    sketchContainer.appendChild(sketchRows[i]);
  }
  if (pixelHeight % 1 == 0){
    sketchContainer.setAttribute('style', `height: 900px; width: 900px;`);
  } else {
    sketchContainer.setAttribute('style', `height: ${(pixelHeight * numberOfPixels).toFixed(2) -3}px; width: ${(pixelHeight * numberOfPixels).toFixed(2) -3}px;`);
  }
  createHoverListener();
}

function createListener() {
  sketchContainer.addEventListener('mousedown', createHoverListener);
}

function createHoverListener() {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.addEventListener('mouseover', (e) => {
      changeColor(e);
    });
  });
}


function removeHoverListener() {
  pixels.forEach((pixel) => {
    pixel.removeEventListener('mouseover', (e) => {
      changeColor(e);
    });
  });
}

function removeGrid(pixels) {
  for (let i = 0; i < pixels; i++) {
    sketchContainer.removeChild(sketchRows[i]);
  }
  sketchPixels = [];
  sketchRows = [];
}

function createRow(i) {
  sketchRows[i] = document.createElement('div');
  sketchRows[i].classList.add('row');
}

function createPixel(j, pixels) {
  pixelHeight = (900/pixels).toFixed(2);
  sketchPixels[j] = document.createElement('div');
  sketchPixels[j].classList.add('pixel');
  sketchPixels[j].setAttribute('style', `height: ${pixelHeight}px; width: ${pixelHeight}px;`);
}

function changeColor(e) {
  e.target.classList.add('black');
}
