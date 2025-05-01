
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ConversionControlsProps {
  removeCitations: boolean;
  setRemoveCitations: (value: boolean) => void;
  plainFormatting: boolean;
  setPlainFormatting: (value: boolean) => void;
}

const ConversionControls = ({
  removeCitations,
  setRemoveCitations,
  plainFormatting,
  setPlainFormatting
}: ConversionControlsProps) => {
  return (
    <div className="conversion-controls">
      <h3 className="text-lg font-medium">Rich Text → Markdown</h3>
      
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
