"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Moon, Sun, Github } from "lucide-react";

import { Button } from "@/components/ui/button";

import { atom, useAtomValue } from "jotai";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SmallDeviceSideMenu } from "../icon-page/side-menu-small-device";

export const paramAtom = atom({ param: "/" });

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  const { param } = useAtomValue(paramAtom);
  return (
    <div className="sticky top-0 z-50 backdrop-blur w-full flex justify-start p-4 border-b-2">
      <div className="w-full flex justify-between items-center max-w-[1450px] mx-auto">
        <Link
          href={"/"}
        >
          <Image src="/logo.svg" width={40} height={40} alt="The main logo" />
        </Link>
        <ul className="flex justify-end gap-4 lg:px-4 max-w-[1600px] w-full">
          <li>
            <Link
              href={"https://github.com/babucarr32/react-native-icons-main"}
              target="_blank"
            >
              <div className="text-primary hover:bg-accent dark:text-white transition size-10 flex items-center justify-center rounded-md">
                <Github className="size-5" />
              </div>
            </Link>
          </li>
          <ModeToggle />
          {param !== "/" ? (
            <div className="block lg:hidden">
              <SmallDeviceSideMenu />
            </div>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
