
import { useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";

declare global {
  interface Window {
    _smartsupp?: any;
    smartsupp?: any;
  }
}

const SupportBot = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent loading twice
    if (document.getElementById("smartsupp-script")) return;

    window._smartsupp = window._smartsupp || {};

    // Your new Smartsupp key
    window._smartsupp.key =
      "283f5415a9c0e0b1d241eb22539f6ea7ac8e53bf";

    const script = document.createElement("script");
    script.id = "smartsupp-script";
    script.type = "text/javascript";
    script.async = true;
    script.charset = "utf-8";
    script.src = "https://www.smartsuppchat.com/loader.js?";

    const firstScript = document.getElementsByTagName("script")[0];

    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="fixed bottom-[100px] left-5 z-[9999] flex flex-col items-center space-y-1">
      <button
        onClick={() =>
          (window.location.href =
            "mailto:premiuminv@financier.com")
        }
        aria-label="Email Support"
        className="p-3 rounded-full shadow-lg bg-red-800 hover:bg-red-700 text-white transition"
      >
        <FaEnvelope size={18} />
      </button>

      <span className="text-sm text-black font-bold">
        Email Us
      </span>
    </div>
  );
};

export default SupportBot;
