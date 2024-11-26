import type { PluginMessageEvent } from "./model";

penpot.ui.open(
  "Tailwind Styles",
  `/penpot-plugins/tailwind-styles/?theme=${penpot.theme}`,
  {
    width: 250,
    height: 350,
  },
);

penpot.on("themechange", (theme) => {
  sendMessage({ type: "theme", content: theme });
});

penpot.ui.onMessage((message: PluginMessageEvent) => {
  if (message.type === "shadows") {
    for (const shape of penpot.selection) {
      shape.shadows = message.shadows;
    }
  }
  if (message.type === "add-color") {
    const color = penpot.library.local.createColor();
    color.color = message.color;
    color.name = message.name;
  }
  if (message.type === "add-typo") {
    const typo = penpot.library.local.createTypography();
    typo.fontFamily = "Inter";
    typo.fontId = "gfont-inter";
    typo.fontSize = message.size.toString();
    typo.name = message.name;
    typo.lineHeight = message.lineHeight.toString();
  }
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}
