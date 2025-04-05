

import { updateLabels, convert, swapContent, handleCopyToClipboard } from './utils/appOperations.js';
import { addButtonAnimation, setTheme } from './utils/ui.js';
import { setupEventListeners } from './utils/eventHandlers.js';
import { initializeApp, logElementReferences } from './utils/initialization.js';

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
  const plainFormatting = document.getElementById('plain-formatting');
  const inputLabel = document.getElementById('input-label');
  const outputLabel = document.getElementById('output-label');
  const themeSwitch = document.getElementById('theme-switch');

  // Initialize theme
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme(true);
    themeSwitch.checked = true;
  }
  
  // Add event listeners
  setupEventListeners({
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
  });
  
  // Initial setup
  initializeApp(mdToRichRadio, inputLabel, outputLabel, inputArea, outputArea);
  
  // Debug element references
  logElementReferences(convertBtn, inputArea, outputArea);
});

