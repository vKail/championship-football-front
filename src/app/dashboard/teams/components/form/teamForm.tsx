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
import { ITeam } from "../../interfaces/teams.interface";
import useCategory from "@/app/dashboard/categories/hooks/useCategry";
import { ICategory } from "@/app/dashboard/categories/interface/categories.interface";

interface TeamFormProps {
  team: ITeam | null;
  isEdit: boolean;
  onSave: (team: ITeam) => void;
  onClose: () => void;
}

const validationRules = {
  name: {
    regex: /^[A-Za-z\s]+$/,
    message: "El nombre solo puede contener letras y espacios.",
  },
  categoryIds: {
    check: (value: number[]) => value.length > 0,
    message: "Debe seleccionar al menos una categoría.",
  },
};

export default function TeamForm({
  team,
  isEdit,
  onSave,
  onClose,
}: TeamFormProps) {
  const { categories, handleGetAllCategories } = useCategory();
  const [formData, setFormData] = useState<ITeam>({
    name: "",
    playerIds: [],
    categoryIds: [],
  });

  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isEdit && team) {
      setFormData({
        ...team,
        categoryIds: team.categoryIds ?? [],
      });
      
      const selectedKeys = new Set((team.categoryIds ?? []).map(id => id.toString()));
      setSelectedCategories(selectedKeys);
    } else {
      setFormData({
        name: "",
        playerIds: [],
        categoryIds: [],
      });
      setSelectedCategories(new Set());
    }
  }, [isEdit, team]);

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  const validateField = (name: keyof ITeam, value: string | number[]) => {
    const rule = validationRules[name as keyof typeof validationRules];
    if (rule) {
      const { message } = rule;
      if ("regex" in rule && !rule.regex.test(value as string)) {
        return message;
      }
      if ("check" in rule && !rule.check(value as number[])) {
        return message;
      }
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name as keyof ITeam, value);
    setErrors({ ...errors, [name]: error ?? "" });
  };

  const handleSelectChange = (keys: Set<React.Key>) => {
    setSelectedCategories(keys as Set<string>);

    const selectedCategoryIds = Array.from(keys)
      .map((key) => Number(key))
      .filter((id) => !isNaN(id));

    setFormData({
      ...formData,
      categoryIds: selectedCategoryIds,
    });

    const error = validateField("categoryIds", selectedCategoryIds);
    setErrors({ ...errors, categoryIds: error ?? "" });
  };

  const handleSubmit = () => {
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const value = formData[key as keyof ITeam];
      if (value !== undefined) {
        const error = validateField(key as keyof ITeam, Array.isArray(value) || typeof value === 'string' ? value : value.toString());
        if (error) acc[key] = error;
      }
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
            <ModalHeader>{isEdit ? "Editar Equipo" : "Crear Equipo"}</ModalHeader>
            <ModalBody>
              <Input
                label="Nombre del Equipo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                color={errors.name ? "danger" : "default"}
                errorMessage={errors.name}
                isRequired
              />
              <Select
                selectionMode="multiple"
                label="Categoría"
                selectedKeys={selectedCategories}
                onSelectionChange={(keys) => handleSelectChange(keys as Set<React.Key>)}
                isInvalid={!!errors.categoryIds}
                errorMessage={errors.categoryIds}
              >
                {(categories ?? []).map((category) => (
                  <SelectItem key={category.categoryId?.toString() ?? ""} value={category.categoryId ?? ""}>
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
                {isEdit ? "Guardar Cambios" : "Crear Equipo"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
