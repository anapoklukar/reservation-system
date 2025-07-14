import React, { useState } from "react";
import { Modal } from "./modal";
import { inputStyle, primaryButtonStyle, secondaryButtonStyle } from "../../styles/shared";
import { createResource } from "../../api/resources";

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddResourceModal = ({ isOpen, onClose, onSuccess }: AddResourceModalProps) => {
  const [newResourceName, setNewResourceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    const trimmedName = newResourceName.trim();
    if (!trimmedName) {
      setError("Resource name is required.");
      return;
    }

    if (trimmedName.length > 255) {
      setError("Resource name must be under 255 characters.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await createResource({ name: trimmedName });
      setNewResourceName("");
      onClose();
      onSuccess();
    } catch {
      setError("Failed to create resource.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNewResourceName("");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Resource" width="300px">
      <input
        type="text"
        value={newResourceName}
        onChange={(e) => {
          setNewResourceName(e.target.value);
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
        <button onClick={handleAdd} style={primaryButtonStyle} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </Modal>
  );
};
