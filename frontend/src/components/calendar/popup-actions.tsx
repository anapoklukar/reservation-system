import React from "react";
import { IconButton } from "./icon-button";

interface PopupActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  editDisabled?: boolean;
  deleteDisabled?: boolean;
}

export const PopupActions: React.FC<PopupActionsProps> = ({
  onEdit,
  onDelete,
  onClose,
  editDisabled = false,
  deleteDisabled = false,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "6px",
        right: "6px",
        display: "flex",
        gap: "6px",
        alignItems: "center",
      }}
    >
      <IconButton onClick={onEdit} icon="✏️" aria-label="Edit" title="Edit" disabled={editDisabled} />

      <IconButton
        onClick={onDelete}
        icon="🗑️"
        aria-label="Delete"
        title="Delete"
        variant="danger"
        disabled={deleteDisabled}
      />

      <IconButton
        onClick={onClose}
        icon={<span style={{ fontSize: "14px", color: "#333" }}>×</span>}
        aria-label="Close"
        title="Close"
      />
    </div>
  );
};
