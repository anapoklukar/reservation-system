import React from "react";

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  "aria-label": string;
  title: string;
  variant?: "default" | "danger";
  size?: "sm" | "md";
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  "aria-label": ariaLabel,
  title,
  variant = "default",
  size = "md",
  disabled = false,
}) => {
  const baseStyles: React.CSSProperties = {
    background: "transparent",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    padding: size === "sm" ? "4px" : "6px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s ease",
    fontSize: size === "sm" ? "12px" : "13px",
    opacity: disabled ? 0.5 : 1,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      color: "#5f6368",
    },
    danger: {
      color: "#d93025",
    },
  };

  const hoverStyles: Record<string, string> = {
    default: "#e0e0e0",
    danger: "#f3f3f3",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = hoverStyles[variant];
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
      aria-label={ariaLabel}
      title={title}
    >
      {icon}
    </button>
  );
};
