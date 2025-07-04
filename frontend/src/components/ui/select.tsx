import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ label, error, options, placeholder, style, ...props }) => {
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
      <select
        {...props}
        style={{
          width: "100%",
          padding: "10px 12px",
          fontSize: "0.95em",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f1f3f4",
          height: "44px",
          boxSizing: "border-box",
          outline: "none",
          cursor: "pointer",
          borderColor: error ? "#d93025" : "#ccc",
          ...style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#1a73e8";
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? "#d93025" : "#ccc";
          props.onBlur?.(e);
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
