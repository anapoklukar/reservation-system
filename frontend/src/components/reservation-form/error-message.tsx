import React from "react";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage = ({ message, className = "" }: ErrorMessageProps) => {
  return (
    <div
      className={`text-red-600 text-sm mb-4 ${className}`}
      style={{
        color: "#d93025",
        marginBottom: "1rem",
        fontSize: "0.85em",
      }}
    >
      {message}
    </div>
  );
};
