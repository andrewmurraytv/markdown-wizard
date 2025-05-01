import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/conversion/Header";
import ConversionControls from "@/components/conversion/ConversionControls";
import EditorPanel from "@/components/conversion/EditorPanel";
import ConversionDirection from "@/components/conversion/ConversionDirection";
import DirectionToggle from "@/components/conversion/DirectionToggle";
import FeaturesSection from "@/components/conversion/FeaturesSection";
import Footer from "@/components/conversion/Footer";
import { useConversion } from "@/hooks/useConversion";

const Index = () => {
  const [themeEnabled, setThemeEnabled] = useState(false);
  
  const {
    inputText,
    outputText,
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

      <DirectionToggle 
        direction={direction}
        setDirection={setDirection}
      />

      <ConversionControls 
        removeCitations={removeCitations}
        setRemoveCitations={setRemoveCitations}
        plainFormatting={plainFormatting}
        setPlainFormatting={setPlainFormatting}
        direction={direction}
      />

      <div className="editor-container">
        <EditorPanel
          title={direction === "markdown-to-rich" ? 'Markdown Input' : 'Rich Text Input'}
          isInput={true}
          value={inputText}
          onChange={handleInputChange}
          onClick={handleInputClick}
          id="input-area"
          direction={direction}
        />
        
        <div className="actions flex flex-col items-center">
          <ConversionDirection 
            onConvert={handleConvert}
            direction={direction}
          />
        </div>
        
        <EditorPanel
          title={direction === "markdown-to-rich" ? 'Rich Text Output' : 'Markdown Output'}
          isInput={false}
          contentEditable={direction === "markdown-to-rich"}
          onCopy={handleCopy}
          id="output-area"
          direction={direction}
        />
      </div>
      
      <FeaturesSection additionalFeatures={[
        {
          title: "Clean Perplexity Research",
          description: "Quickly convert Perplexity real-time research to rich-text format."
        },
        {
          title: "Claude Companion",
          description: "Convert your Claude AI chats to Rich-Text easily for free."
        }
      ]} />
      <Footer />
    </div>
  );
};

export default Index;
