import React from "react";
import { Input } from "../ui/input";

interface DateTimeInputsProps {
  date: string;
  startTime: string;
  endTime: string;
  onDateChange: (date: string) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  errors?: {
    date?: string;
    startTime?: string;
    endTime?: string;
  };
}

export const DateTimeInputs = ({
  date,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  errors = {},
}: DateTimeInputsProps) => {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <Input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          error={errors.date}
          style={{
            width: "40%",
            textAlign: "center",
          }}
        />
        <Input
          type="time"
          value={startTime}
          onChange={(e) => onStartTimeChange(e.target.value)}
          error={errors.startTime}
          style={{
            flex: 1,
            maxWidth: "130px",
            textAlign: "center",
          }}
        />
        <Input
          type="time"
          value={endTime}
          onChange={(e) => onEndTimeChange(e.target.value)}
          error={errors.endTime}
          style={{
            flex: 1,
            maxWidth: "130px",
            textAlign: "center",
          }}
        />
      </div>
    </div>
  );
};
