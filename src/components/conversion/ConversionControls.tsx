
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ConversionDirection } from "@/hooks/useConversion";

interface ConversionControlsProps {
  removeCitations: boolean;
  setRemoveCitations: (value: boolean) => void;
  plainFormatting: boolean;
  setPlainFormatting: (value: boolean) => void;
  direction: ConversionDirection;
}

const ConversionControls = ({
  removeCitations,
  setRemoveCitations,
  plainFormatting,
  setPlainFormatting,
  direction
}: ConversionControlsProps) => {
  return (
    <div className="conversion-controls">
      <h3 className="text-lg font-medium">
        {direction === "markdown-to-rich" ? "Markdown → Rich Text" : "Rich Text → Markdown"}
      </h3>
      
      <div className="options space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remove-citations" 
            checked={removeCitations}
            onCheckedChange={(checked) => setRemoveCitations(checked === true)}
            disabled={direction === "markdown-to-rich"}
          />
          <Label htmlFor="remove-citations">Remove Citations</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="plain-formatting" 
            checked={plainFormatting}
            onCheckedChange={(checked) => setPlainFormatting(checked === true)}
          />
          <Label htmlFor="plain-formatting">Plain Text Output</Label>
        </div>
      </div>
    </div>
  );
};

export default ConversionControls;
