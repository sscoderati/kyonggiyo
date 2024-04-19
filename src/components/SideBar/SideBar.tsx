"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import getLogout from "@/apis/getLogout";
import SideBarItem from "@/components/SideBar/SideBarItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PrivateRoutes, SideBarRoutes, inquiryFormUrl } from "@/constants";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import { Drawer } from "vaul";
import { useTokenStore } from "@/store/UserStore";

export default function SideBar() {
  const [isOpened, setIsOpened] = useState(false);
  const { token, reset } = useTokenStore();
  const router = useRouter();
  const handleLogout = async () => {
    useTokenStore.persist.clearStorage();
    const res = await getLogout();
    if (res) {
      toast.success("로그아웃 되었습니다!");
      useTokenStore.persist.clearStorage();
      reset();
      setIsOpened(false);
    }
    if (!res) {
      toast.error("로그아웃에 실패했습니다...");
    }
  };

  const handleMoveToPath = (path: string) => {
    if (PrivateRoutes.includes(path) && !token) {
      toast.error("로그인이 필요한 페이지입니다!");
      return;
    }
    router.push(path);
    setIsOpened(false);
  };

  const handleMoveToInquiry = () => {
    window.location.href = inquiryFormUrl;
    setIsOpened(false);
  };

  return (
    <Drawer.Root
      direction={"right"}
      open={isOpened}
      onOpenChange={setIsOpened}
    >
      <Drawer.Trigger asChild>
        <Button
          className={"mr-4 outline-0"}
          variant={"outline"}
          size={"icon"}
          onFocus={(event) => event.preventDefault()}
          onClick={() => setIsOpened((prev) => !prev)}
        >
          <Menu className={"h-4 w-4"} />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        <Drawer.Content
          className={
            "fixed bottom-0 right-0 z-30 mt-24 flex h-full w-4/5 flex-col rounded-t-[10px] bg-white outline-0 md:w-[400px]"
          }
          onOpenAutoFocus={(event) => event.preventDefault()}
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
                <div
                  className={"my-1"}
                  key={`sidebar-route-${index}`}
                  onClick={() => handleMoveToPath(route.path)}
                >
                  <SideBarItem name={route.name} />
                </div>
              );
            })}
          </>
          <Separator />
          <div
            className={
              "my-4 flex h-10 w-full cursor-pointer items-center justify-center transition-colors duration-300 hover:bg-blue-300"
            }
            onClick={() => handleMoveToInquiry()}
          >
            건의사항 등록
          </div>
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
