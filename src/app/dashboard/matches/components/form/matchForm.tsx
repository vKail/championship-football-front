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

export default function MatchForm({
  match,
  isEdit,
  onSave,
  onClose,
}: MatchFormProps) {
  const {handleCreateMatch} = useMatch();
  const {teams , handleGetAllTeams} = useTeams();
  const {categories, handleGetAllCategories} = useCategory();
  const {seasons, handleGetAllSeasons} = useSeason();
  const [formData, setFormData] = useState<IMatch>({
    matchDate:null,
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
    } else {
      setFormData({
        matchDate: null,
        awayTeamId: 0,
        homeTeamId: 0,
        result: "-",
        status: "Pendiente",
        category: 0,
        season: 0,
      });
    }
  }, [isEdit, match]);

  useEffect(() => {
    handleGetAllTeams();
    handleGetAllCategories();
    handleGetAllSeasons();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newDate: DateValue | null) => {
    setFormData({
      ...formData,
      matchDate: newDate ? newDate.toString() : null,
    });
  }

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
              <ModalHeader>
                {isEdit ? "Editar Partido" : "Crear Partido"}
              </ModalHeader>
              <ModalBody>
                <DatePicker
                  label="Fecha de partido"
                  name="matchDate"
                  defaultValue={
                    formData.matchDate
                      ? parseDate(formData.matchDate.toString())
                      : undefined
                  }
                  onChange={(newDate) => handleDateChange(newDate)}
                  isRequired
                />
                <Select
                  label="Equipo Local"
                  name="homeTeamId"
                  value={formData.homeTeamId.toString()}
                  onChange={handleSelectChange}
                >
                  {(teams || []).map((team) => (
                    <SelectItem key={team.teamId ?? 0} value={team.teamId ?? ''}>
                      {team.name}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Equipo Visitante"
                  name="awayTeamId"
                  value={formData.awayTeamId.toString()}
                  onChange={handleSelectChange}
                >
                  {(teams || []).map((team) => (
                    <SelectItem key={team.teamId ?? 0} value={team.teamId ?? ''}>
                      {team.name}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Temporada"
                  name="season"
                  value={formData.season.toString()}
                  onChange={handleSelectChange}
                >
                  {(seasons || []).map((season) => (
                    <SelectItem key={season.seasonId ?? 0} value={season.seasonId ?? ''}>
                      {season.seasonName}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Categoría"
                  name="category"
                  value={formData.category.toString()}
                  onChange={handleSelectChange}
                >
                  {(categories || []).map((category) => (
                    <SelectItem key={category.categoryId ?? 0} value
                    ={category.categoryId ?? ''}>
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
  };

