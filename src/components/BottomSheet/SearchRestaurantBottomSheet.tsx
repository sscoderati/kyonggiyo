"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { Drawer } from "vaul";
import { formatCategory } from "@/utils/formatCategory";

const MOCK_DATA = [
  {
    id: 23,
    name: "고도리비스트로",
    averageRating: 3.7,
    category: "ALCOHOL",
    lat: 37.2987701248606,
    lng: 127.044607851533,
    reason: "안주가 진짜 맛있음",
  },
  {
    id: 3,
    name: "나니행",
    averageRating: 3.7,
    category: "CAFE",
    lat: 37.3014392200801,
    lng: 127.032591254577,
    reason: "나니행",
  },
  {
    id: 8,
    name: "신전떡볶이 경기대점",
    averageRating: 3.7,
    category: "FLOUR",
    lat: 37.2982336892556,
    lng: 127.044497003643,
    reason: "양도 많고 JMT 떡볶이",
  },
  {
    id: 14,
    name: "연탄불고기",
    averageRating: 3.7,
    category: "KOREAN",
    lat: 37.2995607803206,
    lng: 127.045094663851,
    reason: "간장 불고기가 JMT",
  },
  {
    id: 13,
    name: "동대문엽기떡볶이 광교경기대점",
    averageRating: 3.7,
    category: "FLOUR",
    lat: 37.2995222930577,
    lng: 127.04441418628,
    reason: "모두가 좋아하는 엽기떡볶이",
  },
  {
    id: 6,
    name: "신의한국수 광교점",
    averageRating: 5.0,
    category: "FLOUR",
    lat: 37.3009353138684,
    lng: 127.04579275766,
    reason: "여기보다 맛있는 국수집? 아직 맛보지 못했습니다",
  },
];

const SearchRestaurantBottomSheet = () => {
  const [snap, setSnap] = useState<number | string | null>("148px");

  return (
    <Drawer.Root
      open={true}
      dismissible={false}
      modal={false}
      snapPoints={["148px", 1]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <Drawer.Portal>
        <Drawer.Content className="border-b-none fixed bottom-0 left-0 right-0 z-30 mx-auto flex h-full max-h-[95%] flex-col rounded-t-[10px] border border-gray-200 bg-white outline-0 max-sm:w-full md:w-[40%] lg:w-[35%]">
          <div className="flex items-center justify-center border-b border-gray-200 p-4">
            <Input
              className={"w-4/5 items-center"}
              placeholder={"맛집을 검색해보세요!"}
              onFocus={() => setSnap(1)}
            />
          </div>
          <div className="overflow-y-auto">
            {MOCK_DATA.map((restaurant) => (
              <div
                key={restaurant.id}
                className="cursor-pointer border-b border-gray-200 p-4 hover:bg-gray-100"
                onClick={() => setSnap("148px")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="font-bold">{restaurant.name}</div>
                    <div className="flex items-center gap-1">
                      <Star
                        className={"h-4 w-4"}
                        stroke={"#ffbf00"}
                        fill={"#ffbf00"}
                      />
                      <div>{restaurant.averageRating}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatCategory(restaurant.category)}
                  </div>
                </div>
                <div className="text-sm text-gray-400">{restaurant.reason}</div>
              </div>
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SearchRestaurantBottomSheet;
