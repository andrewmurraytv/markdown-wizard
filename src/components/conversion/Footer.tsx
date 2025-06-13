
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 pb-8 text-center">
      <p className="text-muted-foreground">Convert rich text to Markdown with ease</p>
      <p className="text-xs text-muted-foreground mt-2">Perfect for cleaning and formatting outputs</p>
      
      <div className="mt-4">
        <a 
          href="https://buymeacoffee.com/andrewmurray" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block hover:opacity-80 transition-opacity duration-200"
        >
          <img 
            src="/lovable-uploads/f5cf7413-e1a8-442f-b440-9ab6faf10b2b.png" 
            alt="Buy me a coffee" 
            className="h-12 w-auto rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
