import React from "react";

const baseInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "0.95em",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#f1f3f4",
  height: "44px",
  boxSizing: "border-box",
  outline: "none",
  transition: "border-color 0.2s ease",
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style, ...props }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "4px",
            fontSize: "0.9em",
            color: "#333",
            fontWeight: 500,
          }}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          ...baseInputStyle,
          ...style,
          borderColor: error ? "#d93025" : "#ccc",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#1a73e8";
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? "#d93025" : "#ccc";
          props.onBlur?.(e);
        }}
      />
      {error && (
        <div
          style={{
            color: "#d93025",
            fontSize: "0.85em",
            marginTop: "4px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};
