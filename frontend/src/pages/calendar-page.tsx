import React, { useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import WeeklyCalendar from "../components/weekly-calendar";
import Sidebar from "../components/sidebar/sidebar";
import WeekHeader from "../components/week-header";
import { LoadingSpinner } from "../components/ui/loading-spinner";
import { ErrorMessage } from "../components/ui/error-message";
import { useCalendarData } from "../hooks/use-calendar-data";

dayjs.extend(isBetween);

const CalendarPage: React.FC = () => {
  const [weekStart, setWeekStart] = useState(dayjs().startOf("week").add(1, "day"));

  const { resources, events, loading, error, toggleResourceVisibility, refreshData } = useCalendarData(weekStart);

  const handleWeekChange = (offset: number) => {
    setWeekStart((prev) => prev.add(offset, "week"));
  };

  if (error) {
    return <ErrorMessage message={error} onRetry={refreshData} />;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, padding: "1rem" }}>
        <WeekHeader weekStart={weekStart} onWeekChange={handleWeekChange} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <WeeklyCalendar
            weekStart={weekStart}
            events={events}
            resources={resources.filter((r) => r.visible)}
            onDataChange={refreshData}
          />
        )}
      </div>
      <Sidebar
        resources={resources}
        onToggleResource={toggleResourceVisibility}
        reservations={events}
        refreshData={refreshData}
      />
    </div>
  );
};

export default CalendarPage;
