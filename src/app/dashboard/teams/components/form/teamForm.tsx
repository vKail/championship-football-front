import { useState, useEffect, use } from "react";
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
  const [searchCategory, setSearchCategory] = useState<number[]>([])
  const [formData, setFormData] = useState<ITeam>({
    name: "",
    playerIds: [],
    categoryIds: [],
  });

  useEffect(() => {
    if (isEdit && team) {
      setFormData(team);
    } else {
      setFormData({
        name: "",
        playerIds: [],
        categoryIds: [],
      });
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
    console.log("Selected keys:", keys);
  
    const selectedCategories = Array.from(keys)
      .map((key) => {
        const numericKey = Number(key); 
        
        return categories?.find((cat) => cat.categoryId === numericKey);
      })
      .filter(Boolean); // Filtrar cualquier resultado 'undefined'
    
    const selectedCategoryIds = selectedCategories.map((category) => category?.categoryId).filter((id): id is number => id !== undefined);
    setSearchCategory(selectedCategoryIds);
    console.log("Selected categories:", selectedCategories);
  
    setFormData({
      ...formData,
      categoryIds: searchCategory ?? [] , // Asegúrate de que 'category' sea un array de categorías seleccionadas
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
                onSelectionChange={(keys) =>
                  handleSelectChange(keys as Set<React.Key>)
                }
              >
                {(categories ?? []).map((category) => (
                  <SelectItem
                    key={category.categoryId ?? ""}
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
