import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { ICategory } from "../../interface/categories.interface";
import useCategory from "../../hooks/useCategry";



interface CategoryFormProps {
  category: ICategory | null; // Categoría seleccionada o null si es una nueva
  isEdit: boolean; // Si está en modo de edición o creación
  onSave: (category: ICategory) => void; // Función para guardar la categoría
  onClose: () => void; // Función para cerrar el formulario
}

export default function CategoryForm({ category, isEdit, onSave, onClose }: CategoryFormProps) {
  
  const [formData, setFormData] = useState<ICategory>({
    categoryName: "",
    ageMin: 0,
    ageMax: 0,
  });

  // Efecto para llenar los campos si es modo edición
  useEffect(() => {
    if (isEdit && category) {
      setFormData(category);
    } else {
      // Si no es edición, inicializa el formulario vacío
      setFormData({
        categoryName: "",
        ageMin: 0,
        ageMax: 0,
      });
    }
  }, [isEdit, category]);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    // Llamamos a la función onSave que recibimos como prop
    onSave(formData);
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
