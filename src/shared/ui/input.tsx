import clsx from "clsx";

export function Input({
  errMsg,
  required = true,
  className,
  labelText,
  ...inputProps
}: {
  errMsg?: string;
  required?: boolean;
  className?: string;
  labelText: string
}) {
  return (
    <div className={clsx("mx-auto max-w-xs", className)}>
      <div>
        <label
          className={clsx(
            "mb-1 block text-sm font-medium text-gray-700",
            required && "after:ml-0.5 after:text-red-500 after:content-['*']"
          )}
        >
          {labelText}
        </label>
        <input
          required={required}
          className={clsx(
            `block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50
            disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`,
            errMsg
              ? ["border-red-300", "focus:border-red-300", "focus:ring-red-200"]
              : [
                  "border-gray-300",
                  "focus:border-primary-400",
                  "focus:ring-primary-200"
                ]
          )}
          {...inputProps}
        />
        {errMsg && <p className="mt-1 text-sm text-red-500">{errMsg}</p>}
      </div>
    </div>
  );
}
