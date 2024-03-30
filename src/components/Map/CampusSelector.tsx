"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type CampusSelectorProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kakaoMap: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  campusPos: any;
  className?: string;
};

export default function CampusSelector({
  kakaoMap,
  campusPos,
  className,
}: CampusSelectorProps) {
  const [campus, setCampus] = useState<"suwon" | "seoul">("suwon");

  useEffect(() => {
    if (kakaoMap) {
      if (campus === "suwon") {
        kakaoMap.setCenter(campusPos.suwon);
      } else {
        kakaoMap.setCenter(campusPos.seoul);
      }
    }
  }, [campus, kakaoMap]);

  return (
    <div
      className={cn(
        "flex w-40 items-center justify-center bg-white",
        className,
      )}
    >
      <div
        className={
          "rounded-tl-15 rounded-bl-15 bg-st-primary text-st-white flex h-10 w-20 cursor-pointer items-center justify-center"
        }
        onClick={() => setCampus("suwon")}
      >
        <button
          className={`h-full w-full rounded-2xl text-center ${campus === "suwon" ? "bg-gray-500 font-bold text-white" : ""}`}
        >
          수원
        </button>
      </div>
      <div
        className={
          "rounded-tr-15 rounded-br-15 bg-st-primary text-st-white flex h-10 w-20 cursor-pointer items-center justify-center"
        }
        onClick={() => setCampus("seoul")}
      >
        <button
          className={`h-full w-full rounded-2xl text-center ${campus === "seoul" ? "bg-gray-500 font-bold text-white" : ""}`}
        >
          서울
        </button>
      </div>
    </div>
  );
}
