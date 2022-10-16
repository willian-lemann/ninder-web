import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const ActionButton = ({ label, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="border-none w-auto h-[40px] bg-transparent hover:bg-primary hover:text-white transition-colors duration-300 rounded-md px-4"
    >
      {label}
    </button>
  );
};
