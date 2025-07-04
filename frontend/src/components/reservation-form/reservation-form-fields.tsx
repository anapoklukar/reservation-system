import React from "react";
import { Resource } from "../../types";
import { inputStyle } from "../../styles/shared";

interface FormData {
  title: string;
  resourceId: number | null;
  date: string;
  startTime: string;
  endTime: string;
}

interface FormErrors {
  title?: string;
  resourceId?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  general?: string;
}

interface ReservationFormFieldsProps {
  formData: FormData;
  errors: FormErrors;
  resources: Resource[];
  updateField: (field: keyof FormData, value: string | number | null) => void;
  isLoading?: boolean;
}

export const ReservationFormFields: React.FC<ReservationFormFieldsProps> = ({
  formData,
  errors,
  resources,
  updateField,
  isLoading = false,
}) => {
  return (
    <>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => updateField("title", e.target.value)}
        placeholder="Enter title"
        style={{ ...inputStyle, marginBottom: "1rem" }}
        disabled={isLoading}
      />
      {errors.title && <div style={{ color: "red", fontSize: "0.85em", marginBottom: "0.5rem" }}>{errors.title}</div>}

      <select
        value={formData.resourceId ?? ""}
        onChange={(e) => updateField("resourceId", Number(e.target.value))}
        style={{ ...inputStyle, marginBottom: "1rem" }}
        disabled={isLoading}
      >
        <option value="" disabled>
          Select resource
        </option>
        {resources.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>
      {errors.resourceId && (
        <div style={{ color: "red", fontSize: "0.85em", marginBottom: "0.5rem" }}>{errors.resourceId}</div>
      )}

      <div style={{ display: "flex", gap: "10px", marginBottom: "1.2rem" }}>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => updateField("date", e.target.value)}
          style={{
            width: "40%",
            padding: "10px 12px",
            fontSize: "0.95em",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f1f3f4",
            height: "44px",
            boxSizing: "border-box",
            textAlign: "center",
          }}
          disabled={isLoading}
        />
        <input
          type="time"
          value={formData.startTime}
          onChange={(e) => updateField("startTime", e.target.value)}
          style={{
            ...inputStyle,
            flex: 1,
            maxWidth: "130px",
            textAlign: "center",
          }}
          disabled={isLoading}
        />
        <input
          type="time"
          value={formData.endTime}
          onChange={(e) => updateField("endTime", e.target.value)}
          style={{
            ...inputStyle,
            flex: 1,
            maxWidth: "130px",
            textAlign: "center",
          }}
          disabled={isLoading}
        />
      </div>
      {(errors.date || errors.startTime || errors.endTime) && (
        <div style={{ color: "red", fontSize: "0.85em", marginBottom: "1rem" }}>
          {errors.date || errors.startTime || errors.endTime}
        </div>
      )}
    </>
  );
};
