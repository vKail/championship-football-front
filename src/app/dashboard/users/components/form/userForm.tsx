import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IUser } from "../../interfaces/users.interfaces";



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
    role: "",
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
        role: "",
        password: "",
      });
    }
  }, [isEdit, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

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
                isRequired
              />
              <Input
                label="Nombre"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                isRequired
              />
              <Input
                label="Apellido"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                isRequired
              />
              <Input
                label="Nombre de Usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                isRequired
              />
              <Select
                label="Rol"
                name="role"
                value={formData.role}
                onChange={handleSelectChange}
                isRequired
              >
                <SelectItem key="ADMIN" value="ADMIN">Administrador</SelectItem>
                <SelectItem key="USER" value="USER">Usuario</SelectItem>
              </Select>
              <Input
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                isRequired
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
