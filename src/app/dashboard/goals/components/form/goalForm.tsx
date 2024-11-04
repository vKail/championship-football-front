import { useState, useEffect } from "react";
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

const validationRules = {
  minute: {
    check: (value: number) => value > 0 && value <= 90,
    message: "El minuto debe estar entre 1 y 90.",
  },
  playerId: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar un jugador.",
  },
  matchId: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar un partido.",
  },
  teamId: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar un equipo.",
  },
};

export default function GoalForm({ goal, isEdit, onSave, onClose }: GoalFormProps) {
  const { teams, handleGetAllTeams } = useTeams();
  const { players, handleGetAllPlayers } = usePlayers();
  const { matches, handleGetAllMatches } = useMatch();

  const [formData, setFormData] = useState<IGoal>({
    goalId: 0,
    playerId: 0,
    matchId: 0,
    minute: 0,
    teamId: 0,
  });

  // Estado para los selects
  const [selectedPlayer, setSelectedPlayer] = useState<Set<string>>(new Set());
  const [selectedTeam, setSelectedTeam] = useState<Set<string>>(new Set());
  const [selectedMatch, setSelectedMatch] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isEdit && goal) {
      setFormData(goal);
      // Inicializar los selects con los valores existentes
      setSelectedPlayer(new Set([goal.playerId.toString()]));
      setSelectedTeam(new Set([goal.teamId.toString()]));
      setSelectedMatch(new Set([goal.matchId.toString()]));
    } else {
      setFormData({
        goalId: 0,
        playerId: 0,
        matchId: 0,
        minute: 0,
        teamId: 0,
      });
      // Limpiar selecciones
      setSelectedPlayer(new Set());
      setSelectedTeam(new Set());
      setSelectedMatch(new Set());
    }
  }, [isEdit, goal]);

  useEffect(() => {
    handleGetAllTeams();
    handleGetAllPlayers();
    handleGetAllMatches();
  }, []);

  const validateField = (name: keyof IGoal, value: number) => {
    const rule = validationRules[name as Exclude<keyof IGoal, 'goalId'>];
    if (rule && !rule.check(value)) {
      return rule.message;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value, 10);
    setFormData({ ...formData, [name]: numericValue });

    const error = validateField(name as keyof IGoal, numericValue);
    setErrors({ ...errors, [name]: error ?? '' });
  };

  const handlePlayerChange = (keys: Set<string>) => {
    setSelectedPlayer(keys);
    const playerId = parseInt(Array.from(keys)[0] || '0', 10);
    setFormData(prev => ({ ...prev, playerId }));
    const error = validateField('playerId', playerId);
    setErrors(prev => ({ ...prev, playerId: error ?? '' }));
  };

  const handleTeamChange = (keys: Set<string>) => {
    setSelectedTeam(keys);
    const teamId = parseInt(Array.from(keys)[0] || '0', 10);
    setFormData(prev => ({ ...prev, teamId }));
    const error = validateField('teamId', teamId);
    setErrors(prev => ({ ...prev, teamId: error ?? '' }));
  };

  const handleMatchChange = (keys: Set<string>) => {
    setSelectedMatch(keys);
    const matchId = parseInt(Array.from(keys)[0] || '0', 10);
    setFormData(prev => ({ ...prev, matchId }));
    const error = validateField('matchId', matchId);
    setErrors(prev => ({ ...prev, matchId: error ?? '' }));
  };

  const handleSubmit = () => {
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const value = formData[key as keyof IGoal] ?? 0;
      const error = validateField(key as keyof IGoal, value);
      if (error) acc[key] = error;
      return acc;
    }, {} as { [key: string]: string });

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
            <ModalHeader>{isEdit ? "Editar Gol" : "Crear Gol"}</ModalHeader>
            <ModalBody>
              <Input
                label="Minuto"
                name="minute"
                placeholder="Ingrese el minuto"
                type="number"
                value={formData.minute.toString()}
                onChange={handleChange}
                isInvalid={!!errors.minute}
                color={errors.minute ? "danger" : "default"}
                errorMessage={errors.minute}
              />
              <Select
                label="Jugador"
                selectedKeys={selectedPlayer}
                onSelectionChange={keys => handlePlayerChange(keys as Set<string>)}
                isInvalid={!!errors.playerId}
                errorMessage={errors.playerId}
              >
                {(players || []).map((player) => (
                  <SelectItem key={player.playerId.toString()} value={player.playerId}>
                    {`${player.firstname} ${player.lastname}`}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Equipo"
                selectedKeys={selectedTeam}
                onSelectionChange={keys => handleTeamChange(keys as Set<string>)}
                isInvalid={!!errors.teamId}
                errorMessage={errors.teamId}
              >
                {(teams || []).map((team) => (
                  <SelectItem key={team.teamId?.toString() ?? "0"} value={team.teamId ?? 0}>
                    {team.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Partido"
                selectedKeys={selectedMatch}
                onSelectionChange={keys => handleMatchChange(keys as Set<string>)}
                isInvalid={!!errors.matchId}
                errorMessage={errors.matchId}
              >
                {(matches || []).map((match) => (
                  <SelectItem key={match?.matchId?.toString() ?? "0"} value={match?.matchId ?? 0}>
                    {`${match.homeTeamName} vs ${match.awayTeamName}`}
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