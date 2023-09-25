import { useInsertionEffect } from "react";

export function usePreventDocumentOverscroll() {
  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      html, body {
        overscroll-behavior: none;
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
}
