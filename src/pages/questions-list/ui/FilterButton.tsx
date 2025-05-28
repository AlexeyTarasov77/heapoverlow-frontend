import clsx from "clsx";
import { ReactNode } from "react";

interface IFilterButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  isClicked: boolean;
}

export function FilterButton({
  children,
  isClicked: clicked = false,
  ...rest
}: IFilterButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "text-sm text-slate-500 transition-colors p-1",
        clicked ? "bg-blue-100 hover:bg-blue-200" : "hover:bg-slate-100",
      )}
    >
      {children}
    </button>
  );
}
