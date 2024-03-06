import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import ReviewWriteDialog from "@/components/Dialog/ReviewWriteDialog";
import { Button } from "@/components/ui/button";
import type { MOCK_STORES } from "@/mock/storeInfo";
import type { Restaurant } from "@/types";
import { format } from "date-fns";
import { MapPin, Phone, Smile, Star, Tag, XIcon } from "lucide-react";

type MarkerDialogProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selected: Restaurant | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelected: Dispatch<SetStateAction<any>>;
};

export default function MarkerDialog({
  selected,
  setSelected,
}: MarkerDialogProps) {
  return (
    <>
      {selected && (
        <div
          className={
            "fixed inset-x-0 top-28 z-20 mx-auto h-[500px] w-[360px] overflow-y-scroll rounded-lg bg-white text-black shadow-lg transition delay-100 duration-75 ease-in-out md:bottom-1/4 md:h-[800px] md:w-[400px]"
          }
        >
          <div className={"p-8"}>
            <Button
              className={"absolute right-4 top-4"}
              variant={"outline"}
              size={"icon"}
              onClick={() => setSelected(null)}
            >
              <XIcon className={"h-4 w-4"} />
            </Button>

            <h1 className={"text-2xl font-bold"}>{selected.name}</h1>
            <div className={"mt-4 flex-col"}>
              <p className={"my-2 flex text-sm"}>
                <Tag className={"mr-2 h-4 w-4"} />
                {selected.category}
              </p>
              <p className={"my-2  flex text-sm"}>
                <Star className={"mr-2 h-4 w-4"} />
                {selected.averageRating} / 5.0
              </p>
              <p className={"my-2  flex text-sm"}>
                <MapPin className={"mr-2 h-4 w-4"} />
                {selected.address}
              </p>
              {selected.contact && (
                <p className={"my-2  flex text-sm"}>
                  <Phone className={"mr-2 h-4 w-4"} />
                  {selected.contact}
                </p>
              )}
              <div className={"overflow-y-hidden"}>
                <div className={"mt-2 flex flex-col"}>
                  <p className={"mb-2 flex text-sm"}>
                    <Smile className={"mr-2 h-4 w-4"} />
                    추천 이유
                  </p>
                  <p className={"rounded-md bg-gray-100 p-2"}>
                    {selected.content}
                  </p>
                </div>
                <div className={"mt-2 flex flex-col"}>
                  {selected.reviews.map((review) => (
                    <div
                      key={review.id}
                      className={"mb-2 flex flex-col rounded-md border p-2"}
                    >
                      <h2 className={"text-lg font-bold"}>{review.content}</h2>
                      {/* TODO: 이미지 영역 */}
                      <div className={"flex gap-2"}>
                        {review.images?.map((imageSrc, index) => (
                          <div
                            className={"relative h-28 w-28 cursor-pointer"}
                            key={index}
                          >
                            <Image
                              src={imageSrc}
                              alt={`리뷰 이미지-${index}`}
                              layout={"fill"}
                              objectFit={"cover"}
                            />
                          </div>
                        ))}
                      </div>
                      <h3 className={"flex text-sm text-gray-400"}>
                        <Star className={"mr-1 h-4 w-4"} />
                        {review.rating} / 5.0
                      </h3>
                      <h3 className={"text-sm text-gray-500"}>
                        {review.reviewer.nickname}
                      </h3>
                      <h4 className={"text-sm text-gray-500"}>
                        {format(review.createdAt, "yyyy년 MM월 dd일")}
                      </h4>
                    </div>
                  ))}
                </div>
                <div className={"mt-4 flex w-full justify-end"}>
                  <ReviewWriteDialog />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
