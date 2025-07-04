import React from "react";
import { primaryButtonStyle, secondaryButtonStyle } from "../../styles/shared";

interface FormActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  cancelText?: string;
  submitText?: string;
  disabled?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  onSubmit,
  isSubmitting,
  cancelText = "Cancel",
  submitText = "Save",
  disabled = false,
}) => {
  return (
    <div style={{ textAlign: "right" }}>
      <button
        onClick={onCancel}
        style={{ ...secondaryButtonStyle, marginRight: "8px" }}
        disabled={isSubmitting || disabled}
      >
        {cancelText}
      </button>
      <button onClick={onSubmit} style={primaryButtonStyle} disabled={isSubmitting || disabled}>
        {isSubmitting ? "Saving..." : submitText}
      </button>
    </div>
  );
};
