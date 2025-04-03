
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
    /\n+References\s*\n+(?:\d+\..*\n+)*/i,
    /\n+Citations\s*\n+(?:\d+\..*\n+)*/i,
    /\n+\[\d+\](?:.*\n+)+/  // Citation list in the format [1] Citation text
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

// Convert Rich Text (HTML) to Markdown
export function richTextToMarkdown(html) {
  return turndownService.turndown(html);
}
