import clsx from "clsx";
import { MouseEventHandler, ReactNode } from "react";

export function Badge({
  children,
  color = "gray",
  size = "sm",
  onClick = undefined
}: {
  children: ReactNode;
  color?: "green" | "gray" | "blue";
  size?: "xs" | "sm" | "md";
  onClick?: MouseEventHandler<HTMLSpanElement>;
}) {
  const badgeClassName = clsx(
    {
      xs: "text-xs px-2",
      sm: "text-sm px-3",
      md: "text-md px-4"
    }[size],
    {
      green: "bg-green-50 text-green-600",
      gray: "bg-gray-100 text-gray-600",
      blue: "bg-blue-100 text-blue-600"
    }[color],
    onClick && "hover:cursor-pointer",
    "transition-colors rounded-md py-1 font-semibold"
  );
  return (
    <span className={badgeClassName} onClick={onClick}>
      {children}
    </span>
  );
}
