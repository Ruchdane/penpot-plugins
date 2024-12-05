import type { Color, Shadow, Shape } from "@penpot/plugin-types";
import { config } from "../config.ts";
import { colorToTailwind, isSameColor } from "../functions/color.ts";

/**
 * To recognize tailwind shadow, transform
 */
const tailwindShadows = Object.entries(config.theme.boxShadow).map(
  ([name, value]) => {
    return {
      name: name,
      key: value.replaceAll(" ", "_").split("_rgb")[0],
      color: {
        color: "#000000",
        opacity: parseFloat(value.match(/\/\D*([^)]+)/)?.[1] ?? "0"),
      },
    };
  },
);

/**
 * Try to match the generated class against tailwind shadows
 */
const matchTailwindShadow = (
  shadows: string[],
): null | { name: string; color: Color } => {
  let matched = null;
  for (const shadow of shadows) {
    const matchedShadow = tailwindShadows.find(
      (s) => s.key === shadow.split("_#")[0],
    );
    if (matchedShadow) {
      matched = matchedShadow;
    } else {
      // One shadow doesn't match, fallback to the arbitrary value
      return null;
    }
  }
  return matched;
};

/**
 * Generates shadow
 */
export function shadowToClasses(shape: Shape): string[] {
  if (!shape.shadows || shape.shadows.length === 0) {
    return [];
  }
  const arbitraryValues = shape.shadows.map(shadowToTailwind);
  const matchedShadow = matchTailwindShadow(arbitraryValues);
  if (matchedShadow && shape.shadows[0].color && sameColors(shape.shadows)) {
    const cls: string[] = [];
    cls.push(`shadow-${matchedShadow.name}`);
    // The shadow has a different color than tailwind
    if (!isSameColor(shape.shadows[0].color, matchedShadow.color)) {
      cls.push(
        `shadow-${colorToTailwind(shape.shadows[0].color.color, shape.shadows[0].color.opacity)}`,
      );
    }
    return cls;
  }
  return [`shadow-[${arbitraryValues.join(",")}]`];
}

/**
 * Convert shadow into the arbitrary value
 */
function shadowToTailwind(s: Shadow) {
  return `${s.offsetX ?? 0}px_${s.offsetY ?? 0}px_${s.blur ?? 0}px_${s.spread ?? 0}px_${s.color?.color ?? "#000000"}${opacityToHex(s.color?.opacity ?? 1)}`.replaceAll(
    "0px",
    "0",
  );
}

/**
 * Convert an opacity between 0 and 1 into the hex version
 */
function opacityToHex(a: number): string {
  if (a === 1 || a < 0) {
    return "";
  }
  const opacityInt = Math.round(a * 255);
  const hex = opacityInt.toString(16).toUpperCase();
  return hex.length === 1 ? "0" + hex : hex;
}

/**
 * Check that all shadows have the same color
 */
function sameColors(shadows: Shadow[]): boolean {
  const color = shadows[0].color;
  for (const shadow of shadows) {
    if (
      !color ||
      !shadow.color ||
      shadow.color.color !== color.color ||
      shadow.color.opacity !== color.opacity
    ) {
      return false;
    }
  }
  return true;
}
