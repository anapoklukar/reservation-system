import React from "react";
import dayjs from "dayjs";
import { Reservation, Resource } from "../../types";
import { DAYS_IN_WEEK } from "../../constants/calendar";
import { HourLabels } from "./hour-labels";
import { CalendarDay } from "./calendar-day";

interface CalendarGridProps {
  weekStart: dayjs.Dayjs;
  events: Reservation[];
  resources: Resource[];
  onEventClick: (event: Reservation, e: React.MouseEvent<HTMLDivElement>) => void;
}

export const CalendarGrid = ({ weekStart, events, resources, onEventClick }: CalendarGridProps) => {
  const days = Array.from({ length: DAYS_IN_WEEK }, (_, i) => i);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "60px repeat(7, 1fr)",
      }}
    >
      <HourLabels />

      {days.map((dayOffset) => {
        const currentDay = weekStart.add(dayOffset, "day");
        const dayEvents = events.filter(
          (e) => dayjs(e.startAt).isSame(currentDay, "day") && resources.some((r) => r.id === e.resourceId)
        );

        return (
          <CalendarDay key={`day-${dayOffset}`} events={dayEvents} resources={resources} onEventClick={onEventClick} />
        );
      })}
    </div>
  );
};
