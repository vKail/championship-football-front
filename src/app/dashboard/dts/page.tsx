'use client';
import { useState } from "react";
import { IDt } from "./interfaces/dts.interface";
import DtTable from "./table/dtTable";
import DtForm from "./form/dtForm";


export default function DtPage() {
  const [dts, setDts] = useState<IDt[]>([]);
  const [selectedDt, setSelectedDt] = useState<IDt | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = () => {
    setSelectedDt(null);
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedDt(null);
    setIsEdit(false);
  };

  const handleSaveDt = (dt: IDt) => {
    if (isEdit && selectedDt) {
      setDts((prev) =>
        prev.map((d) =>
          d.dt_id === selectedDt.dt_id ? dt : d
        )
      );
    } else {
      setDts((prev) => [...prev, dt]);
    }
    handleCloseForm();
  };

  const handleEditDt = (dt: IDt) => {
    setSelectedDt(dt);
    setIsEdit(true);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Entrenadores (DT)</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Crear Nuevo DT
        </button>
      </div>

      <DtTable />

      {isFormOpen && (
        <DtForm
          dt={selectedDt}
          isEdit={isEdit}
          onSave={handleSaveDt}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
