import type { FlexLayout, GridLayout, Shape } from "@penpot/plugin-types";
import { directionalClass } from "../functions/values.ts";
import { withPrefix } from "../functions/string.ts";
import { filterStringOnly } from "../functions/array.ts";

export function flexToClasses(flex: FlexLayout): string[] {
  const cls: (string | null)[] = [];

  cls.push("flex");
  if (flex.dir !== "row") {
    cls.push("flex-" + flex.dir.replaceAll("column", "col"));
  }

  if (flex.wrap === "wrap") {
    cls.push("flex-wrap");
  }

  cls.push(...layoutClasses(flex));

  return filterStringOnly(cls);
}

export function layoutClasses(l: GridLayout | FlexLayout): (string | null)[] {
  const cls: (string | null)[] = ["grid"];

  // Spacing
  cls.push(
    ...directionalClass({
      prefix: "p",
      top: l.topPadding,
      bottom: l.bottomPadding,
      left: l.leftPadding,
      right: l.rightPadding,
    }),
  );
  cls.push(
    ...directionalClass({
      prefix: "gap-",
      top: l.rowGap,
      bottom: l.rowGap,
      left: l.columnGap,
      right: l.columnGap,
    }),
  );

  // Alignment
  cls.push(
    withPrefix("items-", l.alignItems?.replace("space-", ""), {
      ignored: "stretch",
    }),
  );
  cls.push(
    withPrefix("justify-", l.justifyContent?.replace("space-", ""), {
      ignored: "stretch",
    }),
  );
  cls.push(
    withPrefix("justify-items-", l.justifyItems?.replace("space-", ""), {
      ignored: "stretch",
    }),
  );
  cls.push(
    withPrefix("content-", l.alignContent?.replace("space-", ""), {
      ignored: "stretch",
    }),
  );
  return cls;
}

/**
 * Handle classes for flex layout children
 */
export function flexChildToClasses(shape: Shape): string[] {
  // The shape is not a flex children
  const parent = shape.parent;
  if (!parent || !("flex" in parent) || !parent.flex || !shape.layoutChild) {
    return [];
  }

  const cls: string[] = [];

  // The element has a specific alignement
  if (
    shape.layoutChild.alignSelf !== parent.flex.alignItems &&
    shape.layoutChild.alignSelf !== "auto"
  ) {
    cls.push("self-" + shape.layoutChild.alignSelf);
  }

  return cls;
}
