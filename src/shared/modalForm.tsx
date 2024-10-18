"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

export default function ModalForm() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button onPress={openModal} color="primary">
        Crear
      </Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Formulario</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="DNI"
                  placeholder="Ingresa tu DNI"
                  variant="bordered"
                  defaultValue=""
                />
                <Input
                  label="Nombre"
                  placeholder="Ingresa tu nombre"
                  variant="bordered"
                  defaultValue=""
                />
                <Input
                  label="Apellido"
                  placeholder="Ingresa tu apellido"
                  variant="bordered"
                  defaultValue=""
                />
                <Input
                  label="Nombre de Usuario"
                  placeholder="Ingresa tu usuario"
                  variant="bordered"
                  defaultValue=""
                />
                <Input
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  type="password"
                  variant="bordered"
                  defaultValue=""
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={closeModal}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={closeModal}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
