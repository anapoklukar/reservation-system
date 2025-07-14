import React from "react";
import { Modal } from "../ui/modal";
import { ReservationFormFields } from "./reservation-form-fields";
import { ErrorMessage } from "./error-message";
import { FormActions } from "./form-actions";
import { useReservationForm } from "../../hooks/use-reservation-form";
import { Resource, ReservationRequest } from "../../types";

interface ReservationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reservation: ReservationRequest) => Promise<void>;
  resources: Resource[];
  title?: string;
  initialValues?: Partial<ReservationRequest>;
}

export const ReservationFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  resources,
  title = "New Reservation",
  initialValues = {},
}: ReservationFormModalProps) => {
  const { formData, errors, isSubmitting, updateField, handleSubmit, resetForm } = useReservationForm({
    initialValues,
    onSubmit,
    onSuccess: onClose,
  });

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <ReservationFormFields formData={formData} errors={errors} resources={resources} updateField={updateField} />

      {errors.general && <ErrorMessage message={errors.general} />}

      <FormActions onCancel={handleClose} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </Modal>
  );
};
