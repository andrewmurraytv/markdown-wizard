
import { useState, useEffect, useRef } from "react";
import { richTextToMarkdown, markdownToRichText, removeCitationMarkers, isHTML, prepareHTMLForConversion } from "../utils/conversion";

export type ConversionDirection = "markdown-to-rich" | "rich-to-markdown";

export const useConversion = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [removeCitations, setRemoveCitations] = useState(false);
  const [plainFormatting, setPlainFormatting] = useState(false);
  const [direction, setDirection] = useState<ConversionDirection>("markdown-to-rich");
  const [htmlInput, setHtmlInput] = useState<string | null>(null);
  
  // Store the raw HTML from paste events
  const pastedHtmlRef = useRef<string | null>(null);
  
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
      if (pastedHtmlRef.current) {
        // We have pasted HTML content, use that directly
        let htmlToConvert = pastedHtmlRef.current;
        result = richTextToMarkdown(htmlToConvert);
        pastedHtmlRef.current = null; // Clear after using
      } else if (isHTML(processedInput)) {
        // Input appears to be HTML
        result = richTextToMarkdown(processedInput);
      } else {
        // Try to get content from the input textarea (might be html that was pasted)
        const inputArea = document.getElementById("input-area");
        if (inputArea instanceof HTMLTextAreaElement) {
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
      
      // Check if there's HTML content in the clipboard
      if (clipboardData.types.includes('text/html')) {
        // Store the HTML content for later use during conversion
        pastedHtmlRef.current = clipboardData.getData('text/html');
        console.log("HTML content captured from clipboard", pastedHtmlRef.current);
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
