import { Reservation, ReservationRequest } from "../types";
import { apiClient } from "./client";
import { ApiClientBasePath } from "./paths";

export const fetchReservations = async () => {
  const response = await apiClient.get<Reservation[]>(ApiClientBasePath.RESERVATIONS);
  return response.data;
};

export const deleteReservation = async (id: number) => {
  await apiClient.delete(`${ApiClientBasePath.RESERVATIONS}/${id}`);
};

export const createReservation = async (data: ReservationRequest) => {
  const response = await apiClient.post<Reservation>(ApiClientBasePath.RESERVATIONS, data);
  return response.data;
};

export const updateReservation = async (id: number, data: ReservationRequest) => {
  const response = await apiClient.put<Reservation>(`${ApiClientBasePath.RESERVATIONS}/${id}`, data);
  return response.data;
};

export const fetchReservationsInRange = async (from: string, to: string) => {
  const response = await apiClient.get<Reservation[]>(`${ApiClientBasePath.RESERVATIONS}/range`, {
    params: {
      from,
      to,
    },
  });
  return response.data;
};
