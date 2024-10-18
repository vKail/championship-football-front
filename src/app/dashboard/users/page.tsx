"use client";
import ModalForm from "@/shared/modalForm";
import DefaultTable from "@/shared/table";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-screen">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <div className="w-10">
      <ModalForm />
      </div>
      <div className="flex-grow mt-4">
        <DefaultTable />
      </div>
    </div>
  );
}
