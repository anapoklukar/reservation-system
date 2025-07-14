import React from "react";
import { Reservation, Resource } from "../../types";
import { HOURS_IN_DAY, HOUR_HEIGHT } from "../../constants/calendar";
import { assignEventColumns } from "../../utils/event-utils";
import { getResourceColor } from "../../utils/resource-utils";
import { CalendarEvent } from "./calendar-event";
import { HourGridLines } from "./hour-grid-lines";

interface CalendarDayProps {
  events: Reservation[];
  resources: Resource[];
  onEventClick: (event: Reservation, e: React.MouseEvent<HTMLDivElement>) => void;
}

export const CalendarDay = ({ events, resources, onEventClick }: CalendarDayProps) => {
  const positionedEvents = assignEventColumns(events);

  return (
    <div
      style={{
        position: "relative",
        borderLeft: "1px solid #eee",
        height: `${HOURS_IN_DAY * HOUR_HEIGHT}px`,
        boxSizing: "border-box",
      }}
    >
      <HourGridLines />

      {positionedEvents.map(({ event, top, height, col }) => {
        const horizontalOffset = 20;
        const maxOffset = 4;
        const offset = Math.min(col, maxOffset);

        return (
          <CalendarEvent
            key={event.id}
            event={event}
            top={top}
            height={height}
            left={`${offset * horizontalOffset}px`}
            backgroundColor={getResourceColor(resources, event.resourceId)}
            zIndex={10 + offset}
            onClick={(e) => onEventClick(event, e)}
          />
        );
      })}
    </div>
  );
};
