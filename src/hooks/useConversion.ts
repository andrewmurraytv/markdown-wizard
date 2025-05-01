
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
    
    // Apply citation removal if checked
    if (removeCitations && direction === "rich-to-markdown") {
      processedInput = removeCitationMarkers(processedInput);
    }
    
    // Convert based on direction
    let result = "";
    if (direction === "markdown-to-rich") {
      result = markdownToRichText(processedInput);
      document.getElementById("output-area")!.innerHTML = result;
    } else {
      result = richTextToMarkdown(processedInput);
      document.getElementById("output-area")!.textContent = result;
    }
    
    setOutputText(result);
  };
  
  // Copy to clipboard
  const handleCopy = () => {
    const outputArea = document.getElementById("output-area")!;
    const contentToCopy = direction === "markdown-to-rich" 
      ? outputArea.innerHTML 
      : outputArea.textContent || "";
    
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
