import type { Shape } from "@penpot/plugin-types";
import { config } from "../config.ts";

/**
 * Compute known values
 */
const radiusDict = new Map(
  Object.entries(config.theme.borderRadius).map(([name, value]) => {
    return [(parseFloat(value) * 16).toFixed(0), name];
  }),
);
const valueToTailwind = (value: number, prefix: string) => {
  const valueAsStr = Math.round(value).toFixed(0);
  if (radiusDict.has(valueAsStr)) {
    const name = radiusDict.get(valueAsStr);
    if (name === "DEFAULT") {
      return prefix;
    }
    return `${prefix}-${name}`;
  }
  return `${prefix}-[${value}px]`;
};

/**
 * Generates border radius classes
 */
export function radiusToClasses(shape: Shape): string[] {
  // There is no radius
  if (
    !shape.borderRadius &&
    !shape.borderRadiusTopLeft &&
    !shape.borderRadiusTopRight &&
    !shape.borderRadiusBottomRight &&
    !shape.borderRadiusBottomLeft
  ) {
    return [];
  }

  if (shape.borderRadius >= shape.width) {
    return ["rounded-full"];
  }

  // Same border radius on each side
  if (shape.borderRadius) {
    return [valueToTailwind(shape.borderRadius, "rounded")];
  }

  const cls: string[] = [];
  if (shape.borderRadiusTopRight) {
    cls.push(valueToTailwind(shape.borderRadiusTopRight, "rounded-tr"));
  }

  if (shape.borderRadiusTopLeft) {
    cls.push(valueToTailwind(shape.borderRadiusTopLeft, "rounded-tl"));
  }

  if (shape.borderRadiusBottomLeft) {
    cls.push(valueToTailwind(shape.borderRadiusBottomLeft, "rounded-bl"));
  }

  if (shape.borderRadiusBottomRight) {
    cls.push(valueToTailwind(shape.borderRadiusBottomRight, "rounded-br"));
  }

  return cls;
}
