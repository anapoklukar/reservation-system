import React, { useState, useEffect } from "react";
import { Modal } from "./modal";
import { Resource } from "../../types";
import { inputStyle, primaryButtonStyle, secondaryButtonStyle } from "../../styles/shared";
import { updateResource } from "../../api/resources";

interface EditResourceModalProps {
  isOpen: boolean;
  resource: Resource | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditResourceModal: React.FC<EditResourceModalProps> = ({
  isOpen,
  resource,
  onClose,
  onSuccess,
}) => {
  const [resourceName, setResourceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (resource) {
      setResourceName(resource.name);
      setError("");
    }
  }, [resource]);

  const handleUpdate = async () => {
    const trimmedName = resourceName.trim();
    if (!resource || !trimmedName) {
      setError("Resource name is required.");
      return;
    }

    if (resourceName.length > 255) {
      setError("Resource name must be under 255 characters.");
      return;
    }    

    setIsLoading(true);
    setError("");
    try {
      await updateResource(resource.id, {
        name: trimmedName,
      });
      onClose();
      onSuccess();
    } catch (error) {
      setError("Failed to update resource. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setResourceName("");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Resource" width="320px">
      <input
        type="text"
        value={resourceName}
        onChange={(e) => {
          setResourceName(e.target.value);
          if (error) setError("");
        }}
        placeholder="Resource name"
        style={{ ...inputStyle, marginBottom: "1rem" }}
        disabled={isLoading}
      />

      {error && <div style={{ color: "red", marginBottom: "1rem", fontSize: "0.85em" }}>{error}</div>}

      <div style={{ textAlign: "right" }}>
        <button onClick={handleClose} style={{ ...secondaryButtonStyle, marginRight: "8px" }} disabled={isLoading}>
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          style={primaryButtonStyle}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </Modal>
  );
};
