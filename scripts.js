const pixelDemand = document.querySelector('#pixel-demand');
const pixelateBtn = document.querySelector('#pixelate');
const containerSize = document.querySelector('#container-size');
const eraserModeToggle = document.querySelector('#eraser-mode');
const resetButton = document.querySelector('#reset');
let eraserMode = 'off';
let sketchContainer = document.querySelector('#sketch-container'); 
let sketchPixels = [];
let sketchRows = [];
let numberOfPixels = 16;
let pixelHeight;
let initialRun = false;
let mouseDown = false;

pixelateBtn.addEventListener('click', pixelateContainer)
eraserModeToggle.addEventListener('click', toggleEraserMode);
resetButton.addEventListener('click', reset);

createContainerListener();

createGrid(numberOfPixels);

function pixelateContainer() {
  removeGrid(numberOfPixels); 
  numberOfPixels = pixelDemand.value;
  numberOfPixels = parseInt(numberOfPixels);
  if(isNaN(numberOfPixels)){
    alert('Try entering an integer.');
  } else {
    containerSize.textContent = numberOfPixels + ' x ' + numberOfPixels;
    createGrid(numberOfPixels);
  }
}

function toggleEraserMode() {
  if(eraserMode == 'on'){
    eraserMode = 'off';
    eraserModeToggle.textContent = 'Off';
    eraserModeToggle.classList.toggle('toggled');
  } else {
    eraserMode = 'on';
    eraserModeToggle.textContent = 'On';
    eraserModeToggle.classList.toggle('toggled');
  }
}

function reset() {
  removeGrid(numberOfPixels);
  createGrid(numberOfPixels);
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
    sketchContainer.setAttribute('style', `height: ${(pixelHeight * numberOfPixels).toFixed(2) -4}px; width: ${(pixelHeight * numberOfPixels).toFixed(2) -4}px;`);
  }
  createHoverListener();
}

function createContainerListener() {
  sketchContainer.addEventListener('click', () => {
    if(mouseDown){
      mouseDown = false;
    } else {
      mouseDown = true;
    }
  });
}

function createHoverListener() {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.addEventListener('mouseover', (e) => {
      if(mouseDown){
        changeColor(e);
      } else {
        return;
      }
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
  if(eraserMode == 'on'){
    e.target.classList.remove('black', 'red', 'blue', 'orange', 'yellow', 'purple', 'green');
  } else {
    switch(document.querySelector('input[name="color"]:checked').value) {
      case 'black':
      e.target.classList.remove('red', 'blue', 'orange', 'yellow', 'purple', 'green');
      e.target.classList.add('black');
      break;
      case 'red':
      e.target.classList.remove('black', 'blue', 'orange', 'yellow', 'purple', 'green');
      e.target.classList.add('red');
      break;
      case 'blue':
      e.target.classList.remove('red', 'black', 'orange', 'yellow', 'purple', 'green');
      e.target.classList.add('blue');
      break;
      case 'orange':
      e.target.classList.remove('red', 'blue', 'black', 'yellow', 'purple', 'green');
      e.target.classList.add('orange');
      break;
      case 'yellow':
      e.target.classList.remove('red', 'blue', 'orange', 'black', 'purple', 'green');
      e.target.classList.add('yellow');
      break;
      case 'purple':
      e.target.classList.remove('red', 'blue', 'orange', 'yellow', 'black', 'green');
      e.target.classList.add('purple');
      break;
      case 'green':
      e.target.classList.remove('red', 'blue', 'orange', 'yellow', 'purple', 'black');
      e.target.classList.add('green');
      break;
    }
     
  }
}
