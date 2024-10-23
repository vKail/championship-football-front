import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { ITeam } from "../interfaces/teams.interface";

interface TeamFormProps {
  team: ITeam | null;
  isEdit: boolean;
  onSave: (team: ITeam) => void;
  onClose: () => void;
}

export default function TeamForm({ team, isEdit, onSave, onClose }: TeamFormProps) {
  const [formData, setFormData] = useState<ITeam>({
    team_id: "",
    name: "",
    dt: { dt_id: "", dni: "", firstname: "", lastname: "", team: "" },
    category: { category_id: "", name: "" },
  });

  useEffect(() => {
    if (isEdit && team) {
      setFormData(team);
    } else {
      setFormData({
        team_id: "",
        name: "",
        dt: { dt_id: "", dni: "", firstname: "", lastname: "", team: "" },
        category: { category_id: "", name: "" },
      });
    }
  }, [isEdit, team]);

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
            <ModalHeader>{isEdit ? "Editar Equipo" : "Crear Equipo"}</ModalHeader>
            <ModalBody>
              <Input
                label="Nombre del Equipo"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {/* Agregar campos para dt y category si es necesario */}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {isEdit ? "Guardar Cambios" : "Crear Equipo"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
