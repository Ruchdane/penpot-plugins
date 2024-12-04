import type { GridLayout, Shape, Track } from "@penpot/plugin-types";
import { filterStringOnly } from "../functions/array.ts";
import { layoutClasses } from "./flex.ts";

export function gridToClasses(grid: GridLayout): string[] {
  const cls: (string | null)[] = ["grid"];
  cls.push(`grid-cols-${tracksToTailwind(grid.columns)}`);
  cls.push(`grid-rows-${tracksToTailwind(grid.rows)}`);
  cls.push(...layoutClasses(grid));
  return filterStringOnly(cls);
}

function tracksToTailwind(tracks: Track[]): string {
  if (!tracks.find((t) => t.type !== "flex" || t.value !== 1)) {
    return tracks.length.toString();
  }
  const suffix = (t: Track) => {
    if (t.type === "flex") {
      return "fr";
    }
    if (t.type === "percent") {
      return "%";
    }
    return "px";
  };
  return `[${tracks.map((t) => `${t.value}${suffix(t)}`).join("_")}]`;
}

/**
 * Handle classes for flex layout children
 */
export function gridChildToClasses(shape: Shape): string[] {
  // The shape is not a flex children
  const parent = shape.parent;
  if (!parent || !("grid" in parent) || !parent.grid || !shape.layoutCell) {
    return [];
  }

  const cls: string[] = [];

  // The element has a specific alignement
  if (
    shape.layoutCell.alignSelf !== parent.grid.alignItems &&
    shape.layoutCell.alignSelf !== "auto"
  ) {
    cls.push("self-" + shape.layoutCell.alignSelf);
  }

  if (
    // @ts-expect-error typing is incorrect for layoutCell
    shape.layoutCell.justifySelf !== parent.grid.justifyItems &&
    // @ts-expect-error typing is incorrect for layoutCell
    shape.layoutCell.justifySelf !== "auto"
  ) {
    // @ts-expect-error typing is incorrect for layoutCell
    cls.push("justify-self-" + shape.layoutCell.justifySelf);
  }

  return cls;
}
