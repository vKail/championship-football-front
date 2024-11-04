import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { ICategory } from "../../interface/categories.interface";

interface CategoryFormProps {
  category: ICategory | null;
  isEdit: boolean;
  onSave: (category: ICategory) => void;
  onClose: () => void;
}

const validationRules: { [key in keyof ICategory]: { regex?: RegExp; check?: (value: any, formData?: ICategory) => boolean; message: string } } = {
  categoryName: {
    regex: /^[A-Za-z]+\-[0-9]{1,2}$/,
    message: "El nombre de la categoría debe seguir el formato 'Nombre-Edad'.",
  },
  ageMin: {
    check: (value: number) => value >= 0,
    message: "La edad mínima debe ser un número no negativo.",
  },
  ageMax: {
    check: (value: number, formData?: ICategory) => formData ? value >= formData.ageMin : false,
    message: "La edad máxima debe ser mayor o igual a la edad mínima.",
  },
};

export default function CategoryForm({
  category,
  isEdit,
  onSave,
  onClose,
}: CategoryFormProps) {
  const [formData, setFormData] = useState<ICategory>({
    categoryName: "",
    ageMin: 0,
    ageMax: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isEdit && category) {
      setFormData(category);
    } else {
      setFormData({
        categoryName: "",
        ageMin: 0,
        ageMax: 0,
      });
    }
  }, [isEdit, category]);

  const validateField = (name: keyof ICategory, value: string | number) => {
    const rule = validationRules[name];
    if (rule) {
      const { message } = rule;
      if ('regex' in rule && rule.regex && !rule.regex.test(value as string)) {
        return message;
      }
      if ('check' in rule && rule.check && !rule.check(value as number, formData)) {
        return message;
      }
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = name === "ageMin" || name === "ageMax" ? parseInt(value) : value;

    setFormData({ ...formData, [name]: numericValue });

    const error = validateField(name as keyof ICategory, numericValue);
    setErrors({ ...errors, [name]: error ?? '' });
  };

  const handleSubmit = () => {
    const newErrors = (Object.keys(formData) as (keyof ICategory)[]).reduce(
      (acc, key) => {
        const value = formData[key];
        const error = validateField(key, value ?? '');
        if (error) acc[key] = error;
        return acc;
      },
      {} as { [key: string]: string }
    );

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
            <ModalHeader className="flex flex-col gap-1">
              {isEdit ? "Editar Categoría" : "Crear Categoría"}
            </ModalHeader>
            <ModalBody>
              <Input
                label="Nombre de la Categoría"
                name="categoryName"
                placeholder="Ingrese el nombre de la categoría"
                variant="bordered"
                value={formData.categoryName}
                onChange={handleChange}
                isInvalid={!!errors.categoryName}
                errorMessage={errors.categoryName}
                isRequired
              />
              <Input
                label="Edad mínima de la categoría"
                name="ageMin"
                placeholder="Ingrese la edad mínima de la categoría"
                variant="bordered"
                type="number"
                value={formData.ageMin.toString()}
                onChange={handleChange}
                isInvalid={!!errors.ageMin}
                errorMessage={errors.ageMin}
                isRequired
              />
              <Input
                label="Edad máxima de la categoría"
                name="ageMax"
                placeholder="Ingrese la edad máxima de la categoría"
                variant="bordered"
                type="number"
                value={formData.ageMax.toString()}
                onChange={handleChange}
                isInvalid={!!errors.ageMax}
                errorMessage={errors.ageMax}
                isRequired
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {isEdit ? "Guardar Cambios" : "Crear Categoría"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
