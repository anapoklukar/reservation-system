import React, { useState } from "react";
import { Modal } from "./modal";
import { Resource } from "../../types";
import { secondaryButtonStyle, dangerButtonStyle } from "../../styles/shared";
import { deleteResource } from "../../api/resources";

interface DeleteResourceModalProps {
  isOpen: boolean;
  resource: Resource | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeleteResourceModal: React.FC<DeleteResourceModalProps> = ({ isOpen, resource, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!resource) return;

    setIsLoading(true);
    try {
      await deleteResource(resource.id);
      onClose();
      onSuccess();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Resource" width="320px">
      <p style={{ fontSize: "0.95em", marginBottom: "1.5rem" }}>
        Are you sure you want to delete{" "}
        <strong
          title={resource?.name}
          style={{
            display: "inline-block",
            maxWidth: "200px",
            verticalAlign: "bottom",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {resource?.name}
        </strong>
        ?
      </p>

      <div style={{ textAlign: "right" }}>
        <button onClick={onClose} style={{ ...secondaryButtonStyle, marginRight: "8px" }} disabled={isLoading}>
          Cancel
        </button>
        <button onClick={handleDelete} style={dangerButtonStyle} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
};
