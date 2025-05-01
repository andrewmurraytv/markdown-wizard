
import React from "react";
import { Button } from "@/components/ui/button";

interface EditorPanelProps {
  title: string;
  isInput: boolean;
  contentEditable?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
  onCopy?: () => void;
  id: string;
}

const EditorPanel = ({
  title,
  isInput,
  contentEditable,
  value,
  onChange,
  onClick,
  onCopy,
  id
}: EditorPanelProps) => {
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
            placeholder="Paste your rich text here..."
          ></textarea>
        ) : (
          <div 
            id={id}
            className="rich-editor" 
            contentEditable={contentEditable}
          ></div>
        )}
      </div>
      {!isInput && onCopy && (
        <button 
          id="copy-btn" 
          className="secondary-btn"
          onClick={onCopy}
        >
          Copy to Clipboard
        </button>
      )}
    </div>
  );
};

export default EditorPanel;
