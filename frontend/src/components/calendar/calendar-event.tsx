import React from "react";
import dayjs from "dayjs";
import { Reservation } from "../../types";

interface CalendarEventProps {
  event: Reservation;
  top: number;
  height: number;
  left: string;
  backgroundColor: string;
  zIndex: number;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({
  event,
  top,
  height,
  left,
  backgroundColor,
  zIndex,
  onClick,
}) => (
  <div
    style={{
      position: "absolute",
      top: `${top}px`,
      left,
      right: "4px",
      height: `${height}px`,
      backgroundColor,
      borderRadius: "6px",
      padding: "2px 6px",
      fontSize: "0.75em",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      zIndex,
      cursor: "pointer",
      overflow: "hidden",
    }}
    onClick={onClick}
  >
    <strong>{event.title}</strong>
    <div style={{ fontSize: "0.7em", opacity: 0.8 }}>
      {dayjs(event.startAt).format("HH:mm")} - {dayjs(event.endAt).format("HH:mm")}
    </div>
  </div>
);
