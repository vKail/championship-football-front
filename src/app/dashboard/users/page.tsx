'use client';
import { useState } from "react";
import { IUser } from "./interfaces/users.interfaces";
import UserTable from "./table/userTable";
import UserForm from "./form/userForm";


export default function Page() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = () => {
    setSelectedUser(null);
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
    setIsEdit(false);
  };

  const handleSaveUser = (user: IUser) => {
    if (isEdit && selectedUser) {
      setUsers((prev: any[]) =>
        prev.map((usr) =>
          usr.dni === selectedUser.dni ? user : usr
        )
      );
    } else {
      setUsers((prev: any) => [...prev, user]);
    }
    handleCloseForm();
  };

  const handleEditUser = (user: IUser) => {
    setSelectedUser(user);
    setIsEdit(true);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Crear Nuevo Usuario
        </button>
      </div>
      
      <UserTable />

      {isFormOpen && (
        <UserForm
          user={selectedUser}
          isEdit={isEdit}
          onSave={handleSaveUser}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
