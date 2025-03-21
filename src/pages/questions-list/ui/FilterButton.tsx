import clsx from "clsx";
import { ReactNode } from "react";

interface IFilterButtonProps {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isClicked: boolean;
}

export function FilterButton({
  children,
  onClick,
  isClicked: clicked = false,
}: IFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "text-sm text-slate-500 transition-colors p-1",
        clicked ? "bg-blue-100 hover:bg-blue-200" : "hover:bg-slate-100",
      )}
    >
      {children}
    </button>
  );
}
