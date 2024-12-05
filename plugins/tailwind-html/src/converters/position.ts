import type { Shape } from "@penpot/plugin-types";
import { objectGet } from "../functions/object.ts";
import { directionalClass } from "../functions/values.ts";

export function positionToClasses(
  shape: Shape,
  forceFixed: boolean = false,
): string[] {
  const cls: string[] = [];
  let isAbsolute = false;

  // Handle absolute positioning inside a flex or grid
  if (isShapeAbsolute(shape)) {
    isAbsolute = true;
    cls.push("absolute");
  }

  // If one child is absolute, this element should be relative
  if (
    !isAbsolute &&
    (isShapeRelative(shape) ||
      ("children" in shape && shape.children.find((c) => isShapeAbsolute(c))))
  ) {
    cls.push("relative");
  }

  // Compute position for absolute positioning
  if (isAbsolute) {
    if (
      shape.constraintsVertical === null ||
      shape.constraintsVertical === "top" ||
      shape.constraintsVertical === "topbottom"
    ) {
      cls.push(`top-[${Math.round(shape.parentY)}px]`);
    }
    if (
      shape.constraintsVertical === "bottom" ||
      shape.constraintsVertical === "topbottom"
    ) {
      cls.push(
        `bottom-[${Math.round(shape.parent!.height - shape.parentY - shape.height)}px]`,
      );
    }
    if (
      shape.constraintsHorizontal === null ||
      shape.constraintsHorizontal === "left" ||
      shape.constraintsHorizontal === "leftright"
    ) {
      cls.push(`left-[${Math.round(shape.parentX)}px]`);
    }
    if (
      shape.constraintsHorizontal === "right" ||
      shape.constraintsHorizontal === "leftright"
    ) {
      cls.push(
        `right-[${Math.round(shape.parent!.width - shape.parentX - shape.width)}px]`,
      );
    }
  }

  // Compute width / height
  cls.push(...sizeToClasses(shape, forceFixed));

  return cls;
}

function sizeToClasses(shape: Shape, forceFixed: boolean): string[] {
  const cls: string[] = [];

  if (shape.layoutChild) {
    cls.push(
      ...directionalClass({
        prefix: "m",
        top: shape.layoutChild.topMargin,
        bottom: shape.layoutChild.bottomMargin,
        left: shape.layoutChild.leftMargin,
        right: shape.layoutChild.rightMargin,
      }),
    );
  }

  // Auto-growing texts has no width / height
  if (
    objectGet(shape, "growType") === "auto-width" ||
    objectGet(shape, "growType") === "auto-height"
  ) {
    return cls;
  }

  let width = `[${Math.round(shape.width)}px]`;
  let height = `[${Math.round(shape.height)}px]`;

  if (!forceFixed && objectGet(shape, "horizontalSizing") === "auto") {
    width = `max`;
  }
  if (!forceFixed && objectGet(shape, "verticalSizing") === "auto") {
    height = `max`;
  }

  if (
    !forceFixed &&
    objectGet(shape.layoutChild, "horizontalSizing") === "fill"
  ) {
    width = "full";
  }

  if (
    !forceFixed &&
    objectGet(shape.layoutChild, "verticalSizing") === "fill"
  ) {
    height = "full";
  }

  if (width === height) {
    cls.push(`size-${width}`);
  } else {
    cls.push(`w-${width}`);
    cls.push(`h-${height}`);
  }
  return cls;
}

function isShapeRelative(shape?: Shape | null): boolean {
  if (!shape) {
    return false;
  }
  if (shape && shape.type === "group") {
    return true;
  }
  if (shape && !objectGet(shape, "flex") && !objectGet(shape, "grid")) {
    return true;
  }
  return false;
}

function isShapeAbsolute(shape: Shape): boolean {
  if (isShapeRelative(shape.parent)) {
    return true;
  }
  return Boolean(
    ("layoutCell" in shape && shape.layoutCell?.absolute) ||
      ("layoutChild" in shape && shape.layoutChild?.absolute),
  );
}
