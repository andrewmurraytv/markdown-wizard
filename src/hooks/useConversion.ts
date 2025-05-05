
import { useState, useEffect } from "react";
import { richTextToMarkdown, markdownToRichText, removeCitationMarkers } from "../utils/conversion";

export type ConversionDirection = "markdown-to-rich" | "rich-to-markdown";

export const useConversion = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [removeCitations, setRemoveCitations] = useState(false);
  const [plainFormatting, setPlainFormatting] = useState(false);
  const [direction, setDirection] = useState<ConversionDirection>("markdown-to-rich");
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };
  
  // Handle convert button click
  const handleConvert = () => {
    let processedInput = inputText;
    
    // Apply citation removal if checked (for both conversion directions)
    if (removeCitations) {
      processedInput = removeCitationMarkers(processedInput);
    }
    
    // Convert based on direction
    let result = "";
    if (direction === "markdown-to-rich") {
      result = markdownToRichText(processedInput);
      const outputArea = document.getElementById("output-area");
      if (outputArea) outputArea.innerHTML = result;
    } else {
      // For rich to markdown, check if the input might contain HTML
      if (processedInput.includes('<') && processedInput.includes('>')) {
        // Input appears to be HTML
        result = richTextToMarkdown(processedInput);
      } else {
        // Plain text input, treat as HTML by wrapping in a div
        result = richTextToMarkdown(`<div>${processedInput}</div>`);
      }
      const outputArea = document.getElementById("output-area");
      if (outputArea) outputArea.textContent = result;
    }
    
    setOutputText(result);
  };
  
  // Copy to clipboard
  const handleCopy = () => {
    const outputArea = document.getElementById("output-area");
    if (!outputArea) return;
    
    let contentToCopy = "";
    
    if (direction === "markdown-to-rich") {
      contentToCopy = plainFormatting ? (outputArea.textContent || "") : outputArea.innerHTML;
    } else {
      contentToCopy = outputArea.textContent || "";
    }
    
    navigator.clipboard.writeText(contentToCopy)
      .then(() => {
        const copyBtn = document.getElementById("copy-btn");
        if (copyBtn) {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = "Copied!";
          setTimeout(() => {
            copyBtn.textContent = originalText;
          }, 2000);
        }
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
    removeCitations,
    setRemoveCitations,
    plainFormatting,
    setPlainFormatting,
    direction,
    setDirection,
    handleInputChange,
    handleConvert,
    handleCopy,
    handleInputClick
  };
};
