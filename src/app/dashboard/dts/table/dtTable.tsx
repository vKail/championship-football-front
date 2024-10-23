import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import DtForm from "../form/dtForm";
import { IDt } from "../interfaces/dts.interface";

const initialDts: IDt[] = [
  { dt_id: "D001", dni: "12345678", firstname: "Juan", lastname: "Pérez", team: "T001" },
  // ... más DTs
];

export default function DtTable() {
  const [dts, setDts] = useState<IDt[]>(initialDts);
  const [selectedDt, setSelectedDt] = useState<IDt | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (dt: IDt) => {
    setSelectedDt(dt);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSaveDt = (dt: IDt) => {
    if (isEdit) {
      setDts((prev) => prev.map((d) => (d.dt_id === dt.dt_id ? dt : d)));
    } else {
      setDts((prev) => [...prev, dt]);
    }
    setIsOpen(false);
    setSelectedDt(null);
    setIsEdit(false);
  };

  const handleDelete = (dt_id: string) => {
    setDts((prev) => prev.filter((d) => d.dt_id !== dt_id));
  };

  const renderCell = (dt: IDt, columnKey: keyof IDt | "actions") => {
    const cellValue = dt[columnKey as keyof IDt];
    if (columnKey === "actions") {
      return (
        <div className="flex gap-2">
          <Tooltip content="Edit DT">
            <span onClick={() => handleEdit(dt)}><EditIcon /></span>
          </Tooltip>
          <Tooltip content="Delete DT">
            <span onClick={() => handleDelete(dt.dt_id)}><DeleteIcon /></span>
          </Tooltip>
        </div>
      );
    }
    return cellValue as React.ReactNode;
  };

  return (
    <>
      <Table aria-label="DT table">
        <TableHeader columns={[{ uid: "dni", name: "DNI" }, { uid: "firstname", name: "Nombre" }, { uid: "lastname", name: "Apellido" }, { uid: "team", name: "Equipo" }, { uid: "actions", name: "Acciones" }]}>
          {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={dts}>
          {(item) => <TableRow key={item.dt_id}>{(columnKey) => <TableCell>{renderCell(item, columnKey as keyof IDt | "actions")}</TableCell>}</TableRow>}
        </TableBody>
      </Table>

      {isOpen && <DtForm dt={selectedDt} isEdit={isEdit} onSave={handleSaveDt} onClose={() => { setIsOpen(false); setSelectedDt(null); setIsEdit(false); }} />}
    </>
  );
}
