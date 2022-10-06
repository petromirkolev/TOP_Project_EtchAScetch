'use strict';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const slider = document.querySelector('input');
const playingField = document.querySelector('.playing-field');
const gridElement = '<div class="grid-element"></div>';
const gridTemplate = 'auto ';
const increaseSliderButton = document.querySelector('#increase');
const decreaseSliderButton = document.querySelector('#decrease');
const colorButton = document.querySelector('.color-mode');
const rainbowButton = document.querySelector('.rainbox-mode');
const grayscaleButton = document.querySelector('.grayscale-mode');
const eraseButton = document.querySelector('.eraser-mode');
const clearGridButton = document.querySelector('.clear-mode');
const randomSketchButton = document.querySelector('.random-sketch-mode');
const controlPanel = document.querySelector('.controls');
let currentMode;
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Game logic
// Update the sketch grid based on slider position
const updateSketchGrid = function () {
   playingField.style.gridTemplateRows = gridTemplate.repeat(slider.value);
   playingField.style.gridTemplateColumns = gridTemplate.repeat(slider.value);
   playingField.innerHTML = gridElement.repeat(slider.value * slider.value);
};
// Check for grid element click & hover and do something

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
// e.buttons = 1 if mouse clicked when hover
playingField.addEventListener('mouseover', function (e) {
   if (e.buttons !== 1 || !e.target.classList.contains('grid-element')) {
      return;
   } else {
      e.target.style.backgroundColor = 'red';
   }
});

controlPanel.addEventListener('click', function (e) {
   if (!e.target.classList.contains('btn')) return;

   const buttons = [...controlPanel.children];
   buttons.map(e => {
      e.classList.remove('btn-clicked');
   });
   e.target.classList.add('btn-clicked');
   currentMode = e.target;
   console.log(currentMode);
});

updateSketchGrid();
