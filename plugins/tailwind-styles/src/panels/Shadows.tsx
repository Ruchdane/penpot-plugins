import { clsx } from "clsx";
import { boxShadow as tailwindShadows } from "tailwindcss/defaultTheme";
import type { PluginMessageEvent } from "../model.ts";
import type { Shadow } from "@penpot/plugin-types";

const shadowNames = ["sm", "DEFAULT", "md", "lg", "xl", "inner"] as const;

export function Shadows() {
  const applyShadow = (name: keyof typeof tailwindShadows) => {
    window.parent.postMessage(
      {
        type: "shadows",
        shadows: tailwindShadows[name]
          .split(",")
          .map((s) => strToShadow(s.trim())),
      } satisfies PluginMessageEvent,
      "*",
    );
  };

  return (
    <div>
      <div className="body-s text-secondary pl-[50px] pt-2">
        Click on the shadow you want to apply to the selected element
      </div>
      <div className="grid grid-cols-2 gap-[1px] overflow-hidden">
        {shadowNames.map((name) => (
          <button
            onClick={() => applyShadow(name)}
            key={name}
            className="group cursor-pointer text-secondary aspect-square flex flex-col items-center justify-center gap-1 text-xs hover:text-accent hover:scale-120 transition"
          >
            <div>{name === "DEFAULT" ? "base" : name}</div>
            <div
              className={clsx(
                "group-hover:scale-120 w-[40px] h-[40px] bg-quaternary transition",
              )}
              style={{ boxShadow: tailwindShadows[name] }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function strToShadow(s: string): Shadow {
  const shadow: Shadow = {
    style: "drop-shadow",
  };
  if (s.includes("inset")) {
    shadow.style = "inner-shadow";
    s = s.replaceAll("inset ", "");
  }

  const parts = s.split(" ");
  const [x, y, blur, spread] = parts.map((s) => parseInt(s, 10)) as [
    number,
    number,
    number,
    number,
    string,
  ];
  shadow.blur = blur;
  shadow.offsetX = x;
  shadow.offsetY = y;
  shadow.spread = spread;
  shadow.color = {
    color: "#000",
    opacity: parseFloat(s.match(/\/\s*([^)]+)/)![1]),
  };
  return shadow;
}
