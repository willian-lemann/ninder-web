import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  textArea?: boolean;
}

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className={
        props.className ||
        "appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
      }
    />
  );
};
