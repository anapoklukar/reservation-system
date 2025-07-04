import React from "react";
import dayjs from "dayjs";

type Props = {
  weekStart: dayjs.Dayjs;
  onWeekChange: (offset: number) => void;
};

const WeekHeader = ({ weekStart, onWeekChange }: Props) => {
  const weekEnd = weekStart.add(6, "day");

  const buttonStyle: React.CSSProperties = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#f1f3f4",
    color: "#3c4043",
    fontSize: "18px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.2s ease, box-shadow 0.2s ease",
  };

  const hoverStyle = {
    backgroundColor: "#e0e0e0",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
      <button
        onClick={() => onWeekChange(-1)}
        style={buttonStyle}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
        aria-label="Previous Week"
      >
        ←
      </button>

      <h2 style={{ flex: 1, textAlign: "center" }}>
        {weekStart.format("MMM D")} - {weekEnd.format("MMM D, YYYY")}
      </h2>

      <button
        onClick={() => onWeekChange(1)}
        style={buttonStyle}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
        aria-label="Next Week"
      >
        →
      </button>
    </div>
  );
};

export default WeekHeader;
