import { useState, useRef, useEffect } from "react";
import { Reservation, ReservationRequest } from "../types";
import { PopupData } from "../types";
import { SCROLL_TO_HOUR, HOUR_HEIGHT } from "../constants/calendar";
import { useClickOutside } from "./use-click-outside";
import { ApiReservations } from "../api";

export const useCalendarState = (onDataChange?: () => void) => {
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

  return {
    scrollRef,
    popupRef,
    popupData,
    reservationToDelete,
    editingReservation,
    setEditingReservation,
    handleEventClick,
    handleDeleteConfirm,
    handleEdit,
    handleDelete,
    handleEditSubmit,
  };
};
