
import React from 'react';

const TrackingScripts = () => {
  return (
    <>
      {/* Visitor Tracking */}
      <script 
        async 
        defer 
        src='https://app.visitortracking.com/assets/js/tracer.js'
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            function init_tracer() { 
              var tracer = new Tracer({  
                websiteId : "12cc4be9-8bcf-4560-beef-8578a3579ee7",  
                async : true, 
                debug : false 
              }); 
            }
          `
        }}
      />
      
      {/* Microsoft Clarity */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rysd445st1");
          `
        }}
      />
    </>
  );
};

export default TrackingScripts;
