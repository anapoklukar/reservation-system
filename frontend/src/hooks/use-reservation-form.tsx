import { useState } from "react";
import dayjs from "dayjs";
import { Resource, ReservationRequest } from "../types";

interface FormErrors {
  title?: string;
  resourceId?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  general?: string;
  length?: string;
}

interface FormData {
  title: string;
  resourceId: number | null;
  date: string;
  startTime: string;
  endTime: string;
}

interface UseReservationFormProps {
  initialValues?: Partial<ReservationRequest>;
  onSubmit: (reservation: ReservationRequest) => Promise<void>;
  onSuccess?: () => void;
}

export const useReservationForm = ({ initialValues = {}, onSubmit, onSuccess }: UseReservationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: initialValues.title || "",
    resourceId: initialValues.resourceId || null,
    date: initialValues.startAt ? dayjs(initialValues.startAt).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
    startTime: initialValues.startAt ? dayjs(initialValues.startAt).format("HH:mm") : "08:00",
    endTime: initialValues.endAt ? dayjs(initialValues.endAt).format("HH:mm") : "09:00"
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (formData.title.length > 255) {
      newErrors.length = "Resource name must be under 255 characters.";
    }

    if (!formData.resourceId) {
      newErrors.resourceId = "Please select a resource";
    }

    const startDateTime = dayjs(`${formData.date}T${formData.startTime}`);
    const endDateTime = dayjs(`${formData.date}T${formData.endTime}`);

    if (!startDateTime.isBefore(endDateTime)) {
      newErrors.endTime = "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field: keyof FormData, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const startAt = dayjs(`${formData.date}T${formData.startTime}`);
      const endAt = dayjs(`${formData.date}T${formData.endTime}`);

      await onSubmit({
        title: formData.title.trim(),
        resourceId: formData.resourceId!,
        startAt: startAt.format("YYYY-MM-DDTHH:mm:ss"),
        endAt: endAt.format("YYYY-MM-DDTHH:mm:ss"),
      });

      resetForm();
      onSuccess?.();
    } catch (error) {
      setErrors({ general: "Failed to save reservation. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      resourceId: null,
      date: dayjs().format("YYYY-MM-DD"),
      startTime: "08:00",
      endTime: "09:00",
    });
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
    resetForm,
  };
};
