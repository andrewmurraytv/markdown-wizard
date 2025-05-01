
import React from "react";
import { ArrowRight, ArrowRightLeft } from "lucide-react";

interface ConversionDirectionProps {
  onConvert: () => void;
}

const ConversionDirection = ({ onConvert }: ConversionDirectionProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="conversion-direction flex flex-col items-center mb-2">
        <div className="text-xs font-medium text-accent-primary mb-1">
          Rich Text → Markdown
        </div>
        <div className="flex items-center justify-center bg-accent-primary/10 px-3 py-1 rounded">
          <span className="mr-2">Rich</span>
          <ArrowRight size={16} className="text-accent-primary" />
          <span className="ml-2">MD</span>
        </div>
      </div>
      
      <button 
        id="convert-btn" 
        className="primary-btn mb-4 w-36"
        onClick={onConvert}
      >
        Convert
      </button>
    </div>
  );
};

export default ConversionDirection;
