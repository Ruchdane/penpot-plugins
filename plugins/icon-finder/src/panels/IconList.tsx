import type { IconPack } from "../config.tsx";
import { type FC, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { useToggle } from "@libs/hooks";
import { renderToString } from "react-dom/server";
import type { PluginMessageEvent } from "../model.ts";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  pack: IconPack;
  onBack: () => void;
};

export function IconList({ pack, onBack }: Props) {
  const [search, setSearch] = useState("");
  const [icons, setIcons] = useState(
    null as null | Record<string, FC<{ size: number }>>,
  );
  const [filled, toggleFilled] = useToggle(false);
  let iconProps = {};
  if (typeof pack.filled === "object" && filled) {
    iconProps = pack.filled;
  }

  useEffect(() => {
    pack.loader().then(setIcons);
  }, []);

  const items = useMemo(() => {
    if (!icons) {
      return null;
    }
    return Object.keys(icons)
      .filter((name) =>
        pack.filled && typeof pack.filled === "function"
          ? pack.filled(name) === filled
          : true,
      )
      .filter(searchFilter(search))
      .map((name) => ({
        title: kebabize(name),
        Icon: icons[name],
      }));
  }, [icons, search, filled]);

  const onSelect = (item: { title: string; Icon: FC<{ size: number }> }) => {
    window.parent.postMessage(
      {
        type: "create-svg",
        title: item.title,
        content: renderToString(<item.Icon size={24} />),
      } satisfies PluginMessageEvent,
      "*",
    );
  };

  return (
    <div>
      <header className="py-2 sticky top-0 flex items-center gap-1">
        <button
          onClick={onBack}
          className="p-2  rounded-full bg-transparent bg-primary hover:(bg-quaternary text-accent) cursor-pointer transition text-secondary"
        >
          <div className="i-ri-arrow-left-line size-5"></div>
        </button>
        <input
          type="text"
          className="input w-full border-red border-1 sticky top-0"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        {pack.filled && (
          <button
            onClick={toggleFilled}
            className="p-2 rounded-full bg-transparent bg-primary hover:(bg-quaternary text-accent) cursor-pointer transition text-secondary"
          >
            <div
              className={clsx(
                "size-5",
                filled ? "i-ri-bubble-chart-fill" : "i-ri-bubble-chart-line",
              )}
            ></div>
          </button>
        )}
      </header>
      {items ? (
        <main
          className="grid icons gap-1 p-1"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(24px, 1fr))",
          }}
        >
          {items.map((item) => {
            return (
              <button
                key={item.title}
                className="p-0 bg-transparent text-primary hover:(text-accent) cursor-pointer"
                title={item.title}
                onClick={() => onSelect(item)}
              >
                <ErrorBoundary
                  onError={() => console.log(`Cannot render ${item.title}`)}
                  fallback={<></>}
                >
                  <item.Icon size={20} {...iconProps} />
                </ErrorBoundary>
              </button>
            );
          })}
        </main>
      ) : (
        <main className="flex p-4 justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </main>
      )}
    </div>
  );
}

const searchFilter = (search: string) => (name: string) => {
  if (!search) {
    return true;
  }

  const words = search.toLowerCase().split(" ");

  return (
    words.filter((w) => name.toLowerCase().includes(w)).length === words.length
  );
};

function kebabize(str: string): string {
  // Handle empty string
  if (!str) return "";

  return (
    str
      // Insert hyphen between lowercase and uppercase letters
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      // Convert all characters to lowercase
      .toLowerCase()
  );
}
