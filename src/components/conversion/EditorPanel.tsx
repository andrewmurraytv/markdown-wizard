
import React from "react";
import { Button } from "@/components/ui/button";
import { ConversionDirection } from "@/hooks/useConversion";

interface EditorPanelProps {
  title: string;
  isInput: boolean;
  contentEditable?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
  onCopy?: () => void;
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
  id,
  direction
}: EditorPanelProps) => {
  const isMarkdownMode = (isInput && direction === "markdown-to-rich") || (!isInput && direction === "rich-to-markdown");
  
  return (
    <div className="editor-panel">
      <h2 id={`${isInput ? 'input' : 'output'}-label`}>{title}</h2>
      <div className="editor-wrapper">
        {isInput ? (
          <textarea 
            id={id}
            value={value}
            onChange={onChange}
            onClick={onClick}
            placeholder={direction === "markdown-to-rich" ? "Paste your markdown text here..." : "Paste your rich text here..."}
          ></textarea>
        ) : (
          <div 
            id={id}
            className={isMarkdownMode ? "rich-editor" : "rich-editor"}
            contentEditable={contentEditable}
          ></div>
        )}
      </div>
      {!isInput && onCopy && (
        <Button 
          id="copy-btn" 
          className="secondary-btn"
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
