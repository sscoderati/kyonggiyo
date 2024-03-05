"use client";

/* global kakao */
import type { Dispatch, SetStateAction } from "react";
import Script from "next/script";
import { KGU_POS } from "@/constants";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

type KakaoMapProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMap: Dispatch<SetStateAction<any>>;
};

export const markerImage = (category: string) => {
  const imageSrc = (category: string) => {
    switch (category) {
      case "카페":
        return "images/markers/cafe.png";
      case "패스트푸드":
        return "images/markers/fastfood.png";
      case "분식":
        return "images/markers/flour.png";
      case "한식":
        return "images/markers/korean.png";
      default:
        return "images/markers/default.png";
    }
  };
  const imageSize = new window.kakao.maps.Size(40, 40);
  const imageOption = { offset: new window.kakao.maps.Point(20, 40) };

  return new window.kakao.maps.MarkerImage(
    imageSrc(category),
    imageSize,
    imageOption,
  );
};

export default function KakaoMap({ setMap }: KakaoMapProps) {
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(KGU_POS.lat, KGU_POS.lng),
        level: 4,
      };
      const map = new window.kakao.maps.Map(container, options);
      setMap(map);
    });
  };
  return (
    <>
      <Script
        strategy={"afterInteractive"}
        type={"text/javascript"}
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div
        id={"map"}
        className={"h-dvh w-full"}
      ></div>
    </>
  );
}
