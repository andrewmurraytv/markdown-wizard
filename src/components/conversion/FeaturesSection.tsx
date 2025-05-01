
import React from "react";

interface FeatureProps {
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  additionalFeatures?: FeatureProps[];
}

const FeaturesSection = ({ additionalFeatures }: FeaturesSectionProps) => {
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
      
      {additionalFeatures && additionalFeatures.length > 0 && (
        <>
          <h3 className="additional-features-heading">AI-Specific Tools</h3>
          <div className="additional-features-grid">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="additional-feature-card">
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturesSection;
