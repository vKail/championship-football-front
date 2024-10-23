import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { ISeason } from "../interface/season.interface";
import SeasonForm from "../form/seasonForm";

const initialSeasons: ISeason[] = [{ season_id: "S001", season_name: "Temporada 2024" }];

export default function SeasonTable() {
  const [seasons, setSeasons] = useState<ISeason[]>(initialSeasons);
  const [selectedSeason, setSelectedSeason] = useState<ISeason | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (season: ISeason) => {
    setSelectedSeason(season);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSaveSeason = (season: ISeason) => {
    if (isEdit) {
      setSeasons((prev) => prev.map((s) => (s.season_id === season.season_id ? season : s)));
    } else {
      setSeasons((prev) => [...prev, season]);
    }
    setIsOpen(false);
    setSelectedSeason(null);
    setIsEdit(false);
  };

  const handleDelete = (season_id: string) => {
    setSeasons((prev) => prev.filter((s) => s.season_id !== season_id));
  };

  const renderCell = (season: ISeason, columnKey: keyof ISeason | "actions") => {
    const cellValue = season[columnKey as keyof ISeason];
    if (columnKey === "actions") {
      return (
        <div className="flex gap-2">
          <Tooltip content="Edit Season">
            <span onClick={() => handleEdit(season)}><EditIcon /></span>
          </Tooltip>
          <Tooltip content="Delete Season">
            <span onClick={() => handleDelete(season.season_id)}><DeleteIcon /></span>
          </Tooltip>
        </div>
      );
    }
    return cellValue as React.ReactNode;
  };

  return (
    <>
      <Table aria-label="Season table">
        <TableHeader columns={[{ uid: "season_id", name: "ID" }, { uid: "season_name", name: "Nombre" }, { uid: "actions", name: "Acciones" }]}>
          {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={seasons}>
          {(item) => <TableRow key={item.season_id}>{(columnKey) => <TableCell>{renderCell(item, columnKey as keyof ISeason | "actions")}</TableCell>}</TableRow>}
        </TableBody>
      </Table>

      {isOpen && <SeasonForm season={selectedSeason} isEdit={isEdit} onSave={handleSaveSeason} onClose={() => { setIsOpen(false); setSelectedSeason(null); setIsEdit(false); }} />}
    </>
  );
}
