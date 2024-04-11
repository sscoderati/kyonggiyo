"use client";

import { useRef, useState } from "react";
import getRestaurantByKeyword from "@/apis/getRestaurantByKeyword";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Drawer } from "vaul";
import { formatCategory } from "@/utils/formatCategory";

const SearchRestaurantBottomSheet = () => {
  const [snap, setSnap] = useState<number | string | null>("148px");
  const keywordRef = useRef<HTMLInputElement>(null);
  const { data, isFetching, isLoading, refetch } = useSuspenseQuery({
    queryKey: ["search_result"],
    queryFn: () => getRestaurantByKeyword(keywordRef.current?.value ?? ""),
  });

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
          className="border-b-none fixed bottom-0 left-0 right-0 z-30 mx-auto flex h-full max-h-[95%] flex-col rounded-t-[10px] border border-gray-200 bg-white outline-0 max-sm:w-full md:w-[40%] lg:w-[35%]"
          onInteractOutside={() => setSnap("148px")}
        >
          <div className="flex items-center justify-center border-b border-gray-200 p-4">
            <Input
              ref={keywordRef}
              className={"w-4/5 items-center"}
              placeholder={"맛집을 검색해보세요!"}
              onClick={() => setSnap(1)}
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
                      className="flex flex-col gap-2 rounded-md border border-gray-200 p-4"
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
