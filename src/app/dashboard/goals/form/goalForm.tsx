import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { IGoal } from "../interface/goal.interface";

interface GoalFormProps {
  goal: IGoal | null; // Goal seleccionado o null si es un nuevo registro
  isEdit: boolean; // Si está en modo de edición o creación
  onSave: (goal: IGoal) => void; // Función para guardar el goal
  onClose: () => void; // Función para cerrar el formulario
}

export default function GoalForm({ goal, isEdit, onSave, onClose }: GoalFormProps) {
  // Estado local para manejar los datos del formulario
  const [formData, setFormData] = useState<IGoal>({
    goal_id: "",
    player: { player_id: "", firstname: "", lastname: "", dni: "", bib: "", team: { team_id: "", name: "", dt: { dt_id: "", dni: "", firstname: "", lastname: "", team: "" }, category: { category_id: "", name: "" } } },
    match: { match_id: "", date: "", team_1: "", team_2: "", result: "", status: "", season: { season_id: "", season_name: "" }, category: { category_id: "", name: "" } },
    minute: 0,
    team: { team_id: "", name: "", dt: { dt_id: "", dni: "", firstname: "", lastname: "", team: "" }, category: { category_id: "", name: "" } },
  });

  // Efecto para llenar los campos si es modo edición
  useEffect(() => {
    if (isEdit && goal) {
      setFormData(goal);
    } else {
      // Si no es edición, inicializa el formulario vacío
      setFormData({
        goal_id: "",
        player: { player_id: "", firstname: "", lastname: "", dni: "", bib: "", team: { team_id: "", name: "", dt: { dt_id: "", dni: "", firstname: "", lastname: "", team: "" }, category: { category_id: "", name: "" } } },
        match: { match_id: "", date: "", team_1: "", team_2: "", result: "", status: "", season: { season_id: "", season_name: "" }, category: { category_id: "", name: "" } },
        minute: 0,
        team: { team_id: "", name: "", dt: { dt_id: "", dni: "", firstname: "", lastname: "", team: "" }, category: { category_id: "", name: "" } },
      });
    }
  }, [isEdit, goal]);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal isOpen onOpenChange={onClose} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isEdit ? "Editar Gol" : "Crear Gol"}
            </ModalHeader>
            <ModalBody>
              <Input
                label="Minuto"
                name="minute"
                placeholder="Ingrese el minuto"
                variant="bordered"
                type="number"
                value={formData.minute.toString()}
                onChange={handleChange}
              />
              {/* Puedes agregar más inputs para player, match y team */}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {isEdit ? "Guardar Cambios" : "Crear Gol"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
