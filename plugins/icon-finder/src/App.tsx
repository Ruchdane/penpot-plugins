import { IconPacks } from "./panels/IconPacks.tsx";
import { packs } from "./config.tsx";
import { IconList } from "./panels/IconList.tsx";
import { useState } from "react";

function App() {
  const url = new URL(window.location.href);
  const [packName, setPackName] = useState("");
  const iconPack = packs.find((p) => p.name === packName);

  return (
    <div data-theme={url.searchParams.get("theme") ?? "dark"}>
      {iconPack ? (
        <IconList pack={iconPack} onBack={() => setPackName("")} />
      ) : (
        <IconPacks onClick={setPackName} />
      )}
    </div>
  );
}

export default App;
