import React, { useState } from "react";
import dayjs from "dayjs";
import { Modal } from "./modal";
import { Resource, Reservation } from "../../types";
import { inputStyle, primaryButtonStyle, secondaryButtonStyle } from "../../styles/shared";
import { createReservation } from "../../api/reservations";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  resources: Resource[];
  reservations: Reservation[];
}

export const ReservationModal = ({ isOpen, onClose, onSuccess, resources, reservations }: ReservationModalProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDate(dayjs().format("YYYY-MM-DD"));
    setStartTime("08:00");
    setEndTime("09:00");
    setSelectedResourceId(null);
    setError("");
  };

  const validateForm = () => {
    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return false;
    }

    if (title.length > 255) {
      setError("Title must be under 255 characters.");
      return;
    }

    if (!selectedResourceId) {
      setError("Please select a resource.");
      return false;
    }

    const start = dayjs(`${date}T${startTime}`);
    const end = dayjs(`${date}T${endTime}`);

    if (!start.isBefore(end)) {
      setError("End time must be after start time.");
      return false;
    }

    const hasConflict = reservations.some((r) => {
      return r.resourceId === selectedResourceId && dayjs(r.endAt).isAfter(start) && dayjs(r.startAt).isBefore(end);
    });

    if (hasConflict) {
      setError("This resource is already reserved during the selected time.");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const start = dayjs(`${date}T${startTime}`);
      const end = dayjs(`${date}T${endTime}`);

      if (!selectedResourceId) {
        setError("Please select a resource.");
        return;
      }

      await createReservation({
        resourceId: selectedResourceId,
        title: title.trim(),
        startAt: start.format("YYYY-MM-DDTHH:mm:ss"),
        endAt: end.format("YYYY-MM-DDTHH:mm:ss"),
      });

      resetForm();
      onClose();
      onSuccess();
    } catch {
      setError("Failed to save reservation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="New Reservation">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        style={{ ...inputStyle, marginBottom: "1rem" }}
        disabled={isLoading}
      />

      <select
        value={selectedResourceId ?? ""}
        onChange={(e) => setSelectedResourceId(Number(e.target.value))}
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

      <div style={{ marginBottom: "1.2rem" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              width: "40%",
              padding: "10px 12px",
              fontSize: "0.95em",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f1f3f4",
              height: "44px",
              boxSizing: "border-box",
              marginBottom: "10px",
              textAlign: "center",
            }}
            disabled={isLoading}
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
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
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={{
              ...inputStyle,
              flex: 1,
              maxWidth: "130px",
              textAlign: "center",
            }}
            disabled={isLoading}
          />
        </div>
      </div>

      {error && <div style={{ color: "red", marginBottom: "1rem", fontSize: "0.85em" }}>{error}</div>}

      <div style={{ textAlign: "right" }}>
        <button onClick={handleClose} style={{ ...secondaryButtonStyle, marginRight: "8px" }} disabled={isLoading}>
          Cancel
        </button>
        <button onClick={handleSave} style={primaryButtonStyle} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </Modal>
  );
};
