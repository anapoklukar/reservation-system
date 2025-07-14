import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  loading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "#1a73e8",
          color: "#fff",
          border: "none",
        };
      case "secondary":
        return {
          backgroundColor: "#eee",
          color: "#333",
          border: "none",
        };
      case "danger":
        return {
          backgroundColor: "#d93025",
          color: "#fff",
          border: "none",
        };
      default:
        return {
          backgroundColor: "#1a73e8",
          color: "#fff",
          border: "none",
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { padding: "4px 8px", fontSize: "0.85em" };
      case "medium":
        return { padding: "6px 14px", fontSize: "0.95em" };
      case "large":
        return { padding: "12px 24px", fontSize: "1em" };
      default:
        return { padding: "6px 14px", fontSize: "0.95em" };
    }
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      style={{
        ...getVariantStyles(),
        ...getSizeStyles(),
        borderRadius: "6px",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled || loading ? 0.6 : 1,
        transition: "all 0.2s ease",
        fontWeight: 500,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.opacity = "0.9";
          e.currentTarget.style.transform = "translateY(-1px)";
        }
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "translateY(0)";
        }
        props.onMouseLeave?.(e);
      }}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};
