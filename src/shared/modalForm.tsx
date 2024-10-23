"use client";
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
import React, { useEffect, useState } from "react";
import { IField, IOption } from "@/shared/interfaces/InputField.interface";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  fields: IField[];
  data?: { [key: string]: string };
  onSubmit: (data: any) => void;
}

export default function ModalForm({
  isOpen,
  onClose,
  fields,
  data = {},
  onSubmit,
}: IModal) {

  const [valueForm, setValueForm] = useState<{ [key: string]: string }>({});

    useEffect(() => {
      const initialValue: { [key: string]: string } = {};
      fields.forEach((field) => {
        initialValue[field.id] = data[field.id] || field.value;
      });
      setValueForm(initialValue);
    }, [data, fields]);

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (fieldId: string, value: string) => {
    setValueForm((prevData) => ({
      ...prevData,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(valueForm);
    setValueForm({});
  };

  const renderField = (field: IField) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            key={field.id}
            label={field.label}
            className="mb-4"
            selectedKeys={
              valueForm[field.id] ? new Set([valueForm[field.id]]) : new Set()
            }
            onSelectionChange={(keys) => {
              const selectedValue = Array.from(keys).join(""); // Convert Set back to string
              handleSelectChange(field.id, selectedValue); // Call handler with selected value
            }}
          >
            {(field.options || []).map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        );

      default:
        return (
          <Input
            key={field.id}
            name={field.id}
            label={field.label}
            type={field.type}
            value={valueForm[field.id] || ""}
            onChange={handlerOnChange}
            className="mb-4"
          />
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              {Object.keys(data).length ? "Editar" : "Crear"} Usuario
            </ModalHeader>

            <ModalBody>{fields.map((field) => renderField(field))}</ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                {Object.keys(data).length ? "Actualizar" : "Guardar"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
