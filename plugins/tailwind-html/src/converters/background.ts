import { colorToTailwind, fillColor } from "../functions/color.ts";
import type { Gradient, Shape } from "@penpot/plugin-types";

export function backgroundToClasses(shape: Shape): string[] {
  const cls: string[] = [];
  if (
    shape.type === "text" ||
    shape.type === "svg-raw" ||
    shape.type === "path"
  ) {
    return cls;
  }

  if (!Array.isArray(shape.fills) || shape.fills.length === 0) {
    return cls;
  }
  const fill = shape.fills[0];

  // The background is a gradient
  if (fill.fillColorGradient) {
    cls.push("bg-gradient-to-" + gradientDirection(fill.fillColorGradient));
    const [start, end] = fill.fillColorGradient.stops;
    cls.push(`from-${colorToTailwind(start.color, start.opacity)}`);
    cls.push(`to-${colorToTailwind(end.color, end.opacity)}`);
    return cls;
  }

  const color = fillColor(shape.fills);
  if (color) {
    cls.push(`bg-${colorToTailwind(color.hex, color.opacity)}`);
  }
  return cls;
}

function gradientDirection(g: Gradient): string {
  let direction = "";
  if (!isClose(g.startY, g.endY)) {
    direction += g.endY > g.startY ? "b" : "t";
  }
  if (!isClose(g.startX, g.endX)) {
    direction += g.endX > g.startX ? "r" : "l";
  }
  return direction;
}

function isClose(a: number, b: number): boolean {
  return Math.abs(a - b) <= 0.2;
}
