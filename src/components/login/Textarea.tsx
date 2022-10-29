import { classNames } from "@utils/classNames";
import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | null;
}

export const Textarea = ({ error, label, value, ...props }: TextareaProps) => {
  return (
    <div>
      <label htmlFor={label} className="text-sm text-zinc-500">
        {label}
      </label>
      <textarea
        {...props}
        className={classNames(
          error ? "border-red-600 placeholder:text-red-600" : "",
          "rounded-md appearance-none resize-y h-20 relative block w-full px-3 py-2 rounded-b-md border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
        )}
      />
    </div>
  );
};
