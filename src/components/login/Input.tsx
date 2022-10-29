import { classNames } from "@utils/classNames";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  textArea?: boolean;
  error?: string | null;
  label?: string;
}

export const Input = ({ className, error, label, ...props }: InputProps) => {
  const classname =
    className ||
    "appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm";

  return (
    <div>
      {label ? (
        <label htmlFor={label} className="text-sm text-zinc-500">
          {label}
        </label>
      ) : null}

      <input
        {...props}
        className={classNames(
          error ? "border-red-600 placeholder:text-red-600" : "",
          classname
        )}
      />
    </div>
  );
};
