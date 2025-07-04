import { CSSProperties } from "react";

export const inputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "0.95em",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#f1f3f4",
  height: "44px",
  boxSizing: "border-box",
};

export const modalOverlayStyle: CSSProperties = {
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
};

export const modalContentStyle: CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
  position: "relative",
  fontFamily: "sans-serif",
};

export const closeButtonStyle: CSSProperties = {
  position: "absolute",
  top: "12px",
  right: "12px",
  fontSize: "18px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

export const primaryButtonStyle: CSSProperties = {
  padding: "6px 14px",
  backgroundColor: "#1a73e8",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export const secondaryButtonStyle: CSSProperties = {
  padding: "6px 12px",
  backgroundColor: "#eee",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export const dangerButtonStyle: CSSProperties = {
  padding: "6px 14px",
  backgroundColor: "#d93025",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
