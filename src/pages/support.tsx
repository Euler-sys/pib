
// SupportBot.tsx

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
    // Prevent duplicate initialization
    if (document.getElementById("smartsupp-script")) {
      return;
    }

    // Original Smartsupp initialization
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key =
      "283f5415a9c0e0b1d241eb22539f6ea7ac8e53bf";

    window.smartsupp ||
      (function (d: Document) {
        let s: Element | null;
        let c: HTMLScriptElement;

        const o: any = (window.smartsupp = function (...args: any[]) {
          o._.push(args);
        });

        o._ = [];

        s = d.getElementsByTagName("script")[0];
        c = d.createElement("script");

        c.id = "smartsupp-script";
        c.type = "text/javascript";
        c.charset = "utf-8";
        c.async = true;
        c.src = "https://www.smartsuppchat.com/loader.js?";

        if (s?.parentNode) {
          s.parentNode.insertBefore(c, s);
        } else {
          d.head.appendChild(c);
        }
      })(document);
  }, []);

  return (
    <div className="fixed bottom-[100px] left-5 z-[9999] flex flex-col items-center space-y-1">
      <button
        onClick={() => {
          window.location.href =
            "mailto:premiuminv@financier.com";
        }}
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
