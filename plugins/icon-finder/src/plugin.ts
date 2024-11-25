import type { PluginMessageEvent } from "./model";
import type { Board, Group, Boolean } from "@penpot/plugin-types";

penpot.ui.open("Icons", `/penpot-plugins/icon-finder/?theme=${penpot.theme}`, {
  width: 250,
  height: 350,
});

penpot.on("themechange", (theme) => {
  sendMessage({ type: "theme", content: theme });
});

penpot.ui.onMessage((message: PluginMessageEvent) => {
  console.log("onMessage", message);
  if (message.type === "create-svg") {
    const g = penpot.createShapeFromSvg(message.content);
    if (!g) {
      return;
    }
    g.name = message.title;

    // Append the icon to the current selected group
    const selection = penpot.selection[0];
    let parent = null as null | Group | Board | Boolean;
    if (selection && "children" in selection) {
      parent = selection;
    } else if (
      selection &&
      selection.parent &&
      "children" in selection.parent
    ) {
      parent = selection.parent;
    }

    // Try to guess the color to apply to the shapes
    if (parent) {
      const color = penpot.shapesColors([parent]).at(-1);
      if (color) {
        g.children
          .filter((p) => p.name.includes("path"))
          .forEach((p) => (p.fills = [{ fillColor: color.color }]));
      }
      parent.appendChild(g);
    }
    const center = penpot.viewport.center;
    g.boardX = center.x;
    g.boardY = center.y;

    // Select the newly added icon
    penpot.selection = [g];
  }
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}
