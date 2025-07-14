import React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div
    style={{
      padding: "20px",
      textAlign: "center",
      color: "#d93025",
      backgroundColor: "#ffeaea",
      border: "1px solid #ffcdd2",
      borderRadius: "8px",
      margin: "20px",
    }}
  >
    <p>{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Retry
      </button>
    )}
  </div>
);
