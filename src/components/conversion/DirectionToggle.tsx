
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowRight } from "lucide-react";

interface DirectionToggleProps {
  direction: "markdown-to-rich" | "rich-to-markdown";
  setDirection: (direction: "markdown-to-rich" | "rich-to-markdown") => void;
}

const DirectionToggle = ({ direction, setDirection }: DirectionToggleProps) => {
  return (
    <div className="direction-toggle-container mb-6">
      <h3 className="text-lg font-medium mb-2">Conversion Direction:</h3>
      <ToggleGroup 
        type="single" 
        variant="outline"
        value={direction} 
        onValueChange={(value) => {
          if (value) setDirection(value as "markdown-to-rich" | "rich-to-markdown");
        }}
        className="w-full border border-border rounded-lg overflow-hidden"
      >
        <ToggleGroupItem 
          value="markdown-to-rich" 
          className="w-1/2 py-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <div className="flex items-center justify-center">
            <span className="font-medium">Markdown</span>
            <ArrowRight size={18} className="mx-2" />
            <span className="font-medium">Rich Text</span>
          </div>
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="rich-to-markdown" 
          className="w-1/2 py-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <div className="flex items-center justify-center">
            <span className="font-medium">Rich Text</span>
            <ArrowRight size={18} className="mx-2" />
            <span className="font-medium">Markdown</span>
          </div>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default DirectionToggle;
