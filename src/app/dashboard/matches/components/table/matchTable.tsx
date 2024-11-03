'use client'
import { use, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { IMatch, IMatchResponse } from "../../interface/matches.interface";
import MatchForm from "../form/matchForm";
import useMatch from "../../hooks/useMatch";

export default function MatchTable() {
  const {matches, handleGetAllMatches, handleUpdateMatch, handleRemoveMatch} = useMatch();
  const [selectedMatch, setSelectedMatch] = useState<IMatch | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (match: IMatch) => {
    setSelectedMatch(match);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSaveMatch = (match: IMatch) => {
    if (isEdit) {
      handleUpdateMatch(match);
    }
    setIsOpen(false);
    setSelectedMatch(null);
    setIsEdit(false);
  };

  const handleDelete = (matchId: number) => {
    handleRemoveMatch(matchId);
  };

  useEffect(() => {
    handleGetAllMatches();
  }, []);

  const renderCell = (match: IMatchResponse, columnKey: keyof IMatchResponse | "actions") => {
    const cellValue = match[columnKey as keyof IMatch];
    if (columnKey === "actions") {
      return (
        <div className="flex gap-2">
          <Tooltip content="Edit match">
            <span onClick={() => handleEdit(match)}>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip content="Delete match">
            <span onClick={() => handleDelete(match.matchId ?? 0)}>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }
    if (typeof cellValue === 'object' && cellValue !== null) {
      return JSON.stringify(cellValue);
    }
    return cellValue as React.ReactNode;
  };

  return (
    <>
      <Table aria-label="Match table">
        <TableHeader columns={[
          { uid: "matchId", name: "Match ID" },
          { uid: "matchDate", name: "Fecha" },
          { uid: "homeTeamName", name: "Equipo Local" },
          { uid: "awayTeamName", name: "Equipo Visitante" },
          { uid: "result", name: "Resultado" },
          { uid: "status", name: "Estado" },
          { uid: "actions", name: "Acciones" },
        ]}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={matches ?? []}>
          {(item) => (
            <TableRow key={item.matchId}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof IMatch | "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isOpen && (
        <MatchForm
          match={selectedMatch}
          isEdit={isEdit}
          onSave={handleSaveMatch}
          onClose={() => {
            setIsOpen(false);
            setSelectedMatch(null);
            setIsEdit(false);
          }}
          
        />
      )}
    </>
  );
}
