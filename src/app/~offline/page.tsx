import Image from "next/image";

export default function OfflinePage() {
  return (
    <main className={"flex h-dvh flex-col items-center justify-center gap-y-4"}>
      <Image
        src={"/assets/logo.png"}
        alt={"경기요 로고"}
        width={128}
        height={128}
      />
      <h1 className={"text-[18px] font-semibold"}>앗! 오프라인 상태예요!</h1>
      <h2 className={"text-[16px] font-medium"}>
        기기의 인터넷 연결 상태를 확인해주시겠어요?
      </h2>
    </main>
  );
}
