import tailwindColors from "tailwindcss/colors";
import type { PluginMessageEvent } from "../model.ts";

const twColors = tailwindColors as any as Record<
  string,
  Record<string, string>
>;

export function Colors() {
  const colorList = Object.keys(twColors).filter(
    (c) => typeof twColors[c] === "object",
  );

  const importColors = (c: string) => {
    for (const key in twColors[c]) {
      window.parent.postMessage(
        {
          type: "add-color",
          name: `${c}-${key}`,
          color: twColors[c][key],
        } satisfies PluginMessageEvent,
        "*",
      );
    }
  };

  return (
    <div>
      <div className="body-s text-secondary pl-[50px] pt-2">
        Click on the color you want to import in your local library
      </div>
      <div className="space-y-3 body-s">
        {colorList.map((c) => (
          <div className="space-y-1">
            <div
              className="text-secondary hover:text-accent cursor-pointer transition"
              onClick={() => importColors(c)}
            >
              {c}
            </div>
            <ColorPalette
              name={c}
              colors={twColors[c] as Record<string, string>}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ColorPalette({
  name,
  colors,
}: {
  name: string;
  colors: Record<string, string>;
}) {
  const importColor = (key: string, color: string) => {
    window.parent.postMessage(
      {
        type: "add-color",
        name: `${name}-${key}`,
        color: color,
      } satisfies PluginMessageEvent,
      "*",
    );
  };
  const keys = Object.keys(colors);
  return (
    <div className="flex w-full gap-1">
      {keys.map((key) => (
        <button
          onClick={() => importColor(key, colors[key])}
          key={key}
          className=" cursor-pointer w-full body-xs transition hover:scale-130"
        >
          <div
            className="aspect-[50/40] w-full rounded-sm"
            style={{ backgroundColor: colors[key] }}
          ></div>
        </button>
      ))}
    </div>
  );
}
