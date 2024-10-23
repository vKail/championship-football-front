import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { IDt } from "../interfaces/dts.interface";

interface DtFormProps {
  dt: IDt | null;
  isEdit: boolean;
  onSave: (dt: IDt) => void;
  onClose: () => void;
}

export default function DtForm({ dt, isEdit, onSave, onClose }: DtFormProps) {
  const [formData, setFormData] = useState<IDt>({
    dt_id: "",
    dni: "",
    firstname: "",
    lastname: "",
    team: "",
  });

  useEffect(() => {
    if (isEdit && dt) {
      setFormData(dt);
    } else {
      setFormData({
        dt_id: "",
        dni: "",
        firstname: "",
        lastname: "",
        team: "",
      });
    }
  }, [isEdit, dt]);

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
            <ModalHeader>{isEdit ? "Editar DT" : "Crear DT"}</ModalHeader>
            <ModalBody>
              <Input label="DNI" name="dni" value={formData.dni} onChange={handleChange} />
              <Input label="Nombre" name="firstname" value={formData.firstname} onChange={handleChange} />
              <Input label="Apellido" name="lastname" value={formData.lastname} onChange={handleChange} />
              <Input label="Equipo" name="team" value={formData.team} onChange={handleChange} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>Cancelar</Button>
              <Button color="primary" onPress={handleSubmit}>{isEdit ? "Guardar Cambios" : "Crear DT"}</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
