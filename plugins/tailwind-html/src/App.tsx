import { Wrapper } from "@libs/ui";
import { useEffect, useRef, useState } from "react";
import type { PluginMessageEvent } from "./model.ts";

export function App() {
  const [html, setHTML] = useState("");
  const [isCopied, setCopied] = useState(false);
  const timer = useRef<null | ReturnType<typeof setTimeout>>(null);
  useEffect(() => {
    window.parent.postMessage(
      {
        type: "ready",
      } satisfies PluginMessageEvent,
      "*",
    );
    const listener = (event: MessageEvent<PluginMessageEvent>) => {
      if (event.data.type === "html") {
        setHTML(event.data.content);
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  const copy = () => {
    if (!navigator.clipboard) {
      alert("Clipboard API not supported");
      return;
    }

    // Write the HTML content to clipboard
    navigator.clipboard
      .writeText(html)
      .then(() => {
        setCopied(true);
        timer.current = setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        alert(`Failed to copy: ${err}`);
      });
  };

  const isEmpty = !Boolean(html);

  return (
    <Wrapper>
      {html && (
        <>
          <div
            style={{ fontFamily: "monospace" }}
            className="body-xs code"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <button
            onClick={copy}
            className="p-2 rounded-full bg-transparent bg-primary hover:(bg-quaternary text-accent) cursor-pointer transition text-secondary fixed top-1 right-1"
          >
            {isCopied ? (
              <div className="i-ri-check-line size-5 text-green-500"></div>
            ) : (
              <div className="i-ri-file-copy-line size-5"></div>
            )}
          </button>
        </>
      )}
      {isEmpty && (
        <div className="py-4 body-s text-center opacity-60 h-screen flex items-center justify-center">
          Select any layer to get the HTML code
        </div>
      )}
    </Wrapper>
  );
}
