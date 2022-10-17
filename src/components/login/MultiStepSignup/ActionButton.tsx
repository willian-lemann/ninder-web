import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const ActionButton = ({ label, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="border-none w-auto h-[35px] bg-primary text-white hover:brightness-90 transition-all duration-300 rounded-md px-4"
    >
      {label}
    </button>
  );
};
