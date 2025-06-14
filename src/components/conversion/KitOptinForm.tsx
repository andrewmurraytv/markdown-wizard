
import React, { useEffect } from 'react';

const KitOptinForm = () => {
  useEffect(() => {
    // Load the Kit.com script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-uid', '24e6d0a18f');
    script.src = 'https://3.kit.com/24e6d0a18f/index.js';
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[data-uid="24e6d0a18f"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section className="newsletter-section py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8">
            Get notified about new features and updates to Markdown Converter Wizard
          </p>
          <div 
            id="kit-form-container" 
            className="kit-optin-container w-full max-w-md mx-auto"
          >
            {/* The Kit.com script will inject the form here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitOptinForm;
