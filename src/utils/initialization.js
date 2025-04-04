
import { updateLabels } from './appOperations.js';

export function initializeApp(mdToRichRadio, inputLabel, outputLabel, inputArea, outputArea) {
  // Update labels based on initial selection
  updateLabels(mdToRichRadio, inputLabel, outputLabel, inputArea, outputArea);
  
  // Start with empty input area
  inputArea.value = '';
}

export function logElementReferences(convertBtn, inputArea, outputArea) {
  console.log('DOM Elements found:');
  console.log('Convert Button:', convertBtn);
  console.log('Input Area:', inputArea);
  console.log('Output Area:', outputArea);
}
