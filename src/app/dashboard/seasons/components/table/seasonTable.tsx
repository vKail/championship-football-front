import { use, useEffect, useState } from "react";
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
import { ISeason } from "../../interface/season.interface";
import SeasonForm from "../form/seasonForm";
import useSeason from "../../hooks/useSeason";

export default function SeasonTable() {
  const {
    seasons,
    handleGetAllSeasons,
    handleUpdateSeason,
    handleDeleteSeason,
  } = useSeason();
  const [selectedSeason, setSelectedSeason] = useState<ISeason | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (season: ISeason) => {
    setSelectedSeason(season);
    setIsEdit(true);
    setIsOpen(true);
  };

  useEffect(() => {
    handleGetAllSeasons();
  }, []);

  const handleSaveSeason = (season: ISeason) => {
    if (isEdit) {
      handleUpdateSeason(season);
    }
    setIsOpen(false);
    setSelectedSeason(null);
    setIsEdit(false);
  };

  const handleDelete = (seasonId: number) => {
    handleDeleteSeason(seasonId);
  };

  const renderCell = (
    season: ISeason,
    columnKey: keyof ISeason | "actions"
  ) => {
    const cellValue = season[columnKey as keyof ISeason];
    if (columnKey === "actions") {
      return (
        <div className="flex gap-2">
          <Tooltip content="Edit Season">
            <span onClick={() => handleEdit(season)}>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip content="Delete Season">
            <span onClick={() => handleDelete(season.seasonId ?? 0)}>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }
    return cellValue as React.ReactNode;
  };

  return (
    <>
      <Table aria-label="Season table">
        <TableHeader
          columns={[
            { uid: "seasonId", name: "ID" },
            { uid: "seasonName", name: "Nombre" },
            { uid: "actions", name: "Acciones" },
          ]}
        >
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={seasons ?? []}>
          {(item) => (
            <TableRow key={item.seasonId}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof ISeason | "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isOpen && (
        <SeasonForm
          season={selectedSeason}
          isEdit={isEdit}
          onSave={handleSaveSeason}
          onClose={() => {
            setIsOpen(false);
            setSelectedSeason(null);
            setIsEdit(false);
          }}
        />
      )}
    </>
  );
}
