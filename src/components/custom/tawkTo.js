import { useEffect } from "react";

const TawkTo = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/5f10589067771f3813c12957/1i7ss9dfv";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

    // Cleanup script when component unmounts
    return () => {
      const tawkScript = document.querySelector(
        'script[src="https://embed.tawk.to/5f10589067771f3813c12957/1i7ss9dfv"]'
      );
      if (tawkScript) {
        tawkScript.remove();
      }
    };
  }, []);

  return null; // No UI needed for this component
};

export default TawkTo;
