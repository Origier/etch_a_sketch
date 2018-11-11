const pixelDemand = document.querySelector('#pixel-demand');
const pixelateBtn = document.querySelector('#pixelate');
let sketchContainer = document.querySelector('#sketch-container');
let sketchRows = [];  
let sketchPixels = [];
let numberOfPixels = 16;
let initialRun = false;

pixelateBtn.addEventListener('click', pixelateContainer);

initialize();

function initialize() {
  if (initialRun) {
    return;
  } else {
    initialRun = true;
    createGrid(numberOfPixels);
  }
}

function pixelateContainer() {
  removeGrid(numberOfPixels);
  numberOfPixels = pixelDemand.value;
  numberOfPixels = parseInt(numberOfPixels);
  createGrid(numberOfPixels);
  return;
}

function createGrid(pixels) {
  alert(numberOfPixels);
  for (let i = 0; i < pixels; i++) {
    createRow(i);
    for (let j = 0; j < pixels; j++) {
      createPixel(j, pixels);
      sketchRows[i].appendChild(sketchPixels[j]);
    }
    sketchContainer.appendChild(sketchRows[i]);
  }
}

function removeGrid(pixels) {
  for (let i = 0; i < pixels; i++) {
    sketchContainer.removeChild(sketchRows[i]);
  }
  sketchRows = [];
  sketchPixels = [];
}

function createRow(i) {
  sketchRows[i] = document.createElement('div');
  sketchRows[i].classList.add('row');
}

function createPixel(j, pixels) {
  let height = 900/pixels;
  sketchPixels[j] = document.createElement('div');
  sketchPixels[j].classList.add('pixel');
  sketchPixels[j].setAttribute('style', `height: ${height}px; width: ${height}px;`);
}

//append pixels to each row for the number the user input

//start a listener for all the pixels listening for a mouse hover

//when mousehover == true toggle the pixel to the class pixel darkened, if it is already this class then ignore it