
import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

const LiveSupport = () => {
  useEffect(() => {
    // Prevent Tawk from loading multiple times
    if (document.getElementById("tawk-script")) {
      return;
    }

    // Tawk global variables
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Create Tawk script
    const script = document.createElement("script");

    script.id = "tawk-script";
    script.async = true;
    script.src =
      "https://embed.tawk.to/6ac7735b35f62834c6617b7e/1k4dhl81g";

    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Add Tawk to the page
    document.body.appendChild(script);

    // Cleanup
    return () => {
      const existingScript = document.getElementById("tawk-script");

      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};

export default LiveSupport;
