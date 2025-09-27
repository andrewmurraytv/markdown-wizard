
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-8 pb-20 text-center">{/* Added pb-20 to clear the fixed bottom banner */}
      <p className="text-muted-foreground">Convert rich text to Markdown with ease</p>
      <p className="text-xs text-muted-foreground mt-2">Perfect for cleaning and formatting outputs</p>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Does This Markdown Converter Tool Save You Time?
        </h3>
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

      {/* Legal Links */}
      <div className="mt-8 pt-6 border-t border-border/20">
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link 
            to="/privacy" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link 
            to="/terms" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Terms of Use
          </Link>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          © {new Date().getFullYear()} Markdown Converter. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
