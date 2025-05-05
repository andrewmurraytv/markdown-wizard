
import { useState, useEffect } from "react";
import { richTextToMarkdown, markdownToRichText, removeCitationMarkers, isHTML } from "../utils/conversion";

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
      // For rich to markdown conversion
      // First check if the input contains HTML
      if (isHTML(processedInput)) {
        // Input appears to be HTML
        result = richTextToMarkdown(processedInput);
      } else {
        // Try to get content from the input textarea (might be html that was pasted)
        const inputArea = document.getElementById("input-area");
        if (inputArea && inputArea.innerHTML !== inputArea.textContent) {
          // The input area has HTML content
          result = richTextToMarkdown(inputArea.innerHTML);
        } else {
          // Plain text input, treat as HTML by wrapping in a div
          result = richTextToMarkdown(`<div>${processedInput}</div>`);
        }
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

  // Handle paste events for rich text detection
  const handlePaste = (e: React.ClipboardEvent) => {
    if (direction === "rich-to-markdown") {
      const clipboardData = e.clipboardData;
      if (clipboardData.types.includes('text/html')) {
        // Get HTML content from clipboard
        const htmlContent = clipboardData.getData('text/html');
        // This is handled by the browser's default paste behavior
        console.log("HTML content detected in clipboard");
      }
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
    handleInputClick,
    handlePaste
  };
};
