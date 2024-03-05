import type { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { markerImage } from "@/components/Map/KakaoMap";
import { MOCK_STORES } from "@/mock/storeInfo";

type MarkerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelected: Dispatch<SetStateAction<any>>;
};

export default function Markers({ map, setSelected }: MarkerProps) {
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      MOCK_STORES.map((store) => {
        const markerPosition = new window.kakao.maps.LatLng(
          store.lat,
          store.lng,
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage(store.category),
        });
        marker.setMap(map);

        const content = `<div class="marker__badge">${store.name}</div>`;
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          customOverlay.setMap(map);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          customOverlay.setMap(null);
        });

        window.kakao.maps.event.addListener(marker, "click", function () {
          setSelected(store);
        });
      });
    }
  }, [map, setSelected]);
  useEffect(() => {
    loadKakaoMarkers();
  }, [map, loadKakaoMarkers]);

  return null;
}
