import Image from "next/image";
import Link from "next/link";
import SideBar from "@/components/SideBar/SideBar";

export default function NavBar() {
  return (
    <div
      className={"flex h-12 w-full items-center justify-between bg-gray-100"}
    >
      <div className={"ml-4 flex w-full items-center"}>
        <Image
          src={"/assets/logo.png"}
          alt={"logo"}
          width={32}
          height={32}
        />
        <Link href={"/"}>
          <div className={"font-bold text-blue-500"}>경기요!</div>
        </Link>
      </div>
      <SideBar />
    </div>
  );
}
