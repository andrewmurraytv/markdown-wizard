
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
        
        {/* Hand-drawn arrow pointing at bookmark text */}
        <div className="absolute -right-16 -top-2">
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-12">
            <path d="M5,20 Q20,5 30,25 T55,15" stroke="#ff3333" strokeWidth="2" strokeLinecap="round" fill="none" className="hand-drawn-arrow" />
            <path d="M55,15 L48,10 M55,15 L50,20" stroke="#ff3333" strokeWidth="2" strokeLinecap="round" className="hand-drawn-arrow-head" />
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
