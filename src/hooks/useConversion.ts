import { useState, useEffect, useRef } from "react";
import { richTextToMarkdown, markdownToRichText, removeCitationMarkers, isHTML, prepareHTMLForConversion } from "../utils/conversion";
import { validateConversionInput, checkRateLimit, logSecurityEvent } from "../utils/security";
import { toast } from "sonner";

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
    // For rich-to-markdown, we might get HTML content
    if (direction === "rich-to-markdown" && e.target.value.includes('<')) {
      // This is likely HTML content
      console.log("HTML input detected:", e.target.value);
      setHtmlInput(e.target.value);
    }
    
    setInputText(e.target.value);
  };
  
  // Handle convert button click
  const handleConvert = () => {
    // Rate limiting check
    if (!checkRateLimit()) {
      toast.error("Too many conversion requests. Please wait a moment before trying again.");
      return;
    }

    // Input validation
    const validation = validateConversionInput({
      text: inputText,
      direction,
      removeCitations,
      plainFormatting
    });

    if (!validation.success) {
      toast.error(`Invalid input: ${validation.error}`);
      return;
    }

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
        console.log("Converting pasted HTML:", htmlToConvert);
        result = richTextToMarkdown(htmlToConvert);
        pastedHtmlRef.current = null; // Clear after using
      } else if (htmlInput) {
        // We have HTML from the input
        console.log("Converting HTML input:", htmlInput);
        result = richTextToMarkdown(htmlInput);
        setHtmlInput(null); // Clear after using
      } else if (isHTML(processedInput)) {
        // Input appears to be HTML
        console.log("Converting detected HTML:", processedInput);
        result = richTextToMarkdown(processedInput);
      } else {
        // Try to get content from the input textarea (might be html that was pasted)
        const inputArea = document.getElementById("input-area");
        if (inputArea instanceof HTMLElement && inputArea.innerHTML) {
          // Get HTML content
          console.log("Converting from innerHTML:", inputArea.innerHTML);
          result = richTextToMarkdown(inputArea.innerHTML);
        } else {
          // Plain text input, treat as HTML by wrapping in a div
          console.log("Converting plain text as HTML:", processedInput);
          result = richTextToMarkdown(`<div>${processedInput}</div>`);
        }
      }
      
      const outputArea = document.getElementById("output-area");
      if (outputArea) outputArea.textContent = result;
    }
    
    setOutputText(result);
  };

  // Clear both input and output content
  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setHtmlInput(null);
    pastedHtmlRef.current = null;
    
    // Clear the actual DOM elements
    const inputArea = document.getElementById("input-area");
    const outputArea = document.getElementById("output-area");
    
    if (inputArea) {
      if (inputArea.tagName === 'TEXTAREA') {
        (inputArea as HTMLTextAreaElement).value = "";
      } else {
        inputArea.innerHTML = "";
      }
    }
    
    if (outputArea) {
      outputArea.innerHTML = "";
      outputArea.textContent = "";
    }
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
        const html = clipboardData.getData('text/html');
        
        // Validate HTML size
        if (html.length > 100000) {
          toast.error("Pasted content is too large (max 100KB)");
          logSecurityEvent('LARGE_PASTE_BLOCKED', { size: html.length });
          e.preventDefault();
          return;
        }
        
        pastedHtmlRef.current = html;
        console.log("HTML content captured from clipboard", html);
        
        // If this is the rich text input, we want to show the content as rich text
        const inputArea = document.getElementById("input-area");
        if (inputArea instanceof HTMLElement) {
          // Need a short timeout to let the default paste happen first
          setTimeout(() => {
            // If the input is a div, update its innerHTML to show the rich text
            if (inputArea.tagName === 'DIV') {
              // Create a temporary container to sanitize the HTML
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = html;
              
              // Extract only the content we want to display
              let contentToShow = tempDiv.innerHTML;
              
              // Update the input area with the HTML content
              inputArea.innerHTML = contentToShow;
              
              // Store the text content for the input state
              setInputText(inputArea.innerHTML);
              setHtmlInput(contentToShow);
              
              // Prevent the default paste to avoid double paste
              e.preventDefault();
              
              console.log("Updated input area with rich content:", contentToShow);
            }
          }, 0);
        }
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
    handleClear,
    handleCopy,
    handleInputClick,
    handlePaste
  };
};
