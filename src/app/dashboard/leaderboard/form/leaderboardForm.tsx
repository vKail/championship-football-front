'use client'
import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { ILeaderboard } from "../interface/leaderboard.interface";
import { ITeam } from "../../teams/interfaces/teams.interface";
import { ISeason } from "../../seasons/interface/season.interface";

interface LeaderboardFormProps {
  leaderboard: ILeaderboard | null;
  isEdit: boolean;
  onSave: (leaderboard: ILeaderboard) => void;
  onClose: () => void;
  teams: ITeam[];
  seasons: ISeason[];
}

export default function LeaderboardForm({ leaderboard, isEdit, onSave, onClose, teams, seasons }: LeaderboardFormProps) {
  const [formData, setFormData] = useState<ILeaderboard>({
    leaderboard_id: "",
    season: { season_id: "", season_name: "" },
    category: { category_id: "", name: "" },
    team: { team_id: "", name: "", dt: { dt_id: "", dni: "", firstname: "", lastname: "", team: "" }, category: { category_id: "", name: "" } },
    points: 0,
    matches_won: 0,
    matches_draw: 0,
    matches_lost: 0,
    goals_scored: 0,
  });

  useEffect(() => {
    if (isEdit && leaderboard) {
      setFormData(leaderboard);
    } else {
      setFormData({
        leaderboard_id: "",
        season: { season_id: "", season_name: "" },
        category: { category_id: "", name: "" },
        team: { team_id: "", name: "", dt: { dt_id: "", dni: "", firstname: "", lastname: "", team: "" }, category: { category_id: "", name: "" } },
        points: 0,
        matches_won: 0,
        matches_draw: 0,
        matches_lost: 0,
        goals_scored: 0,
      });
    }
  }, [isEdit, leaderboard]);

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
            <ModalHeader>{isEdit ? "Editar Tabla de Posiciones" : "Crear Tabla de Posiciones"}</ModalHeader>
            <ModalBody>
              <Input label="Equipo" name="team" value={formData.team.name} onChange={handleChange} />
                <Input label="Puntos" name="points"  value={formData.points.toString()} onChange={handleChange} />
                <Input label="Partidos Ganados" name="matches_won" value={formData.matches_won.toString()} onChange={handleChange} />
                <Input label="Partidos Empatados" name="matches_draw" value={formData.matches_draw.toString()} onChange={handleChange} />
                <Input label="Partidos Perdidos" name="matches_lost" value={formData.matches_lost.toString()} onChange={handleChange} />
                <Input label="Goles Anotados" name="goals_scored" value={formData.goals_scored.toString()} onChange={handleChange} />

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
