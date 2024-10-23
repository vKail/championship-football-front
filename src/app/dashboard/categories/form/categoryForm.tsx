import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { ICategory } from "../interface/categories.interface";


interface CategoryFormProps {
  category: ICategory | null; // Categoría seleccionada o null si es una nueva
  isEdit: boolean; // Si está en modo de edición o creación
  onSave: (category: ICategory) => void; // Función para guardar la categoría
  onClose: () => void; // Función para cerrar el formulario
}

export default function CategoryForm({ category, isEdit, onSave, onClose }: CategoryFormProps) {
  // Estado local para manejar los datos del formulario
  const [formData, setFormData] = useState<ICategory>({
    category_id: "",
    name: "",
  });

  // Efecto para llenar los campos si es modo edición
  useEffect(() => {
    if (isEdit && category) {
      setFormData(category);
    } else {
      // Si no es edición, inicializa el formulario vacío
      setFormData({
        category_id: "",
        name: "",
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
                name="name"
                placeholder="Ingrese el nombre de la categoría"
                variant="bordered"
                value={formData.name}
                onChange={handleChange}
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
