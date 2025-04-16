
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ConversionControlsProps {
  isMarkdownToRich: boolean;
  setIsMarkdownToRich: (value: boolean) => void;
  removeCitations: boolean;
  setRemoveCitations: (value: boolean) => void;
  plainFormatting: boolean;
  setPlainFormatting: (value: boolean) => void;
}

const ConversionControls = ({
  isMarkdownToRich,
  setIsMarkdownToRich,
  removeCitations,
  setRemoveCitations,
  plainFormatting,
  setPlainFormatting
}: ConversionControlsProps) => {
  const handleDirectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMarkdownToRich(e.target.id === "md-to-rich");
  };

  return (
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
  );
};

export default ConversionControls;
