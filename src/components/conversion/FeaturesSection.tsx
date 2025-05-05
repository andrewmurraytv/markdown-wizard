
import React from "react";
import { LucideIcon, Activity, BookOpen, RefreshCw, PencilRuler, Copy, FileCode } from "lucide-react";

// Added AI service icons
interface FeatureProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  logoSrc?: string;
}

const Feature = ({ title, description, icon: Icon, logoSrc }: FeatureProps) => {
  return (
    <div className="feature-card">
      <h3>
        {logoSrc ? (
          <img src={logoSrc} alt={title} className="feature-logo" />
        ) : Icon ? (
          <Icon size={20} />
        ) : null}
        {title}
      </h3>
      <p>{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  // Combined all features into one array including AI services
  const allFeatures: FeatureProps[] = [
    {
      title: "Bidirectional Conversion",
      description: "Convert markdown to rich text or rich text to markdown with a single click.",
      icon: RefreshCw
    },
    {
      title: "Format Preservation",
      description: "Maintain your text formatting during conversion between formats.",
      icon: PencilRuler
    },
    {
      title: "Copy to Clipboard",
      description: "Easily copy the converted text to your clipboard with one click.",
      icon: Copy
    },
    {
      title: "Citation Handling",
      description: "Option to strip citation markers for cleaner output text.",
      icon: BookOpen
    },
    {
      title: "Plain Formatting",
      description: "Choose between rich or plain formatting styles for your output.",
      icon: FileCode
    },
    {
      title: "Real-time Preview",
      description: "See changes instantly as you type for immediate feedback.",
      icon: Activity
    },
    {
      title: "ChatGPT Compatible",
      description: "Perfect formatting for use with OpenAI's ChatGPT.",
      logoSrc: "/chatgpt-logo.svg"
    },
    {
      title: "Claude Compatible",
      description: "Optimized conversion for Anthropic's Claude AI assistant.",
      logoSrc: "/claude-logo.svg"
    },
    {
      title: "Perplexity Compatible",
      description: "Seamless integration with Perplexity AI's formatting requirements.",
      logoSrc: "/perplexity-logo.svg"
    }
  ];

  return (
    <section className="features-section">
      <h2 className="features-heading">Features</h2>
      <div className="features-grid">
        {allFeatures.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            logoSrc={feature.logoSrc}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
