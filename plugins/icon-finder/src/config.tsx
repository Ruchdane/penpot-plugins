import type {FC, ReactNode} from "react";
import {BootstrapPreview, BoxPreview, FeatherPreview, HeroPreview, RemixPreview} from "./components/Previews.tsx";

export type IconComponent = FC<{ size: number }>;

export type IconPack = {
  name: string;
  filled?: (name: string) => boolean; // This font has a filled variation for icons
  loader: () => Promise<Record<string, IconComponent>>;
  preview: () => ReactNode;
  license: { name: string; url: string };
  site: string;
};

export const packs = [
  {
    name: "Remix icons",
    filled: (name) => name.includes("Fill"),
    loader: () =>
      // @ts-expect-error
      import("react-icons/ri") as Promise<Record<string, IconComponent>>,
    license: { name: "Apache", url: "https://remixicon.com/license" },
    site: "https://remixicon.com/",
    preview: RemixPreview,
  },
  {
    name: "Bootstrap",
    filled: (name) => name.includes("Fill"),
    loader: () =>
      // @ts-expect-error
      import("react-icons/bs") as Promise<Record<string, IconComponent>>,
    license: {
      name: "MIT",
      url: "https://github.com/twbs/icons/blob/main/LICENSE",
    },
    site: "https://icons.getbootstrap.com/",
    preview: BootstrapPreview,
  },
  {
    name: "Hero Icons",
    filled: (name) => !name.includes("HiOutline"),
    loader: () =>
      // @ts-expect-error
      import("react-icons/hi2") as Promise<Record<string, IconComponent>>,
    license: {
      name: "MIT",
      url: "https://github.com/tailwindlabs/heroicons/blob/master/LICENSE",
    },
    site: "https://heroicons.com/",
    preview: HeroPreview,
  },
  {
    name: "Feather Icons",
    loader: () =>
      // @ts-expect-error
      import("react-icons/fi") as Promise<Record<string, IconComponent>>,
    license: {
      name: "MIT",
      url: "https://github.com/feathericons/feather/blob/main/LICENSE",
    },
    site: "https://feathericons.com/",
    preview: FeatherPreview,
  },
  {
    name: "Box Icons",
    loader: () =>
      // @ts-expect-error
      import("react-icons/bi") as Promise<Record<string, IconComponent>>,
    license: {
      name: "MIT",
      url: "https://github.com/atisawd/boxicons/blob/master/LICENSE",
    },
    site: "https://github.com/atisawd/boxicons/",
    preview: BoxPreview,
  },
] satisfies IconPack[];
