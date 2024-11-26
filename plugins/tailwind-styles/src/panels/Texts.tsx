import { fontSize } from "tailwindcss/defaultTheme";
import type { PluginMessageEvent } from "../model.ts";

const sizes = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
] as const;

export function Texts() {
  const importSize = (key: keyof typeof fontSize) => {
    const [size, properties] = fontSize[key];
    window.parent.postMessage(
      {
        type: "add-typo",
        name: key,
        size: parseFloat(size) * 16,
        lineHeight: parseFloat(properties.lineHeight) * 16,
      } satisfies PluginMessageEvent,
      "*",
    );
  };

  return (
    <div>
      <div className="body-s text-secondary pl-[50px] pt-2">
        Click on the size you want to import in your local library
      </div>
      <div className="space-y-2 mt-2">
        {sizes.map((size) => (
          <div
            onClick={() => importSize(size)}
            className="w-full overflow-hidden text-secondary hover:text-accent transition cursor-pointer"
          >
            <div
              key={size}
              className="whitespace-nowrap"
              style={{ fontSize: fontSize[size][0] }}
            >
              {size} Lorem ipsum dolor amet
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
