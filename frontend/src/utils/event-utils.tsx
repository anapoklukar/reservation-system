import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { Reservation } from "../types";
import { PositionedEvent } from "../types";

dayjs.extend(isSameOrAfter);

export const assignEventColumns = (events: Reservation[]) => {
  const positioned: PositionedEvent[] = [];
  const sorted = [...events].sort((a, b) => dayjs(a.startAt).diff(dayjs(b.startAt)));
  const columns: { end: dayjs.Dayjs }[] = [];

  sorted.forEach((event) => {
    const start = dayjs(event.startAt);
    const end = dayjs(event.endAt);
    const top = start.hour() * 60 + start.minute();
    const height = end.diff(start, "minute") - 5;

    let colIndex = columns.findIndex((c) => start.isSameOrAfter(c.end));
    if (colIndex === -1) {
      colIndex = columns.length;
      columns.push({ end });
    } else {
      columns[colIndex].end = end;
    }

    positioned.push({
      event,
      top,
      height,
      col: colIndex,
      totalCols: 0,
    });
  });

  const maxCols = columns.length;
  positioned.forEach((p) => (p.totalCols = maxCols));

  return positioned;
};
