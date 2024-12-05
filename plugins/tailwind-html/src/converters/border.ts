import type { Stroke } from "@penpot/plugin-types";
import { colorToTailwind } from "../functions/color.ts";

export function borderToClasses(stroke?: Stroke): string[] {
  const cls: string[] = [];

  if (!stroke) {
    return cls;
  }

  const prefix = stroke.strokeAlignment === "inner" ? "border" : "outline";
  cls.push(`${prefix}-${stroke.strokeWidth}`);
  cls.push(
    `${prefix}-${colorToTailwind(stroke.strokeColor, stroke.strokeOpacity)}`,
  );
  if (stroke.strokeStyle !== "solid") {
    cls.push(`${prefix}-${stroke.strokeStyle}`);
  }
  return cls;
}
