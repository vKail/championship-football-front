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
import { IUser } from "../../interfaces/users.interfaces";
import UserForm from "../form/userForm";
import useUser from "../../hooks/useUser";

export default function UserTable() {
  const { handleGetAllUsers, handleUpdateUser, users, user, handleDeleteUser } =
    useUser();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    handleGetAllUsers();
  }, []);
  const handleEdit = (user: IUser) => { 
    setSelectedUser(user);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSaveUser = (user: IUser) => {
    if (isEdit) {
      handleUpdateUser(user);
    }
    setIsOpen(false);
    setSelectedUser(null);
    setIsEdit(false);
  };

  const handleDelete = (id: number) => {
    handleDeleteUser(id);
  };

  const renderCell = (user: IUser, columnKey: keyof IUser | "actions") => {
    const cellValue = user[columnKey as keyof IUser];
    if (columnKey === "actions") {
      return (
        <div className="flex gap-2">
          <Tooltip content="Edit user">
            <span onClick={() => handleEdit(user)}>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span onClick={() => handleDelete(user.userId ?? 0)}>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    }
    return cellValue;
  };

  return (
    <>
      <Table aria-label="User table">
        <TableHeader
          columns={[
            { uid: "dni", name: "DNI" },
            { uid: "firstname", name: "Nombre" },
            { uid: "lastname", name: "Apellido" },
            { uid: "username", name: "Nombre de Usuario" },
            { uid: "role", name: "Rol" },
            { uid: "actions", name: "Acciones" },
          ]}
        >
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={users || []}>
          {(item) => (
            <TableRow key={item.dni}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof IUser | "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isOpen && (
        <UserForm
          user={selectedUser}
          isEdit={isEdit}
          onSave={handleSaveUser}
          onClose={() => {
            setIsOpen(false);
            setSelectedUser(null);
            setIsEdit(false);
          }}
        />
      )}
    </>
  );
}
