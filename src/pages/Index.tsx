
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
    removeCitations,
    setRemoveCitations,
    plainFormatting,
    setPlainFormatting,
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

      <ConversionControls 
        removeCitations={removeCitations}
        setRemoveCitations={setRemoveCitations}
        plainFormatting={plainFormatting}
        setPlainFormatting={setPlainFormatting}
      />

      <div className="editor-container">
        <EditorPanel
          title='Rich Text Input'
          isInput={true}
          value={inputText}
          onChange={handleInputChange}
          onClick={handleInputClick}
          id="input-area"
        />
        
        <div className="actions flex flex-col items-center">
          <ConversionDirection 
            onConvert={handleConvert}
          />
        </div>
        
        <EditorPanel
          title='Markdown Output'
          isInput={false}
          contentEditable={false}
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
