import type { Board } from "@penpot/plugin-types";
import type { Element } from "../functions/element.ts";
import { flexToClasses } from "./flex.ts";
import { gridToClasses } from "./grid.ts";

export function boardToElement(shape: Board): Element {
  const cls: string[] = [];

  if ("flex" in shape && shape.flex) {
    cls.push(...flexToClasses(shape.flex));
  }

  if ("grid" in shape && shape.grid) {
    cls.push(...gridToClasses(shape.grid));
  }

  return {
    tag: "div",
    classes: cls,
    children: [],
  };
}
