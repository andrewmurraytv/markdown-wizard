
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
  // Use the Clipboard API if available
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback to the older approach
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
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
}

// Set theme based on toggle
export function setTheme(isDark) {
  if (isDark) {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
  }
}
