'use strict';
const slider = document.querySelector('input');
const playingField = document.querySelector('.playing-field');
const gridElement = '<div class="grid-element"></div>';
const gridTemplate = 'auto ';
const increaseSliderButton = document.querySelector('#increase');
const decreaseSliderButton = document.querySelector('#decrease');

const updateSketchGrid = function () {
   playingField.style.gridTemplateRows = gridTemplate.repeat(slider.value);
   playingField.style.gridTemplateColumns = gridTemplate.repeat(slider.value);
   playingField.innerHTML = gridElement.repeat(slider.value * slider.value);
};

slider.addEventListener('input', function () {
   updateSketchGrid();
});

// Event listeners
// Increase slider value by button
increaseSliderButton.addEventListener('click', () => {
   if (slider.value) updateSketchGrid();
   slider.value++;
   slider.value = slider.value;
});
// Decrease slider value by button
decreaseSliderButton.addEventListener('click', () => {
   updateSketchGrid();
   slider.value--;
});

updateSketchGrid();
