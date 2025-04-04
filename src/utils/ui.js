// Add microanimation to button
export function addButtonAnimation(button) {
  button.addEventListener('mousedown', function() {
    this.style.transform = 'scale(0.95)';
  });
  
  button.addEventListener('mouseup', function() {
    this.style.transform = 'scale(1)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
  
  // For touch devices
  button.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Prevent default touch behavior
    this.style.transform = 'scale(0.95)';
  });
  
  button.addEventListener('touchend', function() {
    this.style.transform = 'scale(1)';
  });
}

// Copy text to clipboard
export function copyToClipboard(text, button) {
  // Create a temporary text area to hold plain text for copying
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  // Make sure the text area uses default black text
  tempTextArea.style.color = '#000000';
  tempTextArea.style.opacity = '0';
  tempTextArea.style.position = 'fixed';
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  
  // Use the Clipboard API if available
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback to the older approach
      document.execCommand('copy');
    }
    
    // Show feedback
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.backgroundColor = 'var(--success-color)';
    button.style.color = 'white';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = '';
      button.style.color = '';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  } finally {
    // Clean up
    document.body.removeChild(tempTextArea);
  }
}

// Set theme based on toggle
export function setTheme(isDark) {
  if (isDark) {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
  }
}
