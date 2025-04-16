
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/conversion/Header";
import ConversionControls from "@/components/conversion/ConversionControls";
import EditorPanel from "@/components/conversion/EditorPanel";
import ConversionDirection from "@/components/conversion/ConversionDirection";
import FeaturesSection from "@/components/conversion/FeaturesSection";
import Footer from "@/components/conversion/Footer";
import { useConversion } from "@/hooks/useConversion";

const Index = () => {
  const [themeEnabled, setThemeEnabled] = useState(false);
  
  const {
    inputText,
    outputText,
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
  } = useConversion();
  
  const handleThemeToggle = (enabled: boolean) => {
    setThemeEnabled(enabled);
    if (enabled) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  };

  return (
    <div className="app-container">
      <Header 
        themeEnabled={themeEnabled}
        onToggleTheme={handleThemeToggle}
      />

      <ConversionControls 
        isMarkdownToRich={isMarkdownToRich}
        setIsMarkdownToRich={setIsMarkdownToRich}
        removeCitations={removeCitations}
        setRemoveCitations={setRemoveCitations}
        plainFormatting={plainFormatting}
        setPlainFormatting={setPlainFormatting}
      />

      <div className="editor-container">
        <EditorPanel
          title={isMarkdownToRich ? 'Markdown Input' : 'Rich Text Input'}
          isInput={true}
          isMarkdownToRich={isMarkdownToRich}
          value={inputText}
          onChange={handleInputChange}
          onClick={handleInputClick}
          id="input-area"
        />
        
        <div className="actions flex flex-col items-center">
          <button 
            id="convert-btn" 
            className="primary-btn mb-4 w-36"
            onClick={handleConvert}
          >
            Convert
          </button>
          
          <ConversionDirection 
            isMarkdownToRich={isMarkdownToRich}
            onSwap={handleSwap}
          />
        </div>
        
        <EditorPanel
          title={isMarkdownToRich ? 'Rich Text Output' : 'Markdown Output'}
          isInput={false}
          isMarkdownToRich={isMarkdownToRich}
          contentEditable={isMarkdownToRich}
          onCopy={handleCopy}
          id="output-area"
        />
      </div>
      
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
