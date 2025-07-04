import React, { useState } from "react";
import { Resource, Reservation } from "../../types";
import { ReserveButton } from "./reserve-button";
import { ResourceList } from "./resource-list";
import { ReservationModal } from "./reservation-modal";
import { AddResourceModal } from "./add-resource-modal";
import { EditResourceModal } from "./edit-resource-modal";
import { DeleteResourceModal } from "./delete-resource-modal";
import { useResourceColors } from "../../hooks/use-resource-colors";

interface SidebarProps {
  resources: Resource[];
  onToggleResource: (id: number) => void;
  reservations: Reservation[];
  refreshData: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ resources, onToggleResource, reservations, refreshData }) => {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState<Resource | null>(null);
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(null);

  const coloredResources = useResourceColors(resources);

  const handleSuccess = () => {
    refreshData();
  };

  return (
    <div
      style={{
        width: "250px",
        borderLeft: "1px solid #ccc",
        padding: "1rem",
      }}
    >
      <ReserveButton onClick={() => setShowReservationModal(true)} />

      <ResourceList
        resources={coloredResources}
        onToggleResource={onToggleResource}
        onEditResource={setResourceToEdit}
        onDeleteResource={setResourceToDelete}
        onAddResource={() => setShowAddResourceModal(true)}
      />

      <ReservationModal
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        onSuccess={handleSuccess}
        resources={resources}
        reservations={reservations}
      />

      <AddResourceModal
        isOpen={showAddResourceModal}
        onClose={() => setShowAddResourceModal(false)}
        onSuccess={handleSuccess}
      />

      <EditResourceModal
        isOpen={!!resourceToEdit}
        resource={resourceToEdit}
        onClose={() => setResourceToEdit(null)}
        onSuccess={handleSuccess}
      />

      <DeleteResourceModal
        isOpen={!!resourceToDelete}
        resource={resourceToDelete}
        onClose={() => setResourceToDelete(null)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Sidebar;
