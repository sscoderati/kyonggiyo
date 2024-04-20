"use client";

import { useEffect, useRef, useState } from "react";
import getRestaurantByKeyword from "@/apis/getRestaurantByKeyword";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { MarkerDetail } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Drawer } from "vaul";
import { formatCategory } from "@/utils/formatCategory";
import { useChosenMarkerStore } from "@/store/ChosenMarkerStore";

type SearchRestaurantBottomSheetProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any;
};

const SearchRestaurantBottomSheet = ({
  map: kakaoMap,
}: SearchRestaurantBottomSheetProps) => {
  const [snap, setSnap] = useState<number | string | null>("148px");
  const keywordRef = useRef<HTMLInputElement>(null);
  const { setChosenMarker } = useChosenMarkerStore();
  const { data, isFetching, isLoading, refetch } = useSuspenseQuery({
    queryKey: ["search_result"],
    queryFn: () => getRestaurantByKeyword(keywordRef.current?.value ?? ""),
  });

  const handleSelectSearchedItem = (item: MarkerDetail) => {
    const itemPosition = new window.kakao.maps.LatLng(item.lat, item.lng);
    const content = `<div class="marker__badge">${item.name} <br /><div class="marker__badge__second">⭐️ ${item.averageRating} / ${formatCategory(item.category)}</div></div>`;
    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: itemPosition,
      content: content,
      xAnchor: 0.5,
      yAnchor: 2.2,
    });
    customOverlay.setMap(kakaoMap);
    setTimeout(() => {
      customOverlay.setMap(null);
    }, 5000);
    setChosenMarker(item);
    setSnap("148px");
    kakaoMap.setLevel(1);
    kakaoMap.panTo(itemPosition);
  };

  useEffect(() => {
    if ("virtualKeyboard" in navigator) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      navigator.virtualKeyboard.overlaysContent = true;
    }
  }, []);

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
        <Drawer.Content
          className="border-b-none fixed bottom-0 left-0 right-0 z-20 mx-auto flex h-full max-h-[95%] flex-col rounded-t-[10px] border border-gray-200 bg-white outline-0 max-sm:w-full md:w-[40%] lg:w-[35%]"
          onInteractOutside={() => {
            window.scrollTo(0, 0);
            setSnap("148px");
          }}
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <div className="flex items-center justify-center border-b border-gray-200 p-4">
            <Input
              ref={keywordRef}
              className={"w-4/5 items-center"}
              placeholder={"맛집을 검색해보세요!"}
              onClick={() => setSnap(1)}
              onBlur={() => window.scrollTo(0, 0)}
              onChange={useDebouncedCallback(() => refetch(), 300)}
            />
          </div>
          <div className="overflow-y-auto">
            {isLoading || isFetching ? (
              <div className="flex flex-col gap-y-4 p-6">
                <Skeleton className={"h-4 w-[250px]"} />
                <Skeleton className={"h-4 w-[100px]"} />
                <Skeleton className={"h-4 w-[200px]"} />
                <div className={"my-2"} />
                <Skeleton className={"h-4 w-[250px]"} />
                <Skeleton className={"h-4 w-[100px]"} />
                <Skeleton className={"h-4 w-[200px]"} />
              </div>
            ) : (
              <div className="flex flex-col gap-2 p-4">
                {data?.data.map((restaurant) => {
                  return (
                    <div
                      key={restaurant.id}
                      className="flex cursor-pointer flex-col gap-2 rounded-md border border-gray-200 p-4 hover:bg-gray-100"
                      onClick={() =>
                        handleSelectSearchedItem({ ...restaurant, reason: "" })
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold">{restaurant.name}</div>
                        <div className="flex items-center gap-2">
                          <Star
                            className="h-5 w-5"
                            stroke={"#ffbf00"}
                            fill={"#ffbf00"}
                          />
                          <div>{restaurant.averageRating}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        {formatCategory(restaurant.category)}
                      </div>
                      <div className="text-sm">{restaurant.address}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SearchRestaurantBottomSheet;
