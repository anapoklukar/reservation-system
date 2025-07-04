import React from "react";
import { HOURS_IN_DAY, HOUR_HEIGHT } from "../../constants/calendar";

export const HourGridLines: React.FC = () => {
  const hours = Array.from({ length: HOURS_IN_DAY }, (_, i) => i);

  return (
    <>
      {hours.map((hour) => (
        <div
          key={`line-${hour}`}
          style={{
            position: "absolute",
            top: `${hour * HOUR_HEIGHT}px`,
            left: 0,
            right: 0,
            height: "0px",
            borderTop: "1px solid #f0f0f0",
            zIndex: 0,
          }}
        />
      ))}
    </>
  );
};
