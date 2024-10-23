'use client'
import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { ITeam } from "../../teams/interfaces/teams.interface";
import { ISeason } from "../../seasons/interface/season.interface";
import { IMatch } from "../interface/matches.interface";

interface MatchFormProps {
  match: IMatch | null;
  isEdit: boolean;
  onSave: (match: IMatch) => void;
  onClose: () => void;
  teams: ITeam[];
  seasons: ISeason[];
}

export default function MatchForm({ match, isEdit, onSave, onClose, teams, seasons }: MatchFormProps) {
  const [formData, setFormData] = useState<IMatch>({
    match_id: "",
    date: "",
    team_1: "",
    team_2: "",
    result: "",
    status: "",
    season: { season_id: "", season_name: "" },
    category: { category_id: "", name: "" },
  });

  useEffect(() => {
    if (isEdit && match) {
      setFormData(match);
    } else {
      setFormData({
        match_id: "",
        date: "",
        team_1: "",
        team_2: "",
        result: "",
        status: "",
        season: { season_id: "", season_name: "" },
        category: { category_id: "", name: "" },
      });
    }
  }, [isEdit, match]);

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
            <ModalHeader>{isEdit ? "Editar Partido" : "Crear Partido"}</ModalHeader>
            <ModalBody>
              <Input label="Fecha" name="date" value={formData.date} onChange={handleChange} />
              <Input label="Equipo 1" name="team_1" value={formData.team_1} onChange={handleChange} />
              <Input label="Equipo 2" name="team_2" value={formData.team_2} onChange={handleChange} />
              <Input label="Resultado" name="result" value={formData.result} onChange={handleChange} />
              <Input label="Estado" name="status" value={formData.status} onChange={handleChange} />
              {/* Selecciona la temporada y categoría */}
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
