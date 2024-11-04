import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IUser } from "../../interfaces/users.interfaces";

enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}

interface UserFormProps {
  user: IUser | null;
  isEdit: boolean;
  onSave: (user: IUser) => void;
  onClose: () => void;
}

const validationRules: { [key in keyof IUser]?: { regex?: RegExp; check?: (value: string) => boolean; message: string } } = {
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
  username: {
    check: (value: string) => value.length >= 3,
    message: "El nombre de usuario debe tener al menos 3 caracteres.",
  },
  password: {
    check: (value: string) => value.length >= 6,
    message: "La contraseña debe tener al menos 6 caracteres.",
  },
  role: {
    check: (value: string) => Object.values(Roles).includes(value as Roles),
    message: "El rol seleccionado no es válido.",
  },
};

export default function UserForm({ user, isEdit, onSave, onClose }: UserFormProps) {
  const [formData, setFormData] = useState<IUser>({
    dni: "",
    firstname: "",
    lastname: "",
    username: "",
    role: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateField = (name: keyof IUser, value: string) => {
    const rule = validationRules[name];
    if (rule) {
      const { regex, check, message } = rule;
      if ((regex && !regex.test(value)) || (check && !check(value))) {
        return message;
      }
    }
    return undefined; // Sin error
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof IUser, String(formData[key as keyof IUser]));
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name as keyof IUser, value);
    setErrors({ ...errors, [name]: error || "" });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, role: value });

  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
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
              <Input
                label="Nombre de Usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
                color={errors.username ? "danger" : "default"}
                errorMessage={errors.username}
                isRequired
              />
              <Select
                label="Rol"
                name="role"
                value={formData.role}
                onChange={handleSelectChange}
                isRequired
              >
                <SelectItem key={Roles.ADMIN} value={Roles.ADMIN}>Administrador</SelectItem>
                <SelectItem key={Roles.USER} value={Roles.USER}>Usuario</SelectItem>
              </Select>
              <Input
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                color={errors.password ? "danger" : "default"}
                errorMessage={errors.password}
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
