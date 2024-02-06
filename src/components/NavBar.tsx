import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function NavBar() {
  return (
    <div
      className={"flex h-12 w-full items-center justify-between bg-gray-100"}
    >
      <div className={"ml-4 flex items-center"}>
        <Image
          src={"/assets/logo.svg"}
          alt={"logo"}
          width={32}
          height={32}
        />
        <div className={"font-bold text-blue-500"}>경기요!</div>
      </div>
      <Button
        className={"mr-4"}
        variant={"outline"}
        size={"icon"}
      >
        <Menu className={"h-4 w-4"} />
      </Button>
    </div>
  );
}
