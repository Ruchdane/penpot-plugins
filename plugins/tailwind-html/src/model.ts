export type PluginMessageEvent =
  | {
      type: "html";
      content: string;
    }
  | {
      type: "theme";
      content: string;
    }
  | {
      type: "copy";
      content: string;
    }
  | {
      type: "ready";
    };
