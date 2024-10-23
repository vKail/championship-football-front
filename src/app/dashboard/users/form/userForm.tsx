import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { IUser } from "../interfaces/users.interfaces";

interface UserFormProps {
  user: IUser | null;
  isEdit: boolean;
  onSave: (user: IUser) => void;
  onClose: () => void;
}

export default function UserForm({ user, isEdit, onSave, onClose }: UserFormProps) {
  const [formData, setFormData] = useState<IUser>({
    dni: "",
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isEdit && user) {
      setFormData(user);
    } else {
      setFormData({
        dni: "",
        firstname: "",
        lastname: "",
        username: "",
        password: "",
      });
    }
  }, [isEdit, user]);

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
            <ModalHeader>{isEdit ? "Editar Usuario" : "Crear Usuario"}</ModalHeader>
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
              <Input
                label="Nombre de Usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <Input
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {isEdit ? "Guardar Cambios" : "Crear Usuario"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
