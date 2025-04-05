

import { markdownToRichText, richTextToMarkdown, removeCitationMarkers, cleanHtmlForCopy } from './conversion.js';
import { copyToClipboard } from './ui.js';

// Update labels based on selected direction
export function updateLabels(mdToRichRadio, inputLabel, outputLabel, inputArea, outputArea) {
  if (mdToRichRadio.checked) {
    inputLabel.textContent = 'Markdown Input';
    outputLabel.textContent = 'Rich Text Output';
    inputArea.placeholder = 'Paste your markdown text here...';
    outputArea.contentEditable = 'true';
  } else {
    inputLabel.textContent = 'Rich Text Input';
    outputLabel.textContent = 'Markdown Output';
    inputArea.placeholder = 'Paste your rich text here...';
    outputArea.contentEditable = 'false';
  }
}

// Convert function
export function convert(mdToRichRadio, inputArea, outputArea, removeCitationsChecked) {
  let inputText = inputArea.value;
  let outputText = '';
  
  // Apply citation removal if checked
  if (removeCitationsChecked) {
    inputText = removeCitationMarkers(inputText);
  }
  
  if (mdToRichRadio.checked) {
    // Convert Markdown to HTML
    outputText = markdownToRichText(inputText);
    outputArea.innerHTML = outputText;
  } else {
    // If we're converting from rich text to markdown
    if (inputText.trim() === '') {
      // If input is empty, try to use the HTML content of the input area
      inputText = inputArea.innerHTML;
    }
    // Convert HTML to Markdown
    outputText = richTextToMarkdown(inputText);
    outputArea.textContent = outputText;
  }
  
  // Debug info
  console.log('Conversion performed:');
  console.log('Input:', inputText);
  console.log('Output:', outputText);
  
  return { inputText, outputText };
}

// Swap input and output content
export function swapContent(mdToRichRadio, inputArea, outputArea) {
  let temp;
  if (mdToRichRadio.checked) {
    temp = inputArea.value;
    inputArea.value = richTextToMarkdown(outputArea.innerHTML);
    outputArea.innerHTML = markdownToRichText(temp);
  } else {
    temp = inputArea.value;
    inputArea.value = outputArea.textContent;
    outputArea.textContent = temp;
  }
}

// Handle copy to clipboard functionality
export function handleCopyToClipboard(mdToRichRadio, outputArea, copyBtn, plainTextFormatting) {
  let textToCopy;
  
  if (mdToRichRadio.checked) {
    // If we're in markdown to rich text mode
    if (plainTextFormatting) {
      // Plain text version (no formatting)
      textToCopy = cleanHtmlForCopy(outputArea.innerHTML);
    } else {
      // Preserve HTML formatting
      textToCopy = outputArea.innerHTML;
    }
  } else {
    // If we're in rich text to markdown mode, copy the text content
    textToCopy = outputArea.textContent;
  }
  
  copyToClipboard(textToCopy, copyBtn, plainTextFormatting);
}

