import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { ISeason } from "../interface/season.interface";

interface SeasonFormProps {
  season: ISeason | null;
  isEdit: boolean;
  onSave: (season: ISeason) => void;
  onClose: () => void;
}

export default function SeasonForm({ season, isEdit, onSave, onClose }: SeasonFormProps) {
  const [formData, setFormData] = useState<ISeason>({ season_id: "", season_name: "" });

  useEffect(() => {
    if (isEdit && season) {
      setFormData(season);
    } else {
      setFormData({ season_id: "", season_name: "" });
    }
  }, [isEdit, season]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal isOpen onOpenChange={onClose} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>{isEdit ? "Editar Temporada" : "Crear Temporada"}</ModalHeader>
            <ModalBody>
              <Input label="Nombre de la Temporada" name="season_name" value={formData.season_name} onChange={handleChange} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>Cancelar</Button>
              <Button onPress={handleSubmit}>{isEdit ? "Guardar Cambios" : "Crear Temporada"}</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
