export interface Resource {
  id: number;
  name: string;
  color?: string;
  visible?: boolean;
}

export interface Reservation {
  id: number;
  title: string;
  startAt: string;
  endAt: string;
  resourceId: number;
}

export interface ReservationRequest {
  title: string;
  startAt: string;
  endAt: string;
  resourceId: number;
}

export interface PositionedEvent {
  event: Reservation;
  top: number;
  height: number;
  col: number;
  totalCols: number;
}

export interface PopupData {
  reservation: Reservation;
  x: number;
  y: number;
}

export interface ResourceRequest {
  name: string;
}
