import type { Shadow } from "@penpot/plugin-types";

export type PluginMessageEvent =
  | {
      type: "shadows";
      shadows: Shadow[];
    }
  | {
      type: "add-color";
      name: string;
      color: string;
    }
  | {
      type: "add-typo";
      size: number;
      name: string;
      lineHeight: number;
    }
  | {
      type: "theme";
      content: string;
    };
