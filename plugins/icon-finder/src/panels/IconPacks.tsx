import { packs } from "../config";

type Props = {
  onClick: (name: string) => void;
};

/**
 * Displays a list of icon packs
 */
export function IconPacks({ onClick }: Props) {
  return (
    <div className="divide-y divide-dashed divide-white/10">
      {packs.map((pack) => {
        const PreviewComponent = pack.preview;
        return (
          <div
            key={pack.name}
            className="relative bg-yell flex items-center gap-2 pack py-2"
          >
            <div className="w-full">
              <div
                className="cursor-pointer body-m text-primary pack-title hover:text-accent"
                onClick={() => onClick(pack.name)}
              >
                {pack.name}
              </div>
              <div className="body-s">
                License:{" "}
                <a
                  className="color-inherit hover:text-accent"
                  href={pack.license.url}
                >
                  {pack.license.name}
                </a>
              </div>
              <a
                className="body-s flex items-center gap-1 color-inherit hover:text-accent"
                href={pack.site}
              >
                Site <div className="i-ri-link" />
              </a>
            </div>
            <div className="grid grid-cols-3 gap-[2px] p-2 text-secondary">
              <PreviewComponent />
            </div>
          </div>
        );
      })}
    </div>
  );
}
