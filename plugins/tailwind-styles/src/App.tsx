import { Tools } from "./panels/Tools.tsx";
import { useState } from "react";
import { Shadows } from "./panels/Shadows.tsx";
import { Colors } from "./panels/Colors.tsx";
import { Texts } from "./panels/Texts.tsx";

export function App() {
  const url = new URL(window.location.href);
  const [panel, setPanel] = useState<null | string>(null);

  return (
    <div data-theme={url.searchParams.get("theme") ?? "dark"}>
      {panel !== null && (
        <button
          onClick={() => setPanel(null)}
          className="absolute top-1 left-1 p-2  rounded-full bg-transparent bg-primary hover:(bg-quaternary text-accent) cursor-pointer transition text-secondary"
        >
          <div className="i-ri-arrow-left-line size-5"></div>
        </button>
      )}
      {panel === null && <Tools onClick={setPanel} />}
      {panel === "shadows" && <Shadows />}
      {panel === "colors" && <Colors />}
      {panel === "text" && <Texts />}
    </div>
  );
}
