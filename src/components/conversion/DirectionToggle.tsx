
import React from "react";
import { Button } from "@/components/ui/button";
import { ConversionDirection } from "@/hooks/useConversion";

interface DirectionToggleProps {
  direction: ConversionDirection;
  setDirection: (direction: ConversionDirection) => void;
}

const DirectionToggle = ({ direction, setDirection }: DirectionToggleProps) => {
  const toggleDirection = (newDirection: ConversionDirection) => {
    setDirection(newDirection);
  };

  return (
    <div className="direction-toggle my-6">
      <h2 className="text-center text-xl font-medium mb-4">What Do You Want To Convert?</h2>
      
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={direction === "markdown-to-rich" ? "blue" : "outline"}
          onClick={() => toggleDirection("markdown-to-rich")}
          className="flex-1 max-w-xs"
        >
          Markdown → Rich Text
        </Button>
        
        <Button
          variant={direction === "rich-to-markdown" ? "blue" : "outline"}
          onClick={() => toggleDirection("rich-to-markdown")}
          className="flex-1 max-w-xs"
        >
          Rich Text → Markdown
        </Button>
      </div>
    </div>
  );
};

export default DirectionToggle;
