
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
  
  // Effect to handle direct paste events and display in content editable div
  useEffect(() => {
    if (!isInput && divRef.current && direction === "markdown-to-rich") {
      const div = divRef.current;
      
      // Set initial content if needed
      if (value) {
        div.innerHTML = value;
      }
    }
  }, [isInput, value, direction]);

  // Effect to style links in rich text input
  useEffect(() => {
    if (isInput && direction === "rich-to-markdown" && divRef.current) {
      const div = divRef.current;
      
      // Highlight links with a distinct color and styling
      const highlightLinks = () => {
        const links = div.querySelectorAll('a');
        links.forEach(link => {
          if (link instanceof HTMLElement) {
            link.style.color = '#8B5CF6'; // Vivid purple color
            link.style.textDecoration = 'underline';
            link.style.fontWeight = 'bold';
          }
        });
        
        // Highlight headings with a distinct styling
        const headings = div.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
          if (heading instanceof HTMLElement) {
            heading.style.fontWeight = 'bold';
            heading.style.color = '#F97316'; // Orange for headings
            heading.style.borderBottom = '1px solid #F97316';
            heading.style.marginTop = '0.75rem';
          }
        });
      };
      
      // Apply highlighting
      if (div.innerHTML) {
        highlightLinks();
      }
      
      // Create a MutationObserver to detect content changes
      const observer = new MutationObserver(highlightLinks);
      observer.observe(div, { childList: true, subtree: true });
      
      return () => observer.disconnect();
    }
  }, [isInput, direction]);

  return (
    <div className="editor-panel">
      <div className="flex justify-between items-center p-4 bg-secondary border-b">
        <h2 id={`${isInput ? 'input' : 'output'}-label`} className="text-sm font-medium m-0">{title}</h2>
        {!isInput && onCopy && (
          <Button 
            onClick={onCopy}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Copy
          </Button>
        )}
      </div>
      <div className="editor-wrapper">
        {isInput && direction === "markdown-to-rich" ? (
          <Textarea 
            id={id}
            value={value}
            onChange={onChange}
            onClick={onClick}
            onPaste={onPaste}
            className="min-h-[400px] resize-none"
            placeholder="Paste your markdown text here..."
          />
        ) : isInput && direction === "rich-to-markdown" ? (
          <div 
            id={id}
            ref={divRef}
            className="rich-editor min-h-[400px] p-4 overflow-auto empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
            contentEditable={true}
            onInput={(e) => {
              if (onChange) {
                const event = {
                  target: {
                    value: e.currentTarget.innerHTML
                  }
                } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
                onChange(event);
              }
            }}
            onClick={onClick}
            onPaste={onPaste}
            data-placeholder="Paste your rich text here..."
          ></div>
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
