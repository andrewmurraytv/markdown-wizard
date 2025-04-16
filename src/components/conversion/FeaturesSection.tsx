
import React from "react";

const FeaturesSection = () => {
  return (
    <div className="features-section">
      <h2 className="text-2xl font-semibold mb-6">Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <h3 className="text-xl font-medium mb-2">Bidirectional Conversion</h3>
          <p>Convert from Markdown to Rich Text or Rich Text to Markdown with a single click.</p>
        </div>
        <div className="feature-card">
          <h3 className="text-xl font-medium mb-2">Citation Removal</h3>
          <p>Automatically strip citation markers like [1], [2,3] and remove source lists from academic or AI-generated texts.</p>
        </div>
        <div className="feature-card">
          <h3 className="text-xl font-medium mb-2">Format Options</h3>
          <p>Choose between formatted rich text or clean plain text output for perfect pasting into any document.</p>
        </div>
        <div className="feature-card">
          <h3 className="text-xl font-medium mb-2">Perfect for ChatGPT</h3>
          <p>Easily format text from AI chatbots for your documents, emails, or websites.</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
