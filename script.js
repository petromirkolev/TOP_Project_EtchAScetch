'use strict';

const sliderToggle = document.querySelector('input');
const playingField = document.querySelector('.playing-field');
const sliderButtons = [...document.querySelectorAll('.field-control > button')];
const gridElement = '<div class="grid-element"></div>';
const gridTemplate = 'auto ';
const increaseSliderButton = document.querySelector('.increase');
const decreaseSliderButton = document.querySelector('.decrease');
const controlPanel = document.querySelector('.controls');
const btnClear = document.querySelector('.btn-clear');
const btnRandom = document.querySelector('.btn-random');
const randomColors = [
   '#ff0000',
   '#ffa500',
   '#ffff00',
   '#008000',
   '#0000ff',
   '#4b0082',
   '#ee82ee',
];
let gsColorMultiplier = 80;
let currentDrawingMode;

////////////////
// Game logic //
////////////////
// Update the sketch grid based on slider position
const updateSketchGrid = function () {
   playingField.style.gridTemplateRows = gridTemplate.repeat(
      sliderToggle.value
   );
   playingField.style.gridTemplateColumns = gridTemplate.repeat(
      sliderToggle.value
   );
   playingField.innerHTML = gridElement.repeat(
      sliderToggle.value * sliderToggle.value
   );
};
// Add drawing modes and erase button funtionality
const drawingMode = function () {
   if (currentDrawingMode !== 'btn-clear') {
      switch (currentDrawingMode) {
         case 'btn-black':
            return 'black';
         case 'btn-grayscale':
            return grayScaleMode();
         case 'btn-rainbow':
            return rainbowColor();
         case 'btn-erase':
            return '';
         default:
            return 'gray';
      }
   }
};
// Add grayscale mode (color changing from #808080 (light gray) to #000000 (black))
const grayScaleMode = function () {
   if (gsColorMultiplier === 0) {
      gsColorMultiplier = 80;
      return '#000000';
   }
   gsColorMultiplier--;
   return `#${gsColorMultiplier.toString().repeat(3)}`;
};
// Control slider position by buttons
sliderButtons.map(btn => {
   btn.addEventListener('click', function (e) {
      const currentBtnClass = e.target.classList;
      currentBtnClass.contains('increase')
         ? sliderToggle.value++
         : sliderToggle.value--;
      updateSketchGrid();
   });
});

/////////////////////
// Event listeners //
/////////////////////
// Get slider value from mouse drag and update grid
sliderToggle.addEventListener('input', function () {
   updateSketchGrid();
});
// Add color to grid element when mouse click and over
playingField.addEventListener('mouseover', function (e) {
   const gridBox = e.target.style;
   if (e.buttons !== 1 || !e.target.classList.contains('grid-element')) {
      return;
   }
   gridBox.backgroundColor = drawingMode();
});
// Generate random sketch
btnRandom.addEventListener('click', function () {
   [...playingField.children].map(child => {
      child.style.backgroundColor = rainbowColor();
   });
});
// Clear sketch pad
btnClear.addEventListener('click', function () {
   removeBtnClass();
   updateSketchGrid();
});
// Handle menu button clicks and store current button class as a variable
controlPanel.addEventListener('click', function (e) {
   const currentBtnClass = e.target.classList;
   if (
      !currentBtnClass.contains('btn') ||
      currentBtnClass.contains('btn-clear')
   )
      return;

   removeBtnClass();
   currentBtnClass.add('btn-clicked');
   currentDrawingMode = currentBtnClass[1];
});

/////////////
// Helpers //
/////////////
// Remove buttons class
const removeBtnClass = function () {
   [...controlPanel.children].map(child => {
      child.classList.remove('btn-clicked');
   });
};
// Set drawing color to rainbow colors
const rainbowColor = function () {
   return randomColors[Math.trunc(Math.random() * randomColors.length)];
};

updateSketchGrid();
