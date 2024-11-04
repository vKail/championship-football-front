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

const validationRules: { [key in keyof IDt]: { regex?: RegExp; check?: (value: number) => boolean; message: string } } = {
  dni: {
    regex: /^\d{10}$/,
    message: "El DNI debe tener exactamente 10 números.",
  },
  firstname: {
    regex: /^[A-Za-z]+$/,
    message: "El nombre solo puede contener letras.",
  },
  lastname: {
    regex: /^[A-Za-z]+$/,
    message: "El apellido solo puede contener letras.",
  },
  teamId: {
    check: (value: number) => value > 0,
    message: "Debe seleccionar un equipo.",
  },
};

export default function DtForm({ dt, isEdit, onSave, onClose }: DtFormProps) {
  const { handleGetAllTeams, teams } = useTeams();
  const { handleCreateDt } = useDt();

  const [formData, setFormData] = useState<IDt>({
    dni: "",
    firstname: "",
    lastname: "",
    teamId: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateField = (name: keyof IDt, value: string | number) => {
    const rule = validationRules[name];
    if (rule) {
      const { regex, check, message } = rule;
      if ((regex && !regex.test(value as string)) || (check && !check(value as number))) {
        return message;
      }
    }
    return undefined; // Sin error
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name as keyof IDt, value);
    setErrors({ ...errors, [name]: error || "" });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value);
    setFormData({ ...formData, [name]: parsedValue });

    const error = validateField(name as keyof IDt, parsedValue);
    setErrors({ ...errors, [name]: error || "" });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof IDt] ?? '';
      const error = validateField(key as keyof IDt, value);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si no hay errores
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
      handleCreateDt(formData);
    }
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
              <Select
                label="Equipo"
                name="teamId"
                value={formData.teamId}
                onChange={handleSelectChange}
                isInvalid={!!errors.teamId}
                color={errors.teamId ? "danger" : "default"}
                errorMessage={errors.teamId}
                isRequired
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
