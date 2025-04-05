

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

// Remove citations like [1], [2,3], etc. and citation lists at the end
export function removeCitationMarkers(text) {
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
  
  return cleaned;
}

// Convert Markdown to Rich Text (HTML)
export function markdownToRichText(markdown) {
  return marked.parse(markdown);
}

// Cleans HTML for better copy-paste experience
export function cleanHtmlForCopy(html) {
  // Create a temporary div to work with the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  return tempDiv.innerText;
}

// Convert Rich Text (HTML) to Markdown
export function richTextToMarkdown(html) {
  return turndownService.turndown(html);
}

