import type { Dispatch, SetStateAction } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import getMarkers from "@/apis/getMarkers";
import { markerImage } from "@/components/Map/KakaoMap";
import { useSuspenseQuery } from "@tanstack/react-query";
import * as worker_threads from "worker_threads";
import { formatCategory } from "@/utils/formatCategory";

type MarkerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelected: Dispatch<SetStateAction<any>>;
};

export default function Markers({ map, setSelected }: MarkerProps) {
  const { data: markerData } = useSuspenseQuery({
    queryKey: ["markers"],
    queryFn: getMarkers,
  });

  const loadKakaoMarkers = useCallback(() => {
    if (map && markerData) {
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 1, // 클러스터 할 최소 지도 레벨
      });
      markerData.data.map((store) => {
        const markerPosition = new window.kakao.maps.LatLng(
          store.lat,
          store.lng,
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage(formatCategory(store.category)),
        });
        marker.setMap(map);

        const content = `<div class="marker__badge">${store.name} <br /><div class="marker__badge__second">⭐️ ${store.averageRating} / ${formatCategory(store.category)}</div></div>`;
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.5,
          yAnchor: 2.2,
        });
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          customOverlay.setMap(map);
        });
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          customOverlay.setMap(null);
        });

        window.kakao.maps.event.addListener(marker, "click", function () {
          setSelected(store);
          // customOverlay.setMap(map);
        });
        clusterer.addMarker(marker);
      });
    }
  }, [map, setSelected]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [map, loadKakaoMarkers]);

  return null;
}
