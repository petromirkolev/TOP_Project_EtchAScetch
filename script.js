'use strict';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const slider = document.querySelector('input');
const playingField = document.querySelector('.playing-field');
const gridElement = '<div class="grid-element"></div>';
const gridTemplate = 'auto ';
const increaseSliderButton = document.querySelector('#increase');
const decreaseSliderButton = document.querySelector('#decrease');
const controlPanel = document.querySelector('.controls');
const randomColors = [
   '#ff0000',
   '#ffa500',
   '#ffff00',
   '#008000',
   '#0000ff',
   '#4b0082',
   '#ee82ee',
];
let currentMode;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Game logic //

// Update the sketch grid based on slider position
const updateSketchGrid = function () {
   playingField.style.gridTemplateRows = gridTemplate.repeat(slider.value);
   playingField.style.gridTemplateColumns = gridTemplate.repeat(slider.value);
   playingField.innerHTML = gridElement.repeat(slider.value * slider.value);
};

// Set color to rainbow colors
const rainbowColor = function () {
   return randomColors[Math.trunc(Math.random() * randomColors.length)];
};

const drawingMode = function () {
   switch (currentMode) {
      case 'btn-black':
         return 'black';
      case 'btn-grayscale':
         return 'gray';
      case 'btn-rainbow':
         return rainbowColor();
      case 'btn-clear':
         return clearGrid();
      case 'btn-random':
         return randomSketch();
      case 'btn-erase':
         1;
         break;
      default:
         return 'gray';
   }
};

// Event listeners
// Increase slider value by button
increaseSliderButton.addEventListener('click', () => {
   slider.value++;
   updateSketchGrid();
});
// Decrease slider value by button
decreaseSliderButton.addEventListener('click', () => {
   slider.value--;
   updateSketchGrid();
});
// Get slider value from mouse drag
slider.addEventListener('input', function () {
   updateSketchGrid();
});

// Add color to grid element when mouse click and over
playingField.addEventListener('mouseover', function (e) {
   const gridBox = e.target.style;
   if (e.buttons !== 1 || !e.target.classList.contains('grid-element')) {
      return;
   } else {
      gridBox.backgroundColor = drawingMode();
   }
});
// Handle menu buttons click and store current button class as a variable
controlPanel.addEventListener('click', function (e) {
   if (!e.target.classList.contains('btn')) return;

   const buttons = [...controlPanel.children];
   buttons.map(e => {
      e.classList.remove('btn-clicked');
   });
   e.target.classList.add('btn-clicked');
   currentMode = e.target.classList[1];
});

updateSketchGrid();
