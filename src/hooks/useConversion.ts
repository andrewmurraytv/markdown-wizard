
import { useState, useEffect } from "react";
import { richTextToMarkdown, removeCitationMarkers } from "../utils/conversion";

export const useConversion = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
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
    
    // Convert rich text to markdown
    const markdown = richTextToMarkdown(processedInput);
    setOutputText(markdown);
    document.getElementById("output-area")!.textContent = markdown;
  };
  
  // Copy to clipboard
  const handleCopy = () => {
    const outputArea = document.getElementById("output-area")!;
    const contentToCopy = outputArea.textContent || "";
    
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
    handleInputChange,
    handleConvert,
    handleCopy,
    handleInputClick
  };
};
