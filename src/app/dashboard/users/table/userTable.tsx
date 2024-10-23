import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/app/ui/EditIcon";
import { DeleteIcon } from "@/app/ui/DeleteIcon";
import { IUser } from "../interfaces/users.interfaces";
import UserForm from "../form/userForm";


// Datos iniciales de usuarios
const initialUsers: IUser[] = [
  { dni: "12345678", firstname: "Juan", lastname: "Pérez", username: "juanp", password: "password123" },
  // ... más usuarios
];

export default function UserTable() {
  const [users, setUsers] = useState<IUser[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSaveUser = (user: IUser) => {
    if (isEdit) {
      setUsers((prev) => prev.map((u) => (u.dni === user.dni ? user : u)));
    } else {
      setUsers((prev) => [...prev, user]);
    }
    setIsOpen(false);
    setSelectedUser(null);
    setIsEdit(false);
  };

  const handleDelete = (dni: string) => {
    setUsers((prev) => prev.filter((u) => u.dni !== dni));
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
          <Tooltip content="Delete user">
            <span onClick={() => handleDelete(user.dni)}>
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
        <TableHeader columns={[
          { uid: "dni", name: "DNI" },
          { uid: "firstname", name: "Nombre" },
          { uid: "lastname", name: "Apellido" },
          { uid: "username", name: "Nombre de Usuario" },
          { uid: "actions", name: "Acciones" },
        ]}>
          {(column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
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
