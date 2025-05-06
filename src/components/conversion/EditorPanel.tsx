
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ConversionDirection } from "@/hooks/useConversion";

interface EditorPanelProps {
  title: string;
  isInput: boolean;
  contentEditable?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
  onCopy?: () => void;
  onPaste?: (e: React.ClipboardEvent) => void;
  id: string;
  direction: ConversionDirection;
}

const EditorPanel = ({
  title,
  isInput,
  contentEditable,
  value,
  onChange,
  onClick,
  onCopy,
  onPaste,
  id,
  direction
}: EditorPanelProps) => {
  const isMarkdownMode = (isInput && direction === "markdown-to-rich") || (!isInput && direction === "rich-to-markdown");
  const divRef = useRef<HTMLDivElement>(null);
  
  // Effect to handle direct paste events in contentEditable div
  useEffect(() => {
    if (!isInput && divRef.current && direction === "markdown-to-rich") {
      const div = divRef.current;
      
      // Set initial content if needed
      if (value) {
        div.innerHTML = value;
      }
    }
  }, [isInput, value, direction]);

  return (
    <div className="editor-panel">
      <h2 id={`${isInput ? 'input' : 'output'}-label`}>{title}</h2>
      <div className="editor-wrapper">
        {isInput ? (
          <Textarea 
            id={id}
            value={value}
            onChange={onChange}
            onClick={onClick}
            onPaste={onPaste}
            className="min-h-[400px] resize-none"
            placeholder={direction === "markdown-to-rich" ? "Paste your markdown text here..." : "Paste your rich text here..."}
          />
        ) : (
          <div 
            id={id}
            ref={divRef}
            className={isMarkdownMode ? "rich-editor min-h-[400px] p-4 overflow-auto" : "rich-editor min-h-[400px] p-4 overflow-auto"}
            contentEditable={contentEditable}
          ></div>
        )}
      </div>
      {!isInput && onCopy && (
        <Button 
          id="copy-btn" 
          className="secondary-btn mt-2"
          onClick={onCopy}
          variant="outline"
        >
          Copy to Clipboard
        </Button>
      )}
    </div>
  );
};

export default EditorPanel;
