
import React from "react";
import { Button } from "@/components/ui/button";
import { ConversionDirection as DirectionType } from "@/hooks/useConversion";

interface ConversionDirectionProps {
  onConvert: () => void;
  onClear: () => void;
  direction: DirectionType;
}

const ConversionDirection = ({ onConvert, onClear, direction }: ConversionDirectionProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="conversion-direction flex flex-col items-center mb-2">
        <div className="text-xs font-medium text-accent-primary mb-1">
          {direction === "markdown-to-rich" ? "Markdown → Rich Text" : "Rich Text → Markdown"}
        </div>
      </div>
      
      <Button 
        id="convert-btn" 
        className="primary-btn mb-2 w-36"
        onClick={onConvert}
      >
        Convert
      </Button>

      <Button 
        id="clear-btn" 
        className="secondary-btn mb-4 w-36"
        onClick={onClear}
        variant="outline"
      >
        Clear Content
      </Button>
    </div>
  );
};

export default ConversionDirection;
