"use client";
import { useState, useEffect, use } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  DatePicker,
  DateValue,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IMatch } from "../../interface/matches.interface";
import { parseDate } from "@internationalized/date";
import useTeams from "@/app/dashboard/teams/hooks/useTeams";
import useCategory from "@/app/dashboard/categories/hooks/useCategry";
import useSeason from "@/app/dashboard/seasons/hooks/useSeason";
import useMatch from "../../hooks/useMatch";

interface MatchFormProps {
  match: IMatch | null;
  isEdit: boolean;
  onSave: (match: IMatch) => void;
  onClose: () => void;
}

const matchValidationRules: { [key in keyof IMatch]: { check: (value: any) => boolean; message: string } } = {
  homeTeamId: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar un equipo local.",
  },
  awayTeamId: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar un equipo visitante.",
  },
  category: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar una categoría.",
  },
  season: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar una temporada.",
  },
  matchDate: {
    check: (value: string | null) => value !== null,
    message: "Debe seleccionar una fecha.",
  },
  result: {
    check: (value: string) => value.length > 0,
    message: "Debe proporcionar un resultado.",
  },
  status: {
    check: (value: string) => value.length > 0,
    message: "Debe proporcionar un estado.",
  },
};


export default function MatchForm({
  match,
  isEdit,
  onSave,
  onClose,
}: MatchFormProps) {
  const {handleCreateMatch} = useMatch();
  const {teams, handleGetAllTeams} = useTeams();
  const {categories, handleGetAllCategories} = useCategory();
  const {seasons, handleGetAllSeasons} = useSeason();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<IMatch>({
    matchDate: null,
    awayTeamId: 0,
    homeTeamId: 0,
    result: "-",
    status: "Pendiente",
    category: 0,
    season: 0,
  });

  useEffect(() => {
    if (isEdit && match) {
      setFormData(match);
    }
    handleGetAllTeams();
    handleGetAllCategories();
    handleGetAllSeasons();
  }, [isEdit, match]);

  const validateField = (name: keyof IMatch, value: any) => {
    const rule = matchValidationRules[name as keyof typeof matchValidationRules];
    if (rule) {
      if ('regex' in rule && rule.regex instanceof RegExp && !rule.regex.test(value?.toString())) {
        return rule.message;
      }
      if ('check' in rule && !rule.check(value)) {
        return rule.message;
      }
    }
    return undefined;
  };

  const handleDateChange = (newDate: DateValue | null) => {
    const dateStr = newDate ? newDate.toString() : null;
    setFormData({ ...formData, matchDate: dateStr });
    
    const error = validateField('matchDate', dateStr);
    setErrors({ ...errors, matchDate: error ?? '' });
  };

  const handleSelectChange = (fieldName: string, value: string) => {
    const numValue = parseInt(value, 10);
    setFormData({ ...formData, [fieldName]: numValue });
    
    const error = validateField(fieldName as keyof IMatch, numValue);
    setErrors({ ...errors, [fieldName]: error ?? '' });
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Validate all fields
    Object.keys(matchValidationRules).forEach((key) => {
      const error = validateField(
        key as keyof IMatch,
        formData[key as keyof IMatch]
      );
      if (error) {
        newErrors[key] = error;
      }
    });

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
            <ModalHeader>
              {isEdit ? "Editar Partido" : "Crear Partido"}
            </ModalHeader>
            <ModalBody>
              <DatePicker
                label="Fecha de partido"
                value={formData.matchDate ? parseDate(formData.matchDate.toString()) : undefined}
                onChange={handleDateChange}
                isInvalid={!!errors.matchDate}
                errorMessage={errors.matchDate}
                isRequired
              />
              <Select
                label="Equipo Local"
                selectedKeys={formData.homeTeamId ? [formData.homeTeamId.toString()] : []}
                onSelectionChange={(keys) => handleSelectChange("homeTeamId", Array.from(keys)[0] as string)}
                isInvalid={!!errors.homeTeamId}
                errorMessage={errors.homeTeamId}
                isRequired
              >
                {(teams ?? []).map((team) => (
                  <SelectItem key={team.teamId?.toString() ?? 0 } value={team.teamId}>
                    {team.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Equipo Visitante"
                selectedKeys={formData.awayTeamId ? [formData.awayTeamId.toString()] : []}
                onSelectionChange={(keys) => handleSelectChange("awayTeamId", Array.from(keys)[0] as string)}
                isInvalid={!!errors.awayTeamId}
                errorMessage={errors.awayTeamId}
                isRequired
              >
                {(teams ?? []).map((team) => (
                  <SelectItem key={team.teamId?.toString() ?? 0} value={team.teamId}>
                    {team.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Temporada"
                selectedKeys={formData.season ? [formData.season.toString()] : []}
                onSelectionChange={(keys) => handleSelectChange("season", Array.from(keys)[0] as string)}
                isInvalid={!!errors.season}
                errorMessage={errors.season}
                isRequired
              >
                {(seasons ?? []).map((season) => (
                  <SelectItem key={season.seasonId?.toString() ?? 0} value={season.seasonId}>
                    {season.seasonName}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Categoría"
                selectedKeys={formData.category ? [formData.category.toString()] : []}
                onSelectionChange={(keys) => handleSelectChange("category", Array.from(keys)[0] as string)}
                isInvalid={!!errors.category}
                errorMessage={errors.category}
                isRequired
              >
                {(categories ?? []).map((category) => (
                  <SelectItem key={category.categoryId?.toString() ?? 0} value={category.categoryId}>
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
                {isEdit ? "Guardar Cambios" : "Crear Partido"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}