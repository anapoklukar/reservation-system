import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, width = "340px" }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          width,
          padding: "24px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
          position: "relative",
          fontFamily: "sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            fontSize: "18px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#666",
          }}
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 style={{ marginBottom: "1rem", color: "#333" }}>{title}</h2>
        {children}
      </div>
    </div>
  );
};
