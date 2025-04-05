

import { updateLabels, convert, swapContent, handleCopyToClipboard } from './appOperations.js';
import { addButtonAnimation, setTheme } from './ui.js';

export function setupEventListeners(elements) {
  const {
    themeSwitch,
    convertBtn,
    copyBtn,
    swapBtn,
    mdToRichRadio,
    richToMdRadio,
    inputArea,
    outputArea,
    inputLabel,
    outputLabel,
    removeCitations,
    plainFormatting
  } = elements;
  
  // Theme toggle functionality
  themeSwitch.addEventListener('change', function() {
    setTheme(this.checked);
  });
  
  // Explicit conversion button handler
  convertBtn.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Convert button clicked');
    convert(mdToRichRadio, inputArea, outputArea, removeCitations.checked);
  });
  
  // Copy button handler
  copyBtn.addEventListener('click', function() {
    handleCopyToClipboard(mdToRichRadio, outputArea, copyBtn, plainFormatting.checked);
  });
  
  // Swap button handler
  swapBtn.addEventListener('click', function() {
    swapContent(mdToRichRadio, inputArea, outputArea);
  });
  
  // Direction change handlers
  mdToRichRadio.addEventListener('change', function() {
    updateLabels(mdToRichRadio, inputLabel, outputLabel, inputArea, outputArea);
  });
  
  richToMdRadio.addEventListener('change', function() {
    updateLabels(mdToRichRadio, inputLabel, outputLabel, inputArea, outputArea);
  });
  
  // Add animations to all buttons
  addButtonAnimation(convertBtn);
  addButtonAnimation(copyBtn);
  addButtonAnimation(swapBtn);
}

