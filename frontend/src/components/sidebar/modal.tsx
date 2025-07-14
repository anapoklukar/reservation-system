import React from "react";
import { modalOverlayStyle, modalContentStyle, closeButtonStyle } from "../../styles/shared";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export const Modal = ({ isOpen, onClose, title, children, width = "340px" }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={{ ...modalContentStyle, width }}>
        <button onClick={onClose} style={closeButtonStyle} aria-label="Close">
          ×
        </button>
        <h2 style={{ marginBottom: "1rem" }}>{title}</h2>
        {children}
      </div>
    </div>
  );
};
