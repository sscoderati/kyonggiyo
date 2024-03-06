"use client";

import { useState } from "react";
import MarkerDialog from "@/components/Dialog/MarkerDialog";
import KakaoMap from "@/components/Map/KakaoMap";
import Markers from "@/components/Map/Markers";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <main>
      <NavBar />
      <KakaoMap setMap={setMap} />
      <Markers
        map={map}
        setSelected={setSelectedMarker}
      />
      <MarkerDialog
        selected={selectedMarker}
        setSelected={setSelectedMarker}
      />
    </main>
  );
}
