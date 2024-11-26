import { IconPacks } from "./panels/IconPacks.tsx";
import { packs } from "./config.tsx";
import { IconList } from "./panels/IconList.tsx";
import { useState } from "react";
import { Wrapper } from "@libs/ui";

export function App() {
  const [packName, setPackName] = useState("");
  const iconPack = packs.find((p) => p.name === packName);

  return (
    <Wrapper>
      {iconPack ? (
        <IconList pack={iconPack} onBack={() => setPackName("")} />
      ) : (
        <IconPacks onClick={setPackName} />
      )}
    </Wrapper>
  );
}
