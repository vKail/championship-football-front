import { useState, useEffect, use } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IGoal } from "../../interface/goal.interface";
import useTeams from "@/app/dashboard/teams/hooks/useTeams";
import usePlayers from "@/app/dashboard/players/hooks/usePlayer";
import useMatch from "@/app/dashboard/matches/hooks/useMatch";

interface GoalFormProps {
  goal: IGoal | null; 
  isEdit: boolean; 
  onSave: (goal: IGoal) => void; 
  onClose: () => void; 
}

export default function GoalForm({ goal, isEdit, onSave, onClose }: GoalFormProps) {
  const {teams, handleGetAllTeams} = useTeams();
  const {players, handleGetAllPlayers} = usePlayers();
  const {matches, handleGetAllMatches} = useMatch();

  const [formData, setFormData] = useState<IGoal>({
    goalId: 0,
    playerId: 0,
    matchId: 0,
    minute: 0,
    teamId: 0,
  });

  useEffect(() => {
    if (isEdit && goal) {
      setFormData(goal);
    } else {
    
      setFormData({
        goalId: 0,
        playerId: 0,
        matchId: 0,
        minute: 0,
        teamId: 0,
      });
    }
  }, [isEdit, goal]);

  useEffect(() => {
    handleGetAllTeams();
    handleGetAllPlayers();
    handleGetAllMatches();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) });
  }

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
              <Select
                label="Jugador"
                name="playerId"
                value={formData.playerId.toString()}
                onChange={handleSelectChange}
              >
                {(players || []).map((player) => (
                  <SelectItem key={player.playerId} value={player.playerId.toString()}>
                    {`${player.firstname || ''} ${player.lastname || ''}`}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Equipo"
                name="teamId"
                value={formData.teamId.toString()}
                onChange={handleSelectChange}
              >
                {(teams || []).map((team) => (
                  <SelectItem key={team.teamId ?? 0} value={(team.teamId ?? 0).toString()}>
                    {team.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Partido"
                name="matchId"
                value={formData.matchId.toString()}
                onChange={handleSelectChange}
              >
                {(matches || []).map((match) => (
                  <SelectItem key={match.matchId ?? 0} value={(match.matchId ?? 0).toString()}>
                    {`${match.homeTeamName || ''} vs ${match.awayTeamName || ''}`}
                  </SelectItem>
                ))}
              </Select>
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
