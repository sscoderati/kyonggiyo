import Image from "next/image";
import Link from "next/link";
import SideBar from "@/components/SideBar/SideBar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function NavBar() {
  return (
    <div
      className={"flex h-12 w-full items-center justify-between bg-gray-100"}
    >
      <div className={"ml-4 flex w-full items-center"}>
        <Image
          src={"/assets/logo.svg"}
          alt={"logo"}
          width={32}
          height={32}
        />
        <Link href={"/"}>
          <div className={"font-bold text-blue-500"}>경기요!</div>
        </Link>
      </div>
      <Button
        className={"mr-4"}
        variant={"outline"}
        size={"icon"}
      >
        <Menu className={"h-4 w-4"} />
      </Button>
      <SideBar />
    </div>
  );
}
