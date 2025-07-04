import React from "react";
import { HOURS_IN_DAY, HOUR_HEIGHT } from "../../constants/calendar";

export const HourLabels: React.FC = () => {
  const hours = Array.from({ length: HOURS_IN_DAY }, (_, i) => i);

  return (
    <div>
      {hours.map((hour) => (
        <div
          key={hour}
          style={{
            height: `${HOUR_HEIGHT}px`,
            textAlign: "right",
            paddingRight: "6px",
            fontSize: "0.8rem",
            borderTop: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        >
          {`${hour.toString().padStart(2, "0")}:00`}
        </div>
      ))}
    </div>
  );
};
