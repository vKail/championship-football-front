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

export default function Layout({ children }: { children: React.ReactNode }) {
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
              <a href="#">Admin</a>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="warning" href="#" variant="flat">
                Logout
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        {children}
      </div>
    </div>
  );
}
