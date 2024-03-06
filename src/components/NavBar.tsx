import Image from "next/image";
import Link from "next/link";
import getNewToken from "@/apis/getNewToken";
import SideBar from "@/components/SideBar/SideBar";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { toast } from "sonner";
import { useUserStore } from "@/store/UserStore";

export default function NavBar() {
  const { setToken } = useUserStore();
  const handleRefreshToken = () => {
    getNewToken().then((res) => {
      if (res) {
        setToken(res);
        toast.success("토큰 재발행 성공!");
      }
    });
  };

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
        size={"icon"}
        variant={"outline"}
        onClick={handleRefreshToken}
      >
        <RotateCw className={"h-4 w-4"} />
      </Button>
      <SideBar />
    </div>
  );
}
