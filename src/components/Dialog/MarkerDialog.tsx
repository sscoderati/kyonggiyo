import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import deleteReview from "@/apis/deleteReview";
import getRestaurantDetail from "@/apis/getRestaurantDetail";
import ConfirmDialog from "@/components/Dialog/ConfirmDialog";
import ImageViewerDialog from "@/components/Dialog/ImageViewerDialog";
import ReviewWriteDialog from "@/components/Dialog/ReviewWriteDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MapPin, Phone, Smile, Star, Tag, XIcon } from "lucide-react";
import { toast } from "sonner";
import useUserId from "@/hooks/useUserId";
import { formatCategory } from "@/utils/formatCategory";

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
  const userId = useUserId();
  const { data, refetch } = useQuery({
    queryKey: ["restaurant-detail", selected?.id],
    queryFn: () => getRestaurantDetail(selected?.id ?? 0),
    enabled: !!selected,
  });

  const handleDeleteReview = (reviewId: number) => {
    if (selected) {
      deleteReview(selected.id, reviewId).then((res) => {
        if (res) {
          toast.success("리뷰가 삭제되었습니다");
          refetch();
        }
        if (!res) {
          toast.error("리뷰 삭제에 실패했습니다");
        }
      });
    }
  };

  return (
    <>
      {selected && data && (
        <div
          className={
            "fixed inset-x-0 top-28 z-20 mx-auto h-[500px] w-[360px] overflow-y-scroll rounded-lg bg-white text-black shadow-lg transition delay-100 duration-75 ease-in-out md:bottom-1/4 md:h-[800px] md:w-[400px]"
          }
        >
          <div className={"p-8"}>
            <Button
              className={"sticky top-4 z-30 float-end"}
              variant={"outline"}
              size={"icon"}
              onClick={() => setSelected(null)}
            >
              <XIcon className={"h-4 w-4"} />
            </Button>
            <h1 className={"text-2xl font-bold"}>{data.name}</h1>

            <div className={"mt-4 flex-col"}>
              <p className={"my-2 flex items-center text-sm"}>
                <Tag className={"mr-2 h-4 w-4"} />
                <Badge>{formatCategory(data.category)}</Badge>
              </p>
              <p className={"my-2 flex items-center text-sm"}>
                <Star
                  className={"mr-2 h-4 w-4 border-amber-300"}
                  stroke={"#ffbf00"}
                  fill={"#ffbf00"}
                />
                {data.averageRating}
              </p>
              <p className={"my-2 flex items-center text-sm"}>
                <MapPin className={"mr-2 h-4 w-4"} />
                {data.address}
              </p>
              {selected.contact && (
                <p className={"my-2  flex text-sm"}>
                  <Phone className={"mr-2 h-4 w-4"} />
                  {data.contact}
                </p>
              )}
              <div className={"overflow-y-hidden"}>
                <div className={"mt-2 flex flex-col"}>
                  <p className={"mb-2 flex items-center text-sm"}>
                    <Smile className={"mr-2 h-4 w-4"} />
                    추천 이유
                  </p>
                  <p className={"rounded-md bg-gray-100 p-2"}>
                    {data.content ?? "일단 추천합니다."}
                  </p>
                </div>
                <div className={"mt-2 flex flex-col"}>
                  {data.reviews &&
                    data.reviews.map((review) => (
                      <div
                        key={`review-${review.id}`}
                        className={"mb-2 flex flex-col rounded-md border p-2"}
                      >
                        <h2 className={"text-md"}>{review.content}</h2>
                        <ImageViewerDialog
                          trigger={
                            <div className={"flex gap-2"}>
                              {review.images?.map((image, index) => (
                                <div
                                  className={
                                    "relative my-4 h-28 w-28 cursor-pointer"
                                  }
                                  key={`review-image-${index}`}
                                >
                                  <Image
                                    src={image.imageUrl}
                                    alt={`리뷰 이미지-${index}`}
                                    layout={"fill"}
                                    objectFit={"cover"}
                                  />
                                </div>
                              ))}
                            </div>
                          }
                          imageSrcSet={review.images || []}
                        />
                        <h3 className={"flex text-sm text-gray-400"}>
                          <Star
                            className={"mr-1 h-4 w-4"}
                            stroke={"#ffbf00"}
                            fill={"#ffbf00"}
                          />
                          {review.rating}
                        </h3>
                        <div className={"flex justify-between"}>
                          <div className={"flex flex-col"}>
                            <h3 className={"text-sm text-gray-500"}>
                              {review.reviewer.nickname}
                            </h3>
                            <h4 className={"text-sm text-gray-500"}>
                              {format(review.createdAt, "yyyy년 MM월 dd일")}
                            </h4>
                          </div>
                          {userId === review.reviewer.id && (
                            <ConfirmDialog
                              trigger={<Button className={"h-8"}>삭제</Button>}
                              title={"리뷰 삭제"}
                              description={"정말 리뷰를 삭제하시겠습니까?"}
                              confirmText={"삭제"}
                              onConfirm={() => handleDeleteReview(review.id)}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                <div className={"mt-4 flex w-full justify-end"}>
                  <ReviewWriteDialog restaurantId={data.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
