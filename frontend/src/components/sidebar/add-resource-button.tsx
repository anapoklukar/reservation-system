import React from "react";

interface AddButtonProps {
  onClick: () => void;
}

export const AddCircleButton: React.FC<AddButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Add Resource"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: isHovered ? "#e0e0e0" : "#f1f3f4",
        color: "#3c4043",
        fontSize: "20px",
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: isHovered ? "0 3px 6px rgba(0, 0, 0, 0.15)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      +
    </button>
  );
};
