
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionDirection as DirectionType } from "@/hooks/useConversion";

interface ConversionDirectionProps {
  onConvert: () => void;
  direction: DirectionType;
}

const ConversionDirection = ({ onConvert, direction }: ConversionDirectionProps) => {
  const isMarkdownToRich = direction === "markdown-to-rich";
  
  return (
    <div className="flex flex-col items-center">
      <div className="conversion-direction flex flex-col items-center mb-2">
        <div className="text-xs font-medium text-accent-primary mb-1">
          {isMarkdownToRich ? "Markdown → Rich Text" : "Rich Text → Markdown"}
        </div>
        <div className="flex items-center justify-center bg-accent-primary/10 px-3 py-1 rounded">
          <span className="mr-2">{isMarkdownToRich ? "MD" : "Rich"}</span>
          <ArrowRight size={16} className="text-accent-primary" />
          <span className="ml-2">{isMarkdownToRich ? "Rich" : "MD"}</span>
        </div>
      </div>
      
      <Button 
        id="convert-btn" 
        className="primary-btn mb-4 w-36"
        onClick={onConvert}
      >
        Convert
      </Button>
    </div>
  );
};

export default ConversionDirection;
