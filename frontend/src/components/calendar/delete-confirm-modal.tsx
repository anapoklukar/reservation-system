import React from "react";
import { Reservation } from "../../types";

interface DeleteConfirmModalProps {
  reservation: Reservation;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ reservation, onConfirm, onCancel }) => (
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
  >
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        width: "320px",
        padding: "24px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <button
        onClick={onCancel}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          fontSize: "18px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Close"
      >
        ×
      </button>
      <h3 style={{ marginBottom: "1rem" }}>Delete Reservation</h3>
      <p style={{ fontSize: "0.95em", marginBottom: "1.5rem" }}>
        Are you sure you want to delete{" "}
        <strong
          title={reservation.title}
          style={{
            display: "inline-block",
            maxWidth: "200px",
            verticalAlign: "bottom",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {reservation.title}
        </strong>
        ?
      </p>
      <div style={{ textAlign: "right" }}>
        <button
          onClick={onCancel}
          style={{
            marginRight: "8px",
            padding: "6px 12px",
            backgroundColor: "#eee",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          style={{
            padding: "6px 14px",
            backgroundColor: "#d93025",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);
