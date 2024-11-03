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

export default function TeamForm({
  team,
  isEdit,
  onSave,
  onClose,
}: TeamFormProps) {
  const { categories, handleGetAllCategories, handleCreateCategory } = useCategory();
  const [formData, setFormData] = useState<ITeam>({
    name: "",
    playerIds: [],
    categoryIds: [],
  });
  
  // Estado para mantener las keys seleccionadas en el formato que espera NextUI
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isEdit && team) {
      setFormData({
        ...team,
        categoryIds: team.categoryIds ?? [],
      });
      
      // Convertir los categoryIds a strings y crear un Set para el Select
      const selectedKeys = new Set(
        (team.categoryIds ?? []).map(id => id.toString())
      );
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (keys: Set<React.Key>) => {
    setSelectedCategories(keys as Set<string>);
    
    const selectedCategoryIds = Array.from(keys)
      .map(key => Number(key))
      .filter(id => !isNaN(id));

    setFormData({
      ...formData,
      categoryIds: selectedCategoryIds,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal isOpen onOpenChange={onClose} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              {isEdit ? "Editar Equipo" : "Crear Equipo"}
            </ModalHeader>
            <ModalBody>
              <Input
                label="Nombre del Equipo"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Select
                selectionMode="multiple"
                label="Categoría"
                selectedKeys={selectedCategories}
                onSelectionChange={(keys) =>
                  handleSelectChange(keys as Set<React.Key>)
                }
              >
                {(categories ?? []).map((category) => (
                  <SelectItem
                    key={category.categoryId?.toString() ?? ""}
                    value={category.categoryId ?? ""}
                  >
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