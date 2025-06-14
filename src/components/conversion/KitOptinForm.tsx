
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
    <div className="kit-optin-container my-8 p-4">
      {/* The Kit.com script will inject the form here */}
    </div>
  );
};

export default KitOptinForm;
