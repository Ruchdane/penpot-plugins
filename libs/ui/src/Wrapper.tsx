import { type PropsWithChildren, useEffect, useState } from "react";

/**
 * Wrapper for the plugin interface with theme handler
 */
export function Wrapper({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState(() => {
    const url = new URL(window.location.href);
    return url.searchParams.get("theme");
  });

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data.type === "theme") {
        setTheme(event.data.content);
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  return <div data-theme={theme}>{children}</div>;
}
