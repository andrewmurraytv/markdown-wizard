
import React from "react";
import { ArrowRight, ArrowRightLeft } from "lucide-react";

interface ConversionDirectionProps {
  isMarkdownToRich: boolean;
  onSwap: () => void;
}

const ConversionDirection = ({ isMarkdownToRich, onSwap }: ConversionDirectionProps) => {
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
      
      <button 
        id="swap-btn" 
        className="swap-btn flex items-center justify-center p-2 bg-accent-primary/20 hover:bg-accent-primary/30 rounded-full transition-all duration-300 mt-2" 
        title="Swap conversion direction"
        onClick={onSwap}
      >
        <ArrowRightLeft 
          size={24} 
          className="text-accent-primary group-hover:rotate-180 transition-transform duration-300" 
        />
      </button>
      <span className="text-xs text-gray-500 mt-1">Reverse Direction</span>
    </div>
  );
};

export default ConversionDirection;
