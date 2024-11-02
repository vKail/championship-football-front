"use client";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  DatePicker,
  DateValue,
} from "@nextui-org/react";
import { IPlayer } from "../../interface/player.interface";
import useTeams from "@/app/dashboard/teams/hooks/useTeams";
import { parseDate } from "@internationalized/date";
import useCategory from "@/app/dashboard/categories/hooks/useCategry";

interface PlayerFormProps {
  player: IPlayer | null;
  isEdit: boolean;
  onSave: (player: IPlayer) => void;
  onClose: () => void;
}

export default function PlayerForm({
  player,
  isEdit,
  onSave,
  onClose,
}: PlayerFormProps) {
  const { teams, handleGetAllTeams, fetchTeamById } = useTeams();
  const {categories, handleGetAllCategories, fetchCategoryById} = useCategory();
  const [formData, setFormData] = useState<IPlayer>({
    dni: "",
    firstname: "",
    lastname: "",
    birthdate: null,
    bib: "",
    teamId: 0,
    categoryId: 0,
  });

  useEffect(() => {
    if (isEdit && player) {
      setFormData(player);
    } else {
      setFormData({
        dni: "",
        firstname: "",
        lastname: "",
        bib: "",
        birthdate: null,
        teamId: 0,
        categoryId: 0,
      });
    }
  }, [isEdit, player]);

  useEffect(() => {
    handleGetAllTeams();
    handleGetAllCategories();
  }, []);

  useEffect(() => {
    if (isEdit && player) {
      setFormData({
        ...player,
        birthdate: player.birthdate ? player.birthdate.toString() : null,
      });
    } else {
      setFormData({
        dni: "",
        firstname: "",
        lastname: "",
        bib: "",
        birthdate: null,
        teamId: 0,
        categoryId: 0,
      });
    }
  }, [isEdit, player]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      teamId: parseInt(value, 10),
      categoryId: parseInt(value, 10),
    });
  };
  const handleDateChange = (date: DateValue | null) => {
    setFormData({
      ...formData,
      birthdate: date ? date.toString() : null,
    });
  };

  const handleSubmit = () => {
    const playerData = {
      ...formData,
      birthdate: formData.birthdate,
    };

    onSave(playerData);
    console.log(playerData);
  };

  return (
    <Modal isOpen onOpenChange={onClose} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              {isEdit ? "Editar Jugador" : "Crear Jugador"}
            </ModalHeader>
            <ModalBody>
              <Input
                label="DNI"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                isRequired
              />
              <Input
                label="Nombre"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                isRequired
              />
              <Input
                label="Apellido"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                isRequired
              />
              <Input
                label="Bib"
                name="bib"
                value={formData.bib}
                onChange={handleChange}
                isRequired
              />
              <DatePicker
                label="Fecha de Nacimiento"
                name="birthdate"
                defaultValue={
                  formData.birthdate
                    ? parseDate(formData.birthdate.toString())
                    : undefined
                } 
                onChange={(newDate) => handleDateChange(newDate)}
                isRequired
              />
              <Select
                label="Equipo"
                name="teamId"
                value={formData.teamId}
                onChange={handleSelectChange}
              >
                {(teams ?? []).map((team) => (
                  <SelectItem key={team.teamId ?? 0} value={team.teamId}>
                    {team.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Categoria"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleSelectChange}
              >
                {(categories ?? []).map((category) => (
                  <SelectItem key={category.categoryId ?? 0} value={category.categoryId}>
                    {category.categoryName}
                  </SelectItem>
                ))}
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
