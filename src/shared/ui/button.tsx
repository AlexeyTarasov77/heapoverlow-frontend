import clsx from "clsx";

export function Button({
  className,
  children,
  size = "md",
  variant = "primary",
}: {
  className?: string;
  children: any;
  size?: "md" | "lg";
  variant?: "primary" | "outline";
}) {
    const buttonClassName = clsx(
        "transition-colors", 
        className,
        {
            md: "rounded px-6 py-2 leading-tight text-sm",
            lg: "rounded-lg px-5 py-2 leading-tight text-2xl",
        }[size],
        {
            primary: "bg-blue-200 hover:bg-blue-300 text-black",
            outline: "border border-blue-300 text-blue-400 hover:bg-blue-100",
        }[variant]
    );
    return (
        <button className={buttonClassName}>{children}</button>
    )
}
