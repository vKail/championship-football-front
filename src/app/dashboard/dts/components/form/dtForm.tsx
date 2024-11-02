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
import { IDt } from "../../interfaces/dts.interface";
import useTeams from "@/app/dashboard/teams/hooks/useTeams";
import useDt from "../../hooks/useDt";

interface DtFormProps {
  dt: IDt | null;
  isEdit: boolean;
  onSave: (dt: IDt) => void;
  onClose: () => void;
}

export default function DtForm({ dt, isEdit, onSave, onClose }: DtFormProps) {
  const {handleGetAllTeams, teams, team} = useTeams();
  const {handleCreateDt} = useDt();
  const [formData, setFormData] = useState<IDt>({
    dni: "",
    firstname: "",
    lastname: "",
    teamId: 0,
  });

  useEffect(() => {
    if (isEdit && dt) {
      setFormData(dt);
    } else {
      setFormData({
        dni: "",
        firstname: "",
        lastname: "",
        teamId: 0,
      });
    }
  }, [isEdit, dt]);

  useEffect(() => {
    handleGetAllTeams();
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
    handleCreateDt(formData);
  };

  return (
    <Modal isOpen onOpenChange={onClose} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>{isEdit ? "Editar DT" : "Crear DT"}</ModalHeader>
            <ModalBody>
              <Input
                label="DNI"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
              />
              <Input
                label="Nombre"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              <Input
                label="Apellido"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
              <Select
                label="Equipo"
                name="teamId"
                value={formData.teamId}
                onChange={handleSelectChange}
              >
                {(teams || []).map((team) => (
                  <SelectItem key={team.teamId ?? ''} value={team.teamId ?? 0}>
                    {team.name}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {isEdit ? "Guardar Cambios" : "Crear DT"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
