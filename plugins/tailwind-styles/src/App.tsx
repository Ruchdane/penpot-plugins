import { Tools } from "./panels/Tools.tsx";
import { Wrapper } from "@libs/ui";
import { Shadows } from "./panels/Shadows.tsx";
import { Colors } from "./panels/Colors.tsx";
import { Texts } from "./panels/Texts.tsx";
import { useState } from "react";

export function App() {
  const [panel, setPanel] = useState<null | string>(null);
  return (
    <Wrapper>
      {panel !== null && (
        <button
          onClick={() => setPanel(null)}
          className="absolute top-1 left-1 p-2  rounded-full bg-primary hover:(bg-quaternary text-accent) cursor-pointer transition text-secondary"
        >
          <div className="i-ri-arrow-left-line size-5"></div>
        </button>
      )}
      {panel === null && <Tools onClick={setPanel} />}
      {panel === "shadows" && <Shadows />}
      {panel === "colors" && <Colors />}
      {panel === "text" && <Texts />}
    </Wrapper>
  );
}
