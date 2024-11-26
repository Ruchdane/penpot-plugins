import type { PropsWithChildren } from "react";

type Props = {
  onClick: (s: string) => void;
};

export function Tools({ onClick }: Props) {
  return (
    <div className="grid-cols-2 grid">
      <Tool onClick={onClick} name="Shadows">
        <div className="i-ri-shadow-line size-8" />
      </Tool>
      <Tool onClick={onClick} name="Colors">
        <div className="i-ri-dropper-line size-8" />
      </Tool>
      <Tool onClick={onClick} name="Text">
        <div className="i-ri-text size-8" />
      </Tool>
    </div>
  );
}

export function Tool({
  name,
  onClick,
  children,
}: PropsWithChildren<{
  name: string;
  onClick: (s: string) => void;
}>) {
  return (
    <button
      className=" text-secondary hover:text-accent  cursor-pointer relative aspect-square grid place-items-center"
      onClick={() => onClick(name.toLowerCase())}
    >
      {children}
      <div className="absolute left-0 right-0 text-center bottom-2 body-s">
        {name}
      </div>
    </button>
  );
}
