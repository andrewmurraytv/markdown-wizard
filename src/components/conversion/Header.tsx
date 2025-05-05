
import React from "react";
import { Bookmark } from "lucide-react";

interface HeaderProps {
  themeEnabled?: boolean;
  onToggleTheme?: (enabled: boolean) => void;
}

const Header = ({ themeEnabled, onToggleTheme }: HeaderProps) => {
  return (
    <header className="relative z-10 flex flex-col items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {/* Central title */}
      <div className="text-center mb-4">
        <h1 className="font-caveat text-4xl mb-1 text-accent-primary">ChatGPT Cleaner</h1>
        <p className="subtitle">Convert between markdown and rich text with ease</p>
      </div>
      
      <div className="relative">
        <p className="bookmark-text flex items-center gap-1 text-sm text-gray-600 mt-1">
          <Bookmark className="h-4 w-4" /> Bookmark this tool
        </p>
        
        {/* Hand-drawn arrow pointing at bookmark text - now more playful */}
        <div className="absolute -right-32 -top-8">
          <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-0">
            <path d="M10,60 C30,10 80,80 100,40" stroke="#ff0000" strokeWidth="8" strokeLinecap="round" fill="none" className="hand-drawn-arrow" />
            <path d="M100,40 L110,60 M100,40 L80,45" stroke="#ff0000" strokeWidth="8" strokeLinecap="round" className="hand-drawn-arrow-head" />
          </svg>
        </div>
      </div>
      
      {/* Theme toggle */}
      <div className="absolute right-4 top-4">
        <div className="theme-toggle">
          <input 
            type="checkbox" 
            id="theme-switch" 
            className="theme-switch-input"
            checked={themeEnabled}
            onChange={(e) => onToggleTheme && onToggleTheme(e.target.checked)}
          />
          <label htmlFor="theme-switch" className="theme-switch-label">
            <span>🌙</span>
            <span>☀️</span>
          </label>
        </div>
      </div>
    </header>
  );
};

export default Header;
