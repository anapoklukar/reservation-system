import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { Reservation, Resource, ReservationRequest } from "../types";
import { PopupData } from "../types";
import { SCROLL_TO_HOUR, HOUR_HEIGHT } from "../constants/calendar";
import { useClickOutside } from "../hooks/use-click-outside";
import { ApiReservations } from "../api";
import { ReservationFormModal } from "./reservation-form/reservation-form-modal";
import { CalendarHeader } from "./calendar/calendar-header";
import { EventPopup } from "./calendar/event-popup";
import { DeleteConfirmModal } from "./calendar/delete-confirm-modal";
import { CalendarGrid } from "./calendar/calendar-grid";

dayjs.extend(isSameOrAfter);

interface WeeklyCalendarProps {
  weekStart: dayjs.Dayjs;
  events: Reservation[];
  resources: Resource[];
  onDataChange?: () => void;
}

const WeeklyCalendar = ({ weekStart, events, resources, onDataChange }: WeeklyCalendarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [reservationToDelete, setReservationToDelete] = useState<Reservation | null>(null);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = SCROLL_TO_HOUR * HOUR_HEIGHT;
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.style.overflowY = popupData ? "hidden" : "auto";
    }
    return () => {
      if (el) {
        el.style.overflowY = "auto";
      }
    };
  }, [popupData]);

  useClickOutside(popupRef as React.RefObject<HTMLElement>, () => setPopupData(null));

  const handleEventClick = (event: Reservation, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    setPopupData({
      reservation: event,
      x: rect.right + 8,
      y: rect.top,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!reservationToDelete) return;

    try {
      await ApiReservations.deleteReservation(reservationToDelete.id);
      setReservationToDelete(null);
      onDataChange?.();
    } catch (error) {
      console.error("Failed to delete reservation:", error);
    }
  };

  const handleEdit = () => {
    if (popupData) {
      setEditingReservation(popupData.reservation);
      setPopupData(null);
    }
  };

  const handleDelete = () => {
    if (popupData) {
      setReservationToDelete(popupData.reservation);
      setPopupData(null);
    }
  };

  const handleEditSubmit = async (reservationData: ReservationRequest) => {
    if (!editingReservation) return;

    try {
      await ApiReservations.updateReservation(editingReservation.id, reservationData);
      onDataChange?.();
    } catch (error) {
      console.error("Failed to update reservation:", error);
      throw error;
    }
  };

  return (
    <div
      style={{
        height: "90vh",
        width: "100%",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <CalendarHeader weekStart={weekStart} />

      <div ref={scrollRef} style={{ overflowY: "auto" }}>
        <CalendarGrid weekStart={weekStart} events={events} resources={resources} onEventClick={handleEventClick} />
      </div>

      {popupData && (
        <EventPopup
          ref={popupRef}
          popupData={popupData}
          resources={resources}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={() => setPopupData(null)}
        />
      )}

      {reservationToDelete && (
        <DeleteConfirmModal
          reservation={reservationToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setReservationToDelete(null)}
        />
      )}

      {editingReservation && (
        <ReservationFormModal
          isOpen={!!editingReservation}
          onClose={() => setEditingReservation(null)}
          onSubmit={handleEditSubmit}
          resources={resources}
          title="Edit Reservation"
          initialValues={{
            title: editingReservation.title,
            resourceId: editingReservation.resourceId,
            startAt: editingReservation.startAt,
            endAt: editingReservation.endAt,
          }}
        />
      )}
    </div>
  );
};

export default WeeklyCalendar;
