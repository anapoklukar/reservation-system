import React from "react";
import dayjs from "dayjs";
import { DAYS_IN_WEEK } from "../../constants/calendar";

interface CalendarHeaderProps {
  weekStart: dayjs.Dayjs;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ weekStart }) => {
  const days = Array.from({ length: DAYS_IN_WEEK }, (_, i) => i);
  const today = dayjs();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "60px repeat(7, 1fr)",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div></div>
      {days.map((i) => {
        const current = weekStart.add(i, "day");
        const isToday = current.isSame(today, "day");

        return (
          <div
            key={`header-${i}`}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              padding: "10px 0",
              borderLeft: "1px solid #ccc",
              borderBottom: isToday ? "3px solid #ffc107" : "none",
            }}
          >
            {current.format("ddd D")}
          </div>
        );
      })}
    </div>
  );
};
