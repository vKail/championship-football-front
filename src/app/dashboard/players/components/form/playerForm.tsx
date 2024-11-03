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
import { parseDate, CalendarDate } from "@internationalized/date";
import useCategory from "@/app/dashboard/categories/hooks/useCategry";
import usePlayers from "../../hooks/usePlayer";

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
  const { teams, handleGetAllTeams } = useTeams();
  const { categories, handleGetAllCategories } = useCategory();
  const [formData, setFormData] = useState<IPlayer>({
    dni: "",
    firstname: "",
    lastname: "",
    birthdate: null,
    bib: "",
    teamId: 0,
    categoryId: 0,
  });

  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);

  useEffect(() => {
    if (isEdit && player) {
      setFormData({
        ...player,
        birthdate: player.birthdate,
        teamId: player.teamId ?? 0,
        categoryId: player.categoryId ?? 0,
      });
      if (player.birthdate) {
        try {
          setSelectedDate(parseDate(player.birthdate.toString()));
        } catch (e) {
          console.error("Error parsing date:", e);
          setSelectedDate(null);
        }
      }
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
      setSelectedDate(null);
    }
  }, [isEdit, player]);

  useEffect(() => {
    handleGetAllTeams();
    handleGetAllCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTeamChange = (value: string) => {
    setFormData({
      ...formData,
      teamId: parseInt(value, 10),
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      categoryId: parseInt(value, 10),
    });
  };

  const handleDateChange = (date: DateValue | null) => {
    setSelectedDate(date as CalendarDate);
    
    if (!date) {
      setFormData({
        ...formData,
        birthdate: null,
      });
      return;
    }

    const year = date.year;
    const month = String(date.month).padStart(2, "0");
    const day = String(date.day).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    setFormData({
      ...formData,
      birthdate: formattedDate,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
   
  };

  const isValidSelection = (id: number, collection: any[]) => {
    return collection?.some(item => 
      (item.teamId === id || item.categoryId === id)
    ) ?? false;
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
                value={selectedDate}
                onChange={handleDateChange}
                isRequired
              />
              <Select
                label="Equipo"
                selectedKeys={
                  isValidSelection(formData.teamId, teams ?? []) 
                    ? new Set([formData.teamId.toString()]) 
                    : new Set([])
                }
                onSelectionChange={(keys) => handleTeamChange(Array.from(keys)[0] as string)}
              >
                {teams?.map((team) => (
                  <SelectItem
                    key={team.teamId?.toString() ?? ""}
                    value={team.teamId}
                  >
                    {team.name}
                  </SelectItem>
                )) ?? []}
              </Select>
              <Select
                label="Categoria"
                selectedKeys={
                  isValidSelection(formData.categoryId, categories ?? [])
                    ? new Set([formData.categoryId.toString()])
                    : new Set([])
                }
                onSelectionChange={(keys) => handleCategoryChange(Array.from(keys)[0] as string)}
              >
                {categories?.map((category) => (
                  <SelectItem
                    key={category.categoryId?.toString() ?? ""}
                    value={category.categoryId}
                  >
                    {category.categoryName}
                  </SelectItem>
                )) ?? []}
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