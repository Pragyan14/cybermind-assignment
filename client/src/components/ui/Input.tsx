import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

function Input({ className = "", type = "text", ...rest }: InputProps) {
  const min = type === "date" ? new Date().toISOString().split("T")[0] : undefined;

  return (
    <input
      type={type}
      min={min}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AAFF] focus:border-transparent placeholder:text-gray-400 text-sm ${className}`}
      {...rest}
      required={true}
    />
  );
}

export default Input;
