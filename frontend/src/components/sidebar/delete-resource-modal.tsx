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

export const DeleteResourceModal = ({ isOpen, resource, onClose, onSuccess }: DeleteResourceModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!resource) return;

    setIsLoading(true);
    setError("");
    try {
      await deleteResource(resource.id);
      onClose();
      onSuccess();
    } catch {
      setError("Failed to delete resource. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Delete Resource" width="320px">
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

      {error && <div style={{ color: "red", marginBottom: "1rem", fontSize: "0.85em" }}>{error}</div>}

      <div style={{ textAlign: "right" }}>
        <button onClick={handleClose} style={{ ...secondaryButtonStyle, marginRight: "8px" }} disabled={isLoading}>
          Cancel
        </button>
        <button onClick={handleDelete} style={dangerButtonStyle} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
};
