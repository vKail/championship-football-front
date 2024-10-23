'use client';
import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IPlayer } from "../interface/player.interface";

interface PlayerFormProps {
  player: IPlayer | null;
  isEdit: boolean;
  onSave: (player: IPlayer) => void;
  onClose: () => void;
}

export default function PlayerForm({ player, isEdit, onSave, onClose }: PlayerFormProps) {
  const [formData, setFormData] = useState<IPlayer>({
    player_id: "",
    dni: "",
    firstname: "",
    lastname: "",
    bib: "",
    team: { team_id: "", name: "", dt: { dt_id: "", dni: "", firstname: "", lastname: "", team: "" }, category: { category_id: "", name: "" } },
  });

  useEffect(() => {
    if (isEdit && player) {
      setFormData(player);
    } else {
      setFormData({
        player_id: "",
        dni: "",
        firstname: "",
        lastname: "",
        bib: "",
        team: { team_id: "", name: "", dt: { dt_id: "", dni: "", firstname: "", lastname: "", team: "" }, category: { category_id: "", name: "" } },
      });
    }
  }, [isEdit, player]);

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
            <ModalHeader>{isEdit ? "Editar Jugador" : "Crear Jugador"}</ModalHeader>
            <ModalBody>
              <Input
                label="DNI"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
              />
              <Input
                label="Nombre"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              <Input
                label="Apellido"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
              <Input
                label="Bib"
                name="bib"
                value={formData.bib}
                onChange={handleChange}
              />
              <Select
                label="Equipo"
                name="team"
                value={formData.team.team_id}
                onChange={(e) => setFormData({ ...formData, team: { ...formData.team, team_id: e.target.value } })}
              >
                {/* Add your options here */}
                <SelectItem key="team1">Team 1</SelectItem>
                <SelectItem key="team2">Team 2</SelectItem>
                {/* Add more options as needed */}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {isEdit ? "Guardar Cambios" : "Crear Jugador"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
