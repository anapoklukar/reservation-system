import React, { forwardRef } from "react";
import { PopupContainer } from "./popup-container";
import { PopupActions } from "./popup-actions";
import { ReservationDetails } from "./reservation-details";
import { PopupData, Resource } from "../../types";

interface EventPopupProps {
  popupData: PopupData;
  resources: Resource[];
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  editDisabled?: boolean;
  deleteDisabled?: boolean;
}

export const EventPopup = forwardRef<HTMLDivElement, EventPopupProps>(
  ({ popupData, resources, onEdit, onDelete, onClose, editDisabled = false, deleteDisabled = false }, ref) => {
    const { reservation, x, y } = popupData;

    return (
      <PopupContainer ref={ref} x={x} y={y}>
        <PopupActions
          onEdit={onEdit}
          onDelete={onDelete}
          onClose={onClose}
          editDisabled={editDisabled}
          deleteDisabled={deleteDisabled}
        />

        <ReservationDetails reservation={reservation} resources={resources} hasActions={true} />
      </PopupContainer>
    );
  }
);

EventPopup.displayName = "EventPopup";
