import { use, useEffect, useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button 
} from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { EyeIcon } from "@/app/ui/EyeIcon";
import { IMatch, IMatchResponse } from "../../interface/matches.interface";
import MatchForm from "../form/matchForm";
import useMatch from "../../hooks/useMatch";

const STATUS_OPTIONS = [
  { key: "Pendiente", label: "Pendiente" },
  { key: "En_curso", label: "En Curso" },
  { key: "Finalizado", label: "Finalizado" },
  { key: "Cancelado", label: "Cancelado" }
];

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

  const handleSaveMatch = () => {
    if (isEdit) {
      // Lógica de guardado
    }
    setIsOpen(false);
    setSelectedMatch(null);
    setIsEdit(false);
  };

  const handleDelete = (matchId: number) => {
    handleRemoveMatch(matchId);
  };

  const handleEditStatus = async (matchId: number, status: string) => {
    try {
      // Prevenir que se ejecute con valores undefined
      if (!matchId || !status) return;
      
      // Asegurarse de que el status es válido
      const validStatus = STATUS_OPTIONS.find(opt => opt.key === status);
      if (!validStatus) return;

      // Encontrar el match actual para mantener todos los datos
      const currentMatch = matches?.find(m => m.matchId === matchId);
      if (!currentMatch) return;

      // Crear el objeto de actualización manteniendo todos los datos existentes
      const updateData = {
        ...currentMatch,
        status: status
      };

      await handleUpdateMatch(matchId, updateData);
      
      // Refrescar la tabla después de la actualización
      handleGetAllMatches();
    } catch (error) {
      console.error('Error updating match status:', error);
      // Aquí podrías agregar alguna notificación de error para el usuario
    }
  };

  useEffect(() => {
    handleGetAllMatches();
  }, []);

  const formatDate = (date: Date | string): string => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderCell = (match: IMatchResponse, columnKey: keyof IMatchResponse | "actions"): React.ReactNode => {
    const cellValue = match[columnKey as keyof IMatch];
    
    if (columnKey === "actions" && match.status !== "Finalizado") {
      return (
        <div className="flex gap-2 items-center">
          <Tooltip content="Editar">
            <span 
              className="cursor-pointer" 
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(match);
              }}
            >
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip content="Eliminar partido">
            <span 
              className="cursor-pointer" 
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(match.matchId ?? 0);
              }}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
          <Tooltip content="Cambiar estado">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  size="sm" 
                  variant="light"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <EyeIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Status options"
                onAction={(key) => {
                  if (typeof key === 'string') {
                    handleEditStatus(match.matchId ?? 0, key);
                  }
                }}
              >
                {STATUS_OPTIONS.map((status) => (
                  <DropdownItem 
                    key={status.key}
                    className={match.status === status.key ? "text-primary" : ""}
                  >
                    {status.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Tooltip>
        </div>
      );
    }
    
    if (columnKey === "status") {
      return STATUS_OPTIONS.find(status => status.key === cellValue)?.label || cellValue?.toString() || '';
    }
    
    if (columnKey === "matchDate") {
      return formatDate(cellValue as Date);
    }
    
    if (typeof cellValue === 'object' && cellValue !== null) {
      return JSON.stringify(cellValue);
    }
    
    return cellValue?.toString() ?? '';
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
          onSave={handleEdit}
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