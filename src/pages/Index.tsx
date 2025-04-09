
import React, { useEffect, useState } from "react";
import { useVisitTracker } from "@/hooks/use-visit-tracker";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Bookmark, LogIn, UserPlus } from "lucide-react";

const Index = () => {
  const { isFirstVisit, isLoading, shouldPromptSignup, trackInputClick } = useVisitTracker();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  
  useEffect(() => {
    if (shouldPromptSignup) {
      toast({
        title: "Whoa cowboy!",
        description: "Create a free account to continue using this tool for free.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [shouldPromptSignup]);

  const handleInputClick = () => {
    setInputText("");
    trackInputClick();
  };

  return (
    <div className="app-container">
      <header className="relative z-10 flex flex-col items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        {/* Central title */}
        <div className="text-center mb-2">
          <h1>ChatGPT Cleaner</h1>
          <p className="subtitle">Convert between markdown and rich text with ease</p>
        </div>
        
        {/* Auth buttons - Made more prominent and visible */}
        <div className="w-full flex justify-center my-3">
          {user ? (
            <div className="auth-controls flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
              <span className="user-email text-sm font-medium">{user.email}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="auth-buttons flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/auth')} 
                className="flex items-center gap-1 border border-blue-300 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/30"
              >
                <LogIn className="h-4 w-4" /> Sign In
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => navigate('/auth?tab=signup')} 
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <UserPlus className="h-4 w-4" /> Sign Up
              </Button>
            </div>
          )}
        </div>
        
        <p className="bookmark-text flex items-center gap-1 text-sm text-gray-600 mt-1">
          <Bookmark className="h-4 w-4" /> Bookmark this tool
        </p>
        
        {/* Theme toggle */}
        <div className="absolute right-4 top-4">
          <div className="theme-toggle">
            <input type="checkbox" id="theme-switch" className="theme-switch-input" />
            <label htmlFor="theme-switch" className="theme-switch-label">
              <span>🌙</span>
              <span>☀️</span>
            </label>
          </div>
        </div>
      </header>

      <div className="conversion-controls">
        <div className="direction-toggle">
          <input type="radio" id="md-to-rich" name="direction" value="md-to-rich" defaultChecked />
          <label htmlFor="md-to-rich">Markdown → Rich Text</label>
          <input type="radio" id="rich-to-md" name="direction" value="rich-to-md" />
          <label htmlFor="rich-to-md">Rich Text → Markdown</label>
        </div>
        
        <div className="options">
          <input type="checkbox" id="remove-citations" name="remove-citations" />
          <label htmlFor="remove-citations">Remove Citations</label>
          
          <input type="checkbox" id="plain-formatting" name="plain-formatting" />
          <label htmlFor="plain-formatting">Plain Text Output</label>
        </div>
      </div>

      <div className="editor-container">
        <div className="editor-panel">
          <h2 id="input-label">AI Text Input</h2>
          <div className="editor-wrapper">
            <textarea 
              id="input-area" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onClick={handleInputClick}
              placeholder="Paste your markdown text here..."
            ></textarea>
          </div>
        </div>
        
        <div className="actions">
          <button id="convert-btn" className="primary-btn">Convert</button>
          <button id="swap-btn" className="icon-btn" title="Swap input/output">⇄</button>
        </div>
        
        <div className="editor-panel">
          <h2 id="output-label">Rich Text Output</h2>
          <div className="editor-wrapper">
            <div id="output-area" className="rich-editor" contentEditable="true"></div>
          </div>
          <button id="copy-btn" className="secondary-btn">Copy to Clipboard</button>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Bidirectional Conversion</h3>
            <p>Convert from Markdown to Rich Text or Rich Text to Markdown with a single click.</p>
          </div>
          <div className="feature-card">
            <h3>Citation Removal</h3>
            <p>Automatically strip citation markers like [1], [2,3] and remove source lists from academic or AI-generated texts.</p>
          </div>
          <div className="feature-card">
            <h3>Format Options</h3>
            <p>Choose between formatted rich text or clean plain text output for perfect pasting into any document.</p>
          </div>
          <div className="feature-card">
            <h3>Perfect for ChatGPT</h3>
            <p>Easily format text from AI chatbots for your documents, emails, or websites.</p>
          </div>
        </div>
      </div>
      
      <footer>
        <p>Perfect for cleaning and formatting ChatGPT outputs</p>
        {!user && (
          <Button 
            onClick={() => navigate('/auth')} 
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Sign In / Create Account
          </Button>
        )}
      </footer>
    </div>
  );
};

export default Index;
