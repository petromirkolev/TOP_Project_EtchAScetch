'use strict';

const slider = document.querySelector('input');
const playingField = document.querySelector('.playing-field');
const gridElement = '<div class="grid-element"></div>';
const gridTemplate = 'auto ';
const increaseSliderButton = document.querySelector('#increase');
const decreaseSliderButton = document.querySelector('#decrease');
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
let currentMode;

////////////////
// Game logic //
////////////////
// Update the sketch grid based on slider position
const updateSketchGrid = function () {
   playingField.style.gridTemplateRows = gridTemplate.repeat(slider.value);
   playingField.style.gridTemplateColumns = gridTemplate.repeat(slider.value);
   playingField.innerHTML = gridElement.repeat(slider.value * slider.value);
};
// Handle drawing modes and erase button logic
const drawingMode = function () {
   if (currentMode !== 'btn-clear') {
      switch (currentMode) {
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

// Add grayscale mode
let multiplier = 80;
// Color changing from #808080 (light gray) to #000000 (black)
const grayScaleMode = function () {
   if (multiplier === 0) {
      multiplier = 80;
      return '#000000';
   }
   multiplier--;
   return `#${multiplier.toString().repeat(3)}`;
};

/////////////////////
// Event listeners //
/////////////////////
// Get slider value from mouse drag and update grid
slider.addEventListener('input', function () {
   updateSketchGrid();
});
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
///////////////////  TO DO  /////////////////////
// btnClear.addEventListener('click', function () {
//    btnClear.classList.remove('btn-clicked');

//    [...playingField.children].map(child => {
//       currentMode = '';
//       child.style.backgroundColor = '';
//    });
// });

///////////////////  TO DO  /////////////////////
// Handle menu button clicks and store current button class as a variable
controlPanel.addEventListener('click', function (e) {
   if (!e.target.classList.contains('btn')) return;
   //    if (e.target.classList.contains('btn-clear')) {
   //       removeBtnClass();
   //       [...playingField.children].map(child => {
   //          currentMode = '';
   //          child.style.backgroundColor = '';
   //       });
   //       return;
   //    }
   removeBtnClass();
   e.target.classList.add('btn-clicked');
   currentMode = e.target.classList[1];
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
// Clear grid
const clearGrid = function () {
   slider.value = 16;
   updateSketchGrid();
};
// Set drawing color to rainbow colors
const rainbowColor = function () {
   return randomColors[Math.trunc(Math.random() * randomColors.length)];
};

updateSketchGrid();
