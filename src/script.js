
import { updateLabels, convert, swapContent, handleCopyToClipboard } from './utils/appOperations.js';
import { addButtonAnimation, setTheme } from './utils/ui.js';

document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const inputArea = document.getElementById('input-area');
  const outputArea = document.getElementById('output-area');
  const convertBtn = document.getElementById('convert-btn');
  const copyBtn = document.getElementById('copy-btn');
  const swapBtn = document.getElementById('swap-btn');
  const mdToRichRadio = document.getElementById('md-to-rich');
  const richToMdRadio = document.getElementById('rich-to-md');
  const removeCitations = document.getElementById('remove-citations');
  const inputLabel = document.getElementById('input-label');
  const outputLabel = document.getElementById('output-label');
  const themeSwitch = document.getElementById('theme-switch');

  // Initialize theme
  initializeTheme();
  
  // Add event listeners
  setupEventListeners();
  
  // Initial setup
  initializeApp();
  
  // Debug element references
  logElementReferences();
  
  function initializeTheme() {
    // Set initial theme based on user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme(true);
      themeSwitch.checked = true;
    }
  }
  
  function setupEventListeners() {
    // Theme toggle functionality
    themeSwitch.addEventListener('change', function() {
      setTheme(this.checked);
    });
    
    // Explicit conversion button handler
    convertBtn.addEventListener('click', function(event) {
      event.preventDefault();
      console.log('Convert button clicked');
      performConversion();
    });
    
    // Copy button handler
    copyBtn.addEventListener('click', function() {
      handleCopyToClipboard(mdToRichRadio, outputArea, copyBtn);
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
  
  function performConversion() {
    convert(mdToRichRadio, inputArea, outputArea, removeCitations.checked);
  }
  
  function initializeApp() {
    // Update labels based on initial selection
    updateLabels(mdToRichRadio, inputLabel, outputLabel, inputArea, outputArea);
    
    // Start with empty input area (removed sample text)
    inputArea.value = '';
  }
  
  function logElementReferences() {
    console.log('DOM Elements found:');
    console.log('Convert Button:', convertBtn);
    console.log('Input Area:', inputArea);
    console.log('Output Area:', outputArea);
  }
});
