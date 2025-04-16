
import { useState, useEffect } from "react";
import { markdownToRichText, richTextToMarkdown, removeCitationMarkers } from "../utils/conversion";

export const useConversion = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isMarkdownToRich, setIsMarkdownToRich] = useState(true);
  const [removeCitations, setRemoveCitations] = useState(false);
  const [plainFormatting, setPlainFormatting] = useState(false);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };
  
  // Handle convert button click
  const handleConvert = () => {
    let processedInput = inputText;
    
    // Apply citation removal if checked
    if (removeCitations) {
      processedInput = removeCitationMarkers(processedInput);
    }
    
    // Convert based on direction
    if (isMarkdownToRich) {
      const html = markdownToRichText(processedInput);
      setOutputText(html);
      document.getElementById("output-area")!.innerHTML = html;
    } else {
      const markdown = richTextToMarkdown(processedInput);
      setOutputText(markdown);
      document.getElementById("output-area")!.textContent = markdown;
    }
  };
  
  // Swap input and output
  const handleSwap = () => {
    if (isMarkdownToRich) {
      // From markdown to rich, so output is HTML
      const markdown = richTextToMarkdown(document.getElementById("output-area")!.innerHTML);
      setInputText(markdown);
      document.getElementById("output-area")!.innerHTML = "";
    } else {
      // From rich to markdown, so output is markdown
      const html = markdownToRichText(outputText);
      setInputText(outputText);
      document.getElementById("output-area")!.innerHTML = html;
    }
    setOutputText("");
  };
  
  // Copy to clipboard
  const handleCopy = () => {
    let contentToCopy;
    const outputArea = document.getElementById("output-area")!;
    
    if (isMarkdownToRich) {
      // If converting to rich text
      contentToCopy = plainFormatting ? outputArea.innerText : outputArea.innerHTML;
    } else {
      // If converting to markdown
      contentToCopy = outputArea.textContent;
    }
    
    navigator.clipboard.writeText(contentToCopy)
      .then(() => {
        const copyBtn = document.getElementById("copy-btn")!;
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  // Handle input click (clear)
  const handleInputClick = () => {
    // Only clear if it's the placeholder or first interaction
    if (inputText === "") {
      setInputText("");
    }
  };

  return {
    inputText,
    setInputText,
    outputText,
    setOutputText,
    isMarkdownToRich,
    setIsMarkdownToRich,
    removeCitations,
    setRemoveCitations,
    plainFormatting,
    setPlainFormatting,
    handleInputChange,
    handleConvert,
    handleSwap,
    handleCopy,
    handleInputClick
  };
};
