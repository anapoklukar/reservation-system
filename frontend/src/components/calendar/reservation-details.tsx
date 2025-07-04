import React from "react";
import dayjs from "dayjs";
import { TruncatedText } from "./truncated-text";
import { Reservation, Resource } from "../../types";
import { getResourceName } from "../../utils/resource-utils";

interface ReservationDetailsProps {
  reservation: Reservation;
  resources: Resource[];
  hasActions?: boolean;
}

export const ReservationDetails: React.FC<ReservationDetailsProps> = ({
  reservation,
  resources,
  hasActions = false,
}) => {
  const resourceName = getResourceName(resources, reservation.resourceId);

  return (
    <div>
      <TruncatedText
        text={reservation.title}
        fontWeight="bold"
        fontSize="1em"
        paddingRight={hasActions ? "90px" : "0"}
        maxWidth="300px"
      />

      <TruncatedText text={resourceName} fontWeight="500" fontSize="0.9em" marginBottom="4px" maxWidth="300px" />

      <div style={{ fontSize: "0.85em", color: "#555" }}>
        {dayjs(reservation.startAt).format("dddd, D. MMMM")}
        <br />
        {dayjs(reservation.startAt).format("HH:mm")} - {dayjs(reservation.endAt).format("HH:mm")}
      </div>
    </div>
  );
};
