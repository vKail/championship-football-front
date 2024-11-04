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
} from "@nextui-org/react";
import { ILeaderboard } from "../../interface/leaderboard.interface";
import { ITeam } from "@/app/dashboard/teams/interfaces/teams.interface";
import { ISeason } from "@/app/dashboard/seasons/interface/season.interface";
import useTeams from "@/app/dashboard/teams/hooks/useTeams";
import useSeason from "@/app/dashboard/seasons/hooks/useSeason";
import useCategory from "@/app/dashboard/categories/hooks/useCategry";

interface LeaderboardFormProps {
  leaderboard: ILeaderboard | null;
  isEdit: boolean;
  onSave: (leaderboard: ILeaderboard) => void;
  onClose: () => void;
}

const leaderboardValidationRules = {
  teamId: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar un equipo.",
  },
  seasonId: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar una temporada.",
  },
  categoryId: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar una categoría.",
  },
  points: {
    regex: /^\d+$/,
    check: (value: number) => value >= 0,
    message: "Los puntos deben ser un número positivo.",
  },
  matchesWon: {
    regex: /^\d+$/,
    check: (value: number) => value >= 0,
    message: "Los partidos ganados deben ser un número positivo.",
  },
  matchesDrawn: {
    regex: /^\d+$/,
    check: (value: number) => value >= 0,
    message: "Los partidos empatados deben ser un número positivo.",
  },
  matchesLost: {
    regex: /^\d+$/,
    check: (value: number) => value >= 0,
    message: "Los partidos perdidos deben ser un número positivo.",
  },
  goalsScored: {
    regex: /^\d+$/,
    check: (value: number) => value >= 0,
    message: "Los goles anotados deben ser un número positivo.",
  }
};


export default function LeaderboardForm({
  leaderboard,
  isEdit,
  onSave,
  onClose,
}: LeaderboardFormProps) {
  const { handleGetAllTeams, teams } = useTeams();
  const { seasons, handleGetAllSeasons } = useSeason();
  const { categories, handleGetAllCategories } = useCategory();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<ILeaderboard>({
    teamId: 0,
    seasonId: 0,
    categoryId: 0,
    points: 0,
    matchesWon: 0,
    matchesDrawn: 0,
    matchesLost: 0,
    goalsScored: 0,
  });

  useEffect(() => {
    if (isEdit && leaderboard) {
      setFormData(leaderboard);
    }
    handleGetAllTeams();
    handleGetAllSeasons();
    handleGetAllCategories();
  }, [isEdit, leaderboard]);

  const validateField = (name: keyof ILeaderboard, value: any) => {
    const rule = leaderboardValidationRules[name as keyof typeof leaderboardValidationRules];
    if (rule) {
      if ('regex' in rule && !rule.regex.test(value?.toString())) {
        return rule.message;
      }
      if ('check' in rule && !rule.check(value)) {
        return rule.message;
      }
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    setFormData({ ...formData, [name]: numValue });
    
    const error = validateField(name as keyof ILeaderboard, numValue);
    setErrors({ ...errors, [name]: error ?? '' });
  };

  const handleSelectChange = (fieldName: string, value: string) => {
    const numValue = parseInt(value, 10);
    setFormData({ ...formData, [fieldName]: numValue });
    
    const error = validateField(fieldName as keyof ILeaderboard, numValue);
    setErrors({ ...errors, [fieldName]: error ?? '' });
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Validate all fields
    Object.keys(leaderboardValidationRules).forEach((key) => {
      const error = validateField(
        key as keyof ILeaderboard,
        formData[key as keyof ILeaderboard]
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
              {isEdit ? "Editar Tabla de Posiciones" : "Crear Tabla de Posiciones"}
            </ModalHeader>
            <ModalBody>
              <Select
                label="Equipo"
                selectedKeys={formData.teamId ? [formData.teamId.toString()] : []}
                onSelectionChange={(keys) => handleSelectChange("teamId", Array.from(keys)[0] as string)}
                isInvalid={!!errors.teamId}
                errorMessage={errors.teamId}
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
                selectedKeys={formData.seasonId ? [formData.seasonId.toString()] : []}
                onSelectionChange={(keys) => handleSelectChange("seasonId", Array.from(keys)[0] as string)}
                isInvalid={!!errors.seasonId}
                errorMessage={errors.seasonId}
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
                selectedKeys={formData.categoryId ? [formData.categoryId.toString()] : []}
                onSelectionChange={(keys) => handleSelectChange("categoryId", Array.from(keys)[0] as string)}
                isInvalid={!!errors.categoryId}
                errorMessage={errors.categoryId}
                isRequired
              >
                {(categories ?? []).map((category) => (
                  <SelectItem key={category.categoryId?.toString() ?? 0} value={category.categoryId}>
                    {category.categoryName}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Puntos"
                name="points"
                value={formData.points.toString()}
                onChange={handleChange}
                isInvalid={!!errors.points}
                errorMessage={errors.points}
                isRequired
              />
              <Input
                label="Partidos Ganados"
                name="matchesWon"
                value={formData.matchesWon.toString()}
                onChange={handleChange}
                isInvalid={!!errors.matchesWon}
                errorMessage={errors.matchesWon}
                isRequired
              />
              <Input
                label="Partidos Empatados"
                name="matchesDrawn"
                value={formData.matchesDrawn.toString()}
                onChange={handleChange}
                isInvalid={!!errors.matchesDrawn}
                errorMessage={errors.matchesDrawn}
                isRequired
              />
              <Input
                label="Partidos Perdidos"
                name="matchesLost"
                value={formData.matchesLost.toString()}
                onChange={handleChange}
                isInvalid={!!errors.matchesLost}
                errorMessage={errors.matchesLost}
                isRequired
              />
              <Input
                label="Goles Anotados"
                name="goalsScored"
                value={formData.goalsScored.toString()}
                onChange={handleChange}
                isInvalid={!!errors.goalsScored}
                errorMessage={errors.goalsScored}
                isRequired
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {isEdit ? "Guardar Cambios" : "Crear Tabla de Posiciones"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
