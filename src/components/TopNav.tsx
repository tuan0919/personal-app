import image from "/icon.png";
import { AiOutlineMenu } from "react-icons/ai";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import ToggleTheme from "./ToggleThemeButton";
export default function TopNav() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-primary flex z-50 items-center justify-between px-3">
        <div className="size-10">
          <img src={image} width={"100%"} alt="" />
        </div>
        <div className="flex gap-2">
          <ToggleTheme />
          <div className="flex flex-row-reverse gap-6 items-center">
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <AiOutlineMenu
                  size={28}
                  className="text-mau-chu cursor-pointer"
                />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <div className="rounded-full border-3 bg-gray-300 p-4"></div>
          </div>
        </div>
      </nav>
    </>
  );
}
