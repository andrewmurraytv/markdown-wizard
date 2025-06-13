
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
        <h1 className="font-caveat text-4xl mb-1 text-accent-primary">Markdown Converter Wizard</h1>
        <p className="subtitle">Convert Markdown to Rich-Text with ease.</p>
        <p className="subtitle">Always 100% Free. No Signup.</p>
      </div>
      
      <div className="relative">
        <p className="bookmark-text flex items-center gap-1 text-sm text-gray-600 mt-1">
          <Bookmark className="h-4 w-4" /> Bookmark this tool
        </p>
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
