
import React from "react";
import { MessageSquareCode, MessageSquarePlus, MessageSquareHeart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeaturesSectionProps {
  additionalFeatures?: FeatureProps[];
}

const FeaturesSection = ({ additionalFeatures }: FeaturesSectionProps) => {
  // Standard features with icons
  const standardFeatures: FeatureProps[] = [
    {
      title: "Bidirectional Conversion",
      description: "Convert from Markdown to Rich Text or Rich Text to Markdown with a single click.",
      icon: <MessageSquareCode className="h-6 w-6 text-primary" />
    },
    {
      title: "Citation Removal",
      description: "Automatically strip citation markers like [1], [2,3] and remove source lists from academic or AI-generated texts.",
      icon: <MessageSquarePlus className="h-6 w-6 text-primary" />
    },
    {
      title: "Format Options",
      description: "Choose between formatted rich text or clean plain text output for perfect pasting into any document.",
      icon: <MessageSquareHeart className="h-6 w-6 text-primary" />
    },
    {
      title: "Perfect for ChatGPT",
      description: "Easily format text from AI chatbots for your documents, emails, or websites.",
      icon: <MessageSquareCode className="h-6 w-6 text-primary" />
    },
    {
      title: "Clean Perplexity Research",
      description: "Quickly convert Perplexity real-time research to rich-text format.",
      icon: <MessageSquarePlus className="h-6 w-6 text-primary" />
    },
    {
      title: "Claude Companion",
      description: "Convert your Claude AI chats to Rich-Text easily for free.",
      icon: <MessageSquareHeart className="h-6 w-6 text-primary" />
    }
  ];

  // Combine standard features with any additional features
  const allFeatures = additionalFeatures 
    ? [...standardFeatures, ...additionalFeatures]
    : standardFeatures;

  return (
    <div className="features-section">
      <h2 className="text-2xl font-semibold mb-6 text-center">Features</h2>
      <div className="features-grid">
        {allFeatures.map((feature, index) => (
          <Card key={index} className="feature-card hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              {feature.icon}
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
