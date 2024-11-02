import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import DtForm from "../form/dtForm";
import { IDt, IDtResponse } from "../../interfaces/dts.interface";
import useDt from "../../hooks/useDt";

export default function DtTable() {
  const {dts, handleGetAllDts, handleUpdateDt, handleRemoveDt} = useDt();
  const [selectedDt, setSelectedDt] = useState<IDt | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleGetAllDts();
  }, []);

  const handleEdit = (dt: IDtResponse) => {
    setSelectedDt(dt);
    setIsOpen(true);
  };

  const handleSaveDt = (dt: IDt) => {
    handleUpdateDt(dt);
    setIsOpen(false);
    setSelectedDt(null);
  };

  const handleDelete = (dtId: number) => {
    handleRemoveDt(dtId);
  };

  const renderCell = (dt: IDtResponse, columnKey: keyof IDtResponse | "actions") => {
    const cellValue = dt[columnKey as keyof IDt];

    // Si la columna es "actions", renderea los iconos de editar y eliminar
    if (columnKey === "actions") {
      return (
        <div className="flex gap-2">
          <Tooltip content="Edit DT">
            <span onClick={() => handleEdit(dt)}>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip content="Delete DT">
            <span onClick={() => handleDelete(dt.dtId ?? 0)}>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }

    // Si la columna es "team", mostramos el nombre del equipo
    if (columnKey === "teamName") {
      return dt.teamName || "Sin equipo"; // Muestra el nombre del equipo
    }

    return cellValue as React.ReactNode;
  };

  return (
    <>
      <Table aria-label="DT table">
        <TableHeader
          columns={[
            { uid: "dni", name: "DNI" },
            { uid: "firstname", name: "Nombre" },
            { uid: "lastname", name: "Apellido" },
            { uid: "teamName", name: "Equipo" },
            { uid: "actions", name: "Acciones" },
          ]}
        >
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
<TableBody items={dts ?? []}> 
  {(item) => (
    <TableRow key={item.dtId}>
      {(columnKey) => (
        <TableCell>
          {renderCell(item, columnKey as keyof IDt | "actions")}
        </TableCell>
      )}
    </TableRow>
  )}
</TableBody>

      </Table>

      {isOpen && (
        <DtForm
          dt={selectedDt}
          isEdit={true}
          onSave={handleSaveDt}
          onClose={() => {
            setIsOpen(false);
            setSelectedDt(null);
          }}
        />
      )}
    </>
  );
}
