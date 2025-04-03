
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

  // Initialize TurndownService for HTML to Markdown conversion
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
  });

  // Initialize marked for Markdown to HTML conversion
  marked.setOptions({
    gfm: true,
    breaks: true,
    sanitize: false
  });
  
  // Set initial theme based on user preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
  }

  // Theme toggle functionality
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  });

  // Update labels based on selected direction
  function updateLabels() {
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

  // Remove citations like [1], [2,3], etc. and citation lists at the end
  function removeCitationMarkers(text) {
    // Remove citation markers like [1], [2,3], [4-6], etc.
    let cleaned = text.replace(/\[\d+(?:[-,]\d+)*\]/g, '');
    
    // Remove citation lists at the end of the text (often starts with "References" or "Citations")
    const referencePatterns = [
      /\n+References\s*\n+(?:\d+\..*\n+)*/i,
      /\n+Citations\s*\n+(?:\d+\..*\n+)*/i,
      /\n+\[\d+\](?:.*\n+)+/  // Citation list in the format [1] Citation text
    ];
    
    for (const pattern of referencePatterns) {
      cleaned = cleaned.replace(pattern, '');
    }
    
    return cleaned;
  }

  // Convert function
  function convert() {
    let inputText = inputArea.value;
    let outputText = '';
    
    // Apply citation removal if checked
    if (removeCitations.checked) {
      inputText = removeCitationMarkers(inputText);
    }
    
    if (mdToRichRadio.checked) {
      // Convert Markdown to HTML
      outputText = marked.parse(inputText);
      outputArea.innerHTML = outputText;
    } else {
      // Convert HTML to Markdown
      outputText = turndownService.turndown(inputText);
      outputArea.textContent = outputText;
    }
  }

  // Swap input and output content
  function swapContent() {
    let temp;
    if (mdToRichRadio.checked) {
      temp = inputArea.value;
      inputArea.value = turndownService.turndown(outputArea.innerHTML);
      outputArea.innerHTML = marked.parse(temp);
    } else {
      temp = inputArea.value;
      inputArea.value = outputArea.textContent;
      outputArea.textContent = temp;
    }
  }

  // Copy output to clipboard
  function copyToClipboard() {
    let textToCopy;
    
    if (mdToRichRadio.checked) {
      // If we're in markdown to rich text mode, copy the HTML
      textToCopy = outputArea.innerHTML;
      
      // Create a temporary textarea to copy HTML as text
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = textToCopy;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
    } else {
      // If we're in rich text to markdown mode, copy the text content
      textToCopy = outputArea.textContent;
      
      // Use the Clipboard API if available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback to the older approach
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
      }
    }
    
    // Show feedback
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.style.backgroundColor = 'var(--success-color)';
    copyBtn.style.color = 'white';
    
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.backgroundColor = '';
      copyBtn.style.color = '';
    }, 2000);
  }

  // Event listeners
  convertBtn.addEventListener('click', convert);
  copyBtn.addEventListener('click', copyToClipboard);
  swapBtn.addEventListener('click', swapContent);
  mdToRichRadio.addEventListener('change', updateLabels);
  richToMdRadio.addEventListener('change', updateLabels);
  
  // Handle input events for rich text to markdown conversion
  inputArea.addEventListener('input', function() {
    if (richToMdRadio.checked) {
      // Do a live conversion
      let inputText = inputArea.value;
      if (removeCitations.checked) {
        inputText = removeCitationMarkers(inputText);
      }
      outputArea.textContent = turndownService.turndown(inputText);
    }
  });
  
  // Initial label setup
  updateLabels();
  
  // Sample text for testing (can be removed in production)
  inputArea.value = `# Markdown Wizard

This is a **powerful tool** for converting between Markdown and Rich Text.

## Features

- Bidirectional conversion
- Citation removal
- Mobile responsive design

> Perfect for handling ChatGPT outputs!

Try it out by clicking the convert button.`;
  
  // Initial conversion
  convert();
});
