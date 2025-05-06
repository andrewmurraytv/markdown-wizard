
// Initialize TurndownService for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  linkStyle: 'inlined'
});

// Configure turndownService to properly handle links
turndownService.addRule('links', {
  filter: 'a',
  replacement: function(content, node) {
    const href = node.getAttribute('href');
    const title = node.title ? ` "${node.title}"` : '';
    return href ? `[${content}](${href}${title})` : content;
  }
});

// Add special rule for headings
turndownService.addRule('headings', {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  replacement: function(content, node) {
    const level = Number(node.nodeName.charAt(1));
    return `\n${'#'.repeat(level)} ${content}\n`;
  }
});

// Initialize marked for Markdown to HTML conversion
marked.setOptions({
  gfm: true,
  breaks: true,
  sanitize: false
});

// Remove citations like [1], [2,3], etc. and citation lists at the end
export function removeCitationMarkers(text) {
  if (!text) return '';
  
  // Remove citation markers like [1], [2,3], [4-6], etc.
  let cleaned = text.replace(/\[\d+(?:[-,]\d+)*\]/g, '');
  
  // Remove citation lists at the end of the text (often starts with "References" or "Citations")
  const referencePatterns = [
    /\n+References\s*\n+(?:[\s\S]*)/i,
    /\n+Citations\s*\n+(?:[\s\S]*)/i,
    /\n+Sources\s*\n+(?:[\s\S]*)/i,
    /\n+Bibliography\s*\n+(?:[\s\S]*)/i,
    /\n+\[\d+\](?:[\s\S]*)/,  // Citation list in the format [1] Citation text
    /\n+\d+\.\s+(?:https?:\/\/|www\.).*(?:\n|$)/mi,  // Numbered URL list often used for sources
    /\n+Sources\s*:(?:[\s\S]*)/i,  // Sources: followed by anything
    /\n+References\s*:(?:[\s\S]*)/i,  // References: followed by anything
    /\n+Links\s*:(?:[\s\S]*)/i,  // Links: followed by anything
    /\n+(?:https?:\/\/|www\.).*(?:\n|$)/mi  // URLs at the end of the document
  ];
  
  for (const pattern of referencePatterns) {
    cleaned = cleaned.replace(pattern, '');
  }
  
  return cleaned.trim();
}

// Convert Markdown to Rich Text (HTML)
export function markdownToRichText(markdown) {
  if (!markdown) return '';
  return marked.parse(markdown);
}

// Cleans HTML for better copy-paste experience
export function cleanHtmlForCopy(html) {
  if (!html) return '';
  
  // Create a temporary div to work with the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  return tempDiv.innerText;
}

// Detect if input might be HTML
export function isHTML(text) {
  if (!text) return false;
  
  // More comprehensive HTML detection
  const htmlRegex = /<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>/i;
  const containsTags = /<[a-z][\s\S]*>/i.test(text);
  const hasCommonTags = /<(div|span|p|a|h[1-6]|ul|ol|li|table|img)[\s>]/i.test(text);
  
  return htmlRegex.test(text) || (containsTags && hasCommonTags);
}

// Prepare HTML content for conversion
export function prepareHTMLForConversion(html) {
  if (!html) return '';
  
  // Create a temporary div to normalize and clean up HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Process all links to ensure they're properly preserved
  const links = tempDiv.querySelectorAll('a');
  links.forEach(link => {
    // Make sure href attribute is present
    if (!link.getAttribute('href') && link.textContent) {
      // If there's no href but it looks like a URL, use the text as the href
      if (link.textContent.match(/^(https?:\/\/|www\.)/)) {
        link.setAttribute('href', link.textContent);
      }
    }
  });
  
  // Ensure headings are properly formatted
  const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach(heading => {
    if (!heading.textContent.trim()) {
      // Add placeholder text for empty headings
      heading.textContent = 'Heading';
    }
  });
  
  return tempDiv.innerHTML;
}

// Convert Rich Text (HTML) to Markdown
export function richTextToMarkdown(html) {
  if (!html) return '';
  
  // Wrap in try-catch to handle any potential conversion errors
  try {
    // Prepare HTML for better conversion
    const preparedHTML = prepareHTMLForConversion(html);
    
    // Log for debugging
    console.log('Converting HTML to Markdown:', preparedHTML);
    
    // Use TurndownService to convert HTML to Markdown
    const markdown = turndownService.turndown(preparedHTML);
    
    console.log('Converted to Markdown:', markdown);
    return markdown;
  } catch (error) {
    console.error('Error converting rich text to markdown:', error);
    return html; // Return original input if conversion fails
  }
}
