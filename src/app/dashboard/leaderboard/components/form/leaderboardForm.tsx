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

export default function LeaderboardForm({
  leaderboard,
  isEdit,
  onSave,
  onClose,
}: LeaderboardFormProps) {
  const { handleGetAllTeams, teams } = useTeams();
  const { seasons, handleGetAllSeasons } = useSeason();
  const { categories, handleGetAllCategories } = useCategory();
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
    } else {
      setFormData({
        teamId: 0,
        seasonId: 0,
        categoryId: 0,
        points: 0,
        matchesWon: 0,
        matchesDrawn: 0,
        matchesLost: 0,
        goalsScored: 0,
      });
    }
  }, [isEdit, leaderboard]);

  useEffect(() => {
    handleGetAllTeams();
    handleGetAllSeasons();
    handleGetAllCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal isOpen onOpenChange={onClose} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              {isEdit
                ? "Editar Tabla de Posiciones"
                : "Crear Tabla de Posiciones"}
            </ModalHeader>
            <ModalBody>
              <Select
                label="Equipo"
                name="teamId"
                value={formData.teamId.toString()}
                onChange={handleSelectChange}
              >
                {(teams || []).map((team: ITeam) => (
                  <SelectItem key={team.teamId ?? 0} value={team.teamId}>
                    {team.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Temporada"
                name="seasonId"
                value={formData.seasonId.toString()}
                onChange={handleSelectChange}
              >
                {(seasons || []).map((season: ISeason) => (
                  <SelectItem
                    key={season.seasonId ?? 0}
                    value={season.seasonId}
                  >
                    {season.seasonName}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Categoría"
                name="categoryId"
                value={formData.categoryId.toString()}
                onChange={handleSelectChange}
              >
                {(categories || []).map((category) => (
                  <SelectItem
                    key={category.categoryId ?? 0}
                    value={category.categoryId}
                  >
                    {category.categoryName}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Puntos"
                name="points"
                value={formData.points.toString()}
                onChange={handleChange}
              />
              <Input
                label="Partidos Ganados"
                name="matches_won"
                value={formData.matchesWon.toString()}
                onChange={handleChange}
              />
              <Input
                label="Partidos Empatados"
                name="matches_draw"
                value={formData.matchesDrawn.toString()}
                onChange={handleChange}
              />
              <Input
                label="Partidos Perdidos"
                name="matches_lost"
                value={formData.matchesLost.toString()}
                onChange={handleChange}
              />
              <Input
                label="Goles Anotados"
                name="goals_scored"
                value={formData.goalsScored.toString()}
                onChange={handleChange}
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
