import { classNames } from "@utils/classNames";
import { SelectHTMLAttributes } from "react";

interface Options {
  label: string;
  value: number | string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string | null;
  label?: string;
  options: Options[];
  loading?: boolean;
}

export const Select = ({
  label,
  error,
  options,
  className,
  loading,
  ...props
}: SelectProps) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {label}
      </label>

      <div
        className={classNames(
          "rounded-lg relative after:content-['▼'] after:absolute after:top-[10px] after:right-[10px] after:text-zinc-400"
        )}
      >
        <select
          {...props}
          disabled={loading}
          className={classNames(
            className ? className : "",
            error ? "border-red-600 text-red-600" : "",
            loading ? "text-zinc-400" : "",
            "border outline-none appearance-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          )}
        >
          {loading ? (
            <option>loading...</option>
          ) : (
            <>
              <option value={0} selected>
                Select an option
              </option>

              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
    </div>
  );
};
