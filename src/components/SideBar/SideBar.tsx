"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getLogout from "@/apis/getLogout";
import SideBarItem from "@/components/SideBar/SideBarItem";
import { Button } from "@/components/ui/button";
import { SideBarRoutes } from "@/constants";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import { Drawer } from "vaul";
import { useUserStore } from "@/store/UserStore";

export default function SideBar() {
  const [isOpened, setIsOpened] = useState(false);
  const { token, reset } = useUserStore();
  const router = useRouter();
  const handleLogout = async () => {
    useUserStore.persist.clearStorage();
    const res = await getLogout();
    if (res) {
      toast.success("로그아웃 되었습니다!");
      useUserStore.persist.clearStorage();
      reset();
      setIsOpened(false);
    }
    if (!res) {
      toast.error("로그아웃에 실패했습니다...");
    }
  };

  return (
    <Drawer.Root
      direction={"right"}
      open={isOpened}
      onOpenChange={setIsOpened}
    >
      <Drawer.Trigger asChild>
        <Button
          className={"mr-4"}
          variant={"outline"}
          size={"icon"}
          onClick={() => setIsOpened((prev) => !prev)}
        >
          <Menu className={"h-4 w-4"} />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        <Drawer.Content
          className={
            "fixed bottom-0 right-0 z-30 mt-24 flex h-full w-4/5 flex-col rounded-t-[10px] bg-white md:w-[400px]"
          }
        >
          <Drawer.Title className={"mx-4 my-4 font-medium"}>
            어디로 이동할까요?
          </Drawer.Title>
          <Drawer.Description className={"mx-4 my-4"}>
            이동하고 싶은 메뉴를 선택해보세요!
          </Drawer.Description>
          <>
            {SideBarRoutes.map((route, index) => {
              return (
                <Link
                  key={index}
                  href={route.path}
                >
                  <SideBarItem name={route.name} />
                </Link>
              );
            })}
          </>
          {!token ? (
            <Button
              className={"mx-auto w-[200px]"}
              onClick={() => router.push("/login")}
            >
              로그인
            </Button>
          ) : (
            <Button
              className={"mx-auto w-[200px]"}
              onClick={() => handleLogout()}
            >
              로그아웃
            </Button>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
