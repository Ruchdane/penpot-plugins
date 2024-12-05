import type { PluginMessageEvent } from "./model";
import { shapeToHTML } from "./functions/converter";

penpot.ui.open(
  "Tailwind generator",
  `/penpot-plugins/tailwind-html/?theme=${penpot.theme}`,
  {
    width: 250,
    height: 350,
  },
);

penpot.on("themechange", (theme) => {
  sendMessage({ type: "theme", content: theme });
});

penpot.on("selectionchange", () => {
  if (!penpot.selection[0]) {
    return;
  }
  sendMessage({ type: "html", content: shapeToHTML(penpot.selection[0]) });
});

penpot.ui.onMessage((event: PluginMessageEvent) => {
  if (event.type === "ready" && penpot.selection.length > 0) {
    sendMessage({ type: "html", content: shapeToHTML(penpot.selection[0]) });
  }
  if (event.type === "copy") {
    if (!navigator.clipboard) {
      alert("Clipboard API not supported");
      return;
    }

    // Write the HTML content to clipboard
    navigator.clipboard.writeText(event.content).catch((err) => {
      alert(`Failed to copy: ${err}`);
    });
  }
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}
