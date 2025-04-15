import React, { useState, useEffect } from "react";
import { Bookmark, ArrowRightLeft, ArrowRight } from "lucide-react";
import { markdownToRichText, richTextToMarkdown, removeCitationMarkers } from "../utils/conversion";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isMarkdownToRich, setIsMarkdownToRich] = useState(true);
  const [removeCitations, setRemoveCitations] = useState(false);
  const [plainFormatting, setPlainFormatting] = useState(false);
  
  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle direction change
  const handleDirectionChange = (e) => {
    setIsMarkdownToRich(e.target.id === "md-to-rich");
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
      document.getElementById("output-area").innerHTML = html;
    } else {
      const markdown = richTextToMarkdown(processedInput);
      setOutputText(markdown);
      document.getElementById("output-area").textContent = markdown;
    }
  };
  
  // Swap input and output
  const handleSwap = () => {
    if (isMarkdownToRich) {
      // From markdown to rich, so output is HTML
      const markdown = richTextToMarkdown(document.getElementById("output-area").innerHTML);
      setInputText(markdown);
      document.getElementById("output-area").innerHTML = "";
    } else {
      // From rich to markdown, so output is markdown
      const html = markdownToRichText(outputText);
      setInputText(outputText);
      document.getElementById("output-area").innerHTML = html;
    }
    setOutputText("");
  };
  
  // Copy to clipboard
  const handleCopy = () => {
    let contentToCopy;
    const outputArea = document.getElementById("output-area");
    
    if (isMarkdownToRich) {
      // If converting to rich text
      contentToCopy = plainFormatting ? outputArea.innerText : outputArea.innerHTML;
    } else {
      // If converting to markdown
      contentToCopy = outputArea.textContent;
    }
    
    navigator.clipboard.writeText(contentToCopy)
      .then(() => {
        const copyBtn = document.getElementById("copy-btn");
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

  return (
    <div className="app-container">
      <header className="relative z-10 flex flex-col items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        {/* Central title */}
        <div className="text-center mb-4">
          <h1 className="font-caveat text-4xl mb-1 text-accent-primary">ChatGPT Cleaner</h1>
          <p className="subtitle">Convert between markdown and rich text with ease</p>
        </div>
        
        <p className="bookmark-text flex items-center gap-1 text-sm text-gray-600 mt-1">
          <Bookmark className="h-4 w-4" /> Bookmark this tool
        </p>
        
        {/* Theme toggle */}
        <div className="absolute right-4 top-4">
          <div className="theme-toggle">
            <input type="checkbox" id="theme-switch" className="theme-switch-input" />
            <label htmlFor="theme-switch" className="theme-switch-label">
              <span>🌙</span>
              <span>☀️</span>
            </label>
          </div>
        </div>
      </header>

      <div className="conversion-controls">
        <div className="direction-toggle">
          <input 
            type="radio" 
            id="md-to-rich" 
            name="direction" 
            value="md-to-rich" 
            checked={isMarkdownToRich}
            onChange={handleDirectionChange} 
          />
          <label htmlFor="md-to-rich">Markdown → Rich Text</label>
          <input 
            type="radio" 
            id="rich-to-md" 
            name="direction" 
            value="rich-to-md" 
            checked={!isMarkdownToRich}
            onChange={handleDirectionChange} 
          />
          <label htmlFor="rich-to-md">Rich Text → Markdown</label>
        </div>
        
        <div className="options">
          <input 
            type="checkbox" 
            id="remove-citations" 
            name="remove-citations" 
            checked={removeCitations}
            onChange={(e) => setRemoveCitations(e.target.checked)}
          />
          <label htmlFor="remove-citations">Remove Citations</label>
          
          <input 
            type="checkbox" 
            id="plain-formatting" 
            name="plain-formatting"
            checked={plainFormatting}
            onChange={(e) => setPlainFormatting(e.target.checked)}
          />
          <label htmlFor="plain-formatting">Plain Text Output</label>
        </div>
      </div>

      <div className="editor-container">
        <div className="editor-panel">
          <h2 id="input-label">{isMarkdownToRich ? 'Markdown Input' : 'Rich Text Input'}</h2>
          <div className="editor-wrapper">
            <textarea 
              id="input-area" 
              value={inputText}
              onChange={handleInputChange}
              onClick={handleInputClick}
              placeholder={isMarkdownToRich ? "Paste your markdown text here..." : "Paste your rich text here..."}
            ></textarea>
          </div>
        </div>
        
        <div className="actions flex flex-col items-center">
          <button 
            id="convert-btn" 
            className="primary-btn mb-4"
            onClick={handleConvert}
          >
            Convert
          </button>
          
          <div className="conversion-direction flex items-center mb-2">
            <ArrowRight size={14} className={`text-accent-primary ${!isMarkdownToRich && 'rotate-180'}`} />
          </div>
          
          <button 
            id="swap-btn" 
            className="swap-btn flex items-center justify-center p-2 bg-accent-primary/10 hover:bg-accent-primary/20 rounded-full transition-all duration-300" 
            title="Swap input/output"
            onClick={handleSwap}
          >
            <ArrowRightLeft 
              size={24} 
              className="text-accent-primary group-hover:rotate-180 transition-transform duration-300" 
            />
          </button>
          <span className="text-xs text-gray-500 mt-1">Swap</span>
        </div>
        
        <div className="editor-panel">
          <h2 id="output-label">{isMarkdownToRich ? 'Rich Text Output' : 'Markdown Output'}</h2>
          <div className="editor-wrapper">
            <div 
              id="output-area" 
              className="rich-editor" 
              contentEditable={isMarkdownToRich}
            ></div>
          </div>
          <button 
            id="copy-btn" 
            className="secondary-btn"
            onClick={handleCopy}
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
      
      <div className="features-section">
        <h2 className="text-2xl font-semibold mb-6">Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3 className="text-xl font-medium mb-2">Bidirectional Conversion</h3>
            <p>Convert from Markdown to Rich Text or Rich Text to Markdown with a single click.</p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-medium mb-2">Citation Removal</h3>
            <p>Automatically strip citation markers like [1], [2,3] and remove source lists from academic or AI-generated texts.</p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-medium mb-2">Format Options</h3>
            <p>Choose between formatted rich text or clean plain text output for perfect pasting into any document.</p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-medium mb-2">Perfect for ChatGPT</h3>
            <p>Easily format text from AI chatbots for your documents, emails, or websites.</p>
          </div>
        </div>
      </div>
      
      <footer className="mt-8 pb-8 text-center">
        <p className="text-muted-foreground">Perfect for cleaning and formatting ChatGPT outputs</p>
      </footer>
    </div>
  );
};

export default Index;
