import { useState, useEffect, useCallback } from "react";
import { Resource, Reservation } from "../types";
import { ApiResources, ApiReservations } from "../api/index";
import { getColoredResources } from "../utils/resource-utils";
import dayjs from "dayjs";

export const useCalendarData = (weekStart: dayjs.Dayjs) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [events, setEvents] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadResources = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiResources.fetchResources();
      const coloredResources = getColoredResources(data).map((r) => ({
        ...r,
        visible: true,
      }));
      setResources(coloredResources);
    } catch (err) {
      setError("Failed to load resources");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadReservations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const startOfWeek = weekStart.startOf("day").toISOString();
      const endOfWeek = weekStart.add(6, "day").endOf("day").toISOString();

      const data = await ApiReservations.fetchReservationsInRange(startOfWeek, endOfWeek);
      setEvents(data);
    } catch (err) {
      setError("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  }, [weekStart]);

  useEffect(() => {
    loadResources();
  }, [loadResources]);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  const toggleResourceVisibility = (id: number) => {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, visible: !r.visible } : r)));
  };

  const refreshData = () => {
    loadResources();
    loadReservations();
  };

  return {
    resources,
    events,
    loading,
    error,
    toggleResourceVisibility,
    refreshData,
  };
};
