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

interface PlayerFormProps {
  player: IPlayer | null;
  isEdit: boolean;
  onSave: (player: IPlayer) => void;
  onClose: () => void;
}

const validationRules = {
  dni: {
    regex: /^\d{10}$/,
    message: "El DNI debe tener 10 dígitos.",
  },
  firstname: {
    regex: /^[A-Za-z]+$/,
    message: "El nombre solo puede contener letras.",
  },
  lastname: {
    regex: /^[A-Za-z]+$/,
    message: "El apellido solo puede contener letras.",
  },
  bib: {
    regex: /^\d+$/,
    message: "El número de dorsal debe ser numérico.",
  },
  teamId: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar un equipo.",
  },
  categoryId: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar una categoría.",
  },
};

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateField = (name: keyof IPlayer, value: string | number) => {
    const rule = validationRules[name as Exclude<keyof IPlayer, 'birthdate' | 'playerId'>];
    if (rule) {
      const { message } = rule;
      if ('regex' in rule && !rule.regex.test(value as string)) {
        return message;
      }
      if ('check' in rule && !rule.check(value as number)) {
        return message;
      }
    }
    return undefined;
  };

  const handleDateChange = (date: DateValue | null) => {
    setSelectedDate(date as CalendarDate);
    if (!date) {
      setFormData({ ...formData, birthdate: null });
      return;
    }

    const formattedDate = `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
    setFormData({ ...formData, birthdate: formattedDate });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name as keyof IPlayer, value);
    setErrors({ ...errors, [name]: error ?? '' });
  };

  const handleTeamChange = (value: string) => {
  const teamId = parseInt(value, 10);
  setFormData({ ...formData, teamId });
  
  // Validación inmediata para `teamId`
  const error = validateField("teamId", teamId);
  setErrors({ ...errors, teamId: error ?? '' });
};

const handleCategoryChange = (value: string) => {
  const categoryId = parseInt(value, 10);
  setFormData({ ...formData, categoryId });
  
  // Validación inmediata para `categoryId`
  const error = validateField("categoryId", categoryId);
  setErrors({ ...errors, categoryId: error ?? '' });
};

const handleSubmit = () => {
  const newErrors = Object.keys(formData).reduce((acc, key) => {
    const value = formData[key as keyof IPlayer];
    const error = validateField(key as keyof IPlayer, value instanceof Date ? value.toISOString() : value ?? '');
    if (error) acc[key] = error;
    return acc;
  }, {} as { [key: string]: string });
  
  setErrors(newErrors);

  // Solo guardar si no hay errores
  if (Object.keys(newErrors).length === 0) {
    onSave(formData);
  }
};

return (
  <Modal isOpen onOpenChange={onClose} placement="top-center">
    <ModalContent>
      {() => (
        <>
          <ModalHeader>{isEdit ? "Editar Jugador" : "Crear Jugador"}</ModalHeader>
          <ModalBody>
            {/* Campos de entrada */}
            <Input
              label="DNI"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              isInvalid={!!errors.dni}
              color={errors.dni ? "danger" : "default"}
              errorMessage={errors.dni}
              isRequired
            />
            <Input
              label="Nombre"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              isInvalid={!!errors.firstname}
              color={errors.firstname ? "danger" : "default"}
              errorMessage={errors.firstname}
              isRequired
            />
            <Input
              label="Apellido"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              isInvalid={!!errors.lastname}
              color={errors.lastname ? "danger" : "default"}
              errorMessage={errors.lastname}
              isRequired
            />
            <Input
              label="Bib"
              name="bib"
              value={formData.bib}
              onChange={handleChange}
              isInvalid={!!errors.bib}
              color={errors.bib ? "danger" : "default"}
              errorMessage={errors.bib}
              isRequired
            />
            <DatePicker
              label="Fecha de Nacimiento"
              value={selectedDate}
              onChange={handleDateChange}
              isRequired
            />
            {/* Select de equipo con validación */}
            <Select
              label="Equipo"
              selectedKeys={new Set([formData.teamId.toString()])}
              onSelectionChange={(keys) => handleTeamChange(Array.from(keys)[0] as string)}
              isInvalid={!!errors.teamId}
              errorMessage={errors.teamId}
            >
              {(teams ?? []).map((team) => (
                <SelectItem key={team.teamId?.toString() ?? ''} value={team.teamId ?? 0}>
                  {team.name}
                </SelectItem>
              ))}
            </Select>
            {/* Select de categoría con validación */}
            <Select
              label="Categoría"
              selectedKeys={new Set([formData.categoryId.toString()])}
              onSelectionChange={(keys) => handleCategoryChange(Array.from(keys)[0] as string)}
              isInvalid={!!errors.categoryId}
              errorMessage={errors.categoryId}
            >
              {(categories ?? []).map((category) => (
                <SelectItem key={category.categoryId?.toString() ?? ''} value={category.categoryId}>
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
