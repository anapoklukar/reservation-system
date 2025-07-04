import React from "react";

interface ReserveButtonProps {
  onClick: () => void;
}

export const ReserveButton: React.FC<ReserveButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
      <button
        onClick={onClick}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "12px 24px",
          border: "none",
          borderRadius: "24px",
          backgroundColor: isHovered ? "#e0e0e0" : "#f1f3f4",
          color: "#3c4043",
          fontWeight: 600,
          fontSize: "15px",
          cursor: "pointer",
          boxShadow: isHovered ? "0 3px 6px rgba(0, 0, 0, 0.15)" : "0 2px 4px rgba(0,0,0,0.1)",
          transition: "background-color 0.2s ease, box-shadow 0.2s ease",
          minWidth: "160px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span style={{ fontSize: "18px" }}>＋</span>
        Reserve
      </button>
    </div>
  );
};
