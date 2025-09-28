
import React from "react";

const BottomPromoBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div 
        className="text-white py-3 px-4 text-center animate-pulse"
        style={{ backgroundColor: '#E5021A' }}
      >
        <a 
          href="https://get.descript.com/markdown" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-red-200 transition-colors duration-200 font-medium wiggle-animation"
        >
          Try The World's Best AI Video Editor. Click Here
        </a>
      </div>
    </div>
  );
};

export default BottomPromoBar;
