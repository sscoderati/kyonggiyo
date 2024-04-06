"use client";

import { useState } from "react";
import SearchRestaurantBottomSheet from "@/components/BottomSheet/SearchRestaurantBottomSheet";
import MarkerDialog from "@/components/Dialog/MarkerDialog";
import CampusSelector from "@/components/Map/CampusSelector";
import KakaoMap from "@/components/Map/KakaoMap";
import Markers from "@/components/Map/Markers";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [map, setMap] = useState(null);
  const [campusPos, setCampusPos] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <main>
      <NavBar />
      <div className={"relative"}>
        <CampusSelector
          campusPos={campusPos}
          kakaoMap={map}
          className={"absolute left-1/2 z-20 mt-2 -translate-x-1/2 rounded-xl"}
        />
        <KakaoMap
          setMap={setMap}
          setPos={setCampusPos}
        />
      </div>
      <Markers
        map={map}
        setSelected={setSelectedMarker}
      />
      <MarkerDialog
        selected={selectedMarker}
        setSelected={setSelectedMarker}
      />
      <SearchRestaurantBottomSheet />
    </main>
  );
}
