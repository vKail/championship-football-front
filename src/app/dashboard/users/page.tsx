'use client';
import { useState } from "react";
import { IUser } from "./interfaces/users.interfaces";
import UserTable from "./components/table/userTable";
import UserForm from "./components/form/userForm";
import useUser from "./hooks/useUser";


export default function Page() {
  const {handleCreateUser, handleGetAllUsers} = useUser();
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
    handleCreateUser(user);
    handleCloseForm();
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
