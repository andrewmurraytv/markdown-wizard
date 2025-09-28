
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/conversion/Header";
import ConversionControls from "@/components/conversion/ConversionControls";
import EditorPanel from "@/components/conversion/EditorPanel";
import ConversionDirection from "@/components/conversion/ConversionDirection";
import DirectionToggle from "@/components/conversion/DirectionToggle";
import FeaturesSection from "@/components/conversion/FeaturesSection";
import KitOptinForm from "@/components/conversion/KitOptinForm";
import Footer from "@/components/conversion/Footer";
import BottomPromoBar from "@/components/conversion/BottomPromoBar";
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
    handleClear,
    handleCopy,
    handleInputClick,
    handlePaste
  } = useConversion();

  // Add effect to update theme synchronously to prevent flash
  useEffect(() => {
    // Check for saved theme preference immediately
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setThemeEnabled(true);
      document.body.setAttribute('data-theme', 'dark');
    } else {
      setThemeEnabled(false);
      document.body.removeAttribute('data-theme');
    }
  }, []);
  
  const handleThemeToggle = (enabled: boolean) => {
    setThemeEnabled(enabled);
    if (enabled) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="app-container pb-16" style={{ minHeight: '100vh' }}>
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
          onPaste={handlePaste}
          id="input-area"
          direction={direction}
        />
        
        <div className="actions flex flex-col items-center">
          <ConversionDirection 
            onConvert={handleConvert}
            onClear={handleClear}
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
      
      <FeaturesSection />
      <KitOptinForm />
      <Footer />
      <BottomPromoBar />
    </div>
  );
};

export default Index;
