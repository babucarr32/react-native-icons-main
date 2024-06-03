import SideMenu from "./side-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function SmallDeviceSideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-fit" side={"left"}>
        <ScrollArea>
          <SideMenu />
          {/* <ScrollBar orientation="horizontal" /> */}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
