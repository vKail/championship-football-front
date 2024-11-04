"use client";

import { Sidebar } from "@/shared/sidebar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import useAuth from "../auth/hook/useAuth";
import { User } from "@nextui-org/user";
import useUser from "./users/hooks/useUser";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {  handlerLogout } = useAuth();

  const userLog = localStorage.getItem('user');
  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="flex flex-col p-5 w-full h-screen">
        <Navbar>
          <NavbarBrand>
            <p className="font-bold text-inherit">FutbolTotal</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            
            <NavbarItem className="hidden lg:flex">
              <User
                name={userLog?.toString()}
                description="Bienvenido"
                avatarProps={{
                  src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                }}
              />
            </NavbarItem>
            <NavbarItem>
              <Button onClick={() => handlerLogout()} color="danger"  variant="flat">
                Salir
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        {children}
      </div>
    </div>
  );
}
