import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { ISeason } from "../../interface/season.interface";

interface SeasonFormProps {
  season: ISeason | null;
  isEdit: boolean;
  onSave: (season: ISeason) => void;
  onClose: () => void;
}

const validationRules = {
  seasonName: {
    regex: /^[A-Za-z\s]+$/,
    message: "El nombre de la temporada solo puede contener letras y espacios.",
  },
};

export default function SeasonForm({
  season,
  isEdit,
  onSave,
  onClose,
}: SeasonFormProps) {
  const [formData, setFormData] = useState<ISeason>({ seasonName: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isEdit && season) {
      setFormData(season);
    } else {
      setFormData({ seasonName: "" });
    }
  }, [isEdit, season]);

  const validateField = (name: keyof ISeason, value: string) => {
    const rule = validationRules[name as keyof typeof validationRules];
    if (rule && !rule.regex.test(value)) {
      return rule.message;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name as keyof ISeason, value);
    setErrors({ ...errors, [name]: error ?? "" });
  };

  const handleSubmit = () => {
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const value = formData[key as keyof ISeason] as string;
      const error = validateField(key as keyof ISeason, value);
      if (error) acc[key] = error;
      return acc;
    }, {} as { [key: string]: string });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
    }
  };

  return (
    <Modal isOpen onOpenChange={onClose} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>{isEdit ? "Editar Temporada" : "Crear Temporada"}</ModalHeader>
            <ModalBody>
              <Input
                label="Nombre de la Temporada"
                name="seasonName"
                value={formData.seasonName}
                onChange={handleChange}
                isInvalid={!!errors.seasonName}
                color={errors.seasonName ? "danger" : "default"}
                errorMessage={errors.seasonName}
                isRequired
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Cancelar
              </Button>
              <Button onPress={handleSubmit}>
                {isEdit ? "Guardar Cambios" : "Crear Temporada"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
