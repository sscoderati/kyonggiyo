"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import deleteReviewImage from "@/apis/deleteReviewImage";
import getPresignedUrl from "@/apis/getPresignedUrl";
import patchReview from "@/apis/patchReview";
import postReview from "@/apis/postReview";
import RatingStar from "@/components/RatingStar/RatingStar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import type { ReviewWriteFormType } from "@/schemas/ReviewWriteForm";
import { ReviewWriteFormSchema } from "@/schemas/ReviewWriteForm";
import type { Review } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import axios from "axios";
import { PlusCircle, XIcon } from "lucide-react";
import { toast } from "sonner";

type ReviewWriteDialogProps = {
  trigger: React.ReactNode;
  restaurantId: number;
  isEditing?: boolean;
  review?: Review;
  refetch?: () => void;
};

export default function ReviewWriteDialog({
  trigger,
  restaurantId,
  isEditing = false,
  review,
  refetch,
}: ReviewWriteDialogProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [imageSrcSet, setImageSrcSet] = useState<string[]>(["-", "-", "-"]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [reviewImageIds, setReviewImageIds] = useState<number[]>([]);

  const ReviewWriteForm = useForm<ReviewWriteFormType>({
    resolver: zodResolver(ReviewWriteFormSchema),
  });

  useEffect(() => {
    if (isEditing && review?.images) {
      const newImageSrcSet = [...imageSrcSet];
      review?.images.forEach((image, idx) => {
        newImageSrcSet[idx] = image.imageUrl;
        setReviewImageIds((prev) => [...prev, image.id]);
      });
      setImageSrcSet(newImageSrcSet);
    }
  }, []);

  const onUploadImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const reader = new FileReader();
    const file = event.target.files?.[0];
    reader.onloadend = () => {
      const newImageSrcSet = [...imageSrcSet];
      newImageSrcSet[idx] = reader.result as string;
      setImageSrcSet(newImageSrcSet);
    };
    if (file) {
      reader.readAsDataURL(file);
      const newImageFiles = [...imageFiles];
      newImageFiles[idx] = file;
      setImageFiles(newImageFiles);
    }
  };

  const imageDeletePromise = Promise.all(
    reviewImageIds.map((id) => deleteReviewImage(id.toString())),
  );

  const handleSubmit = ReviewWriteForm.handleSubmit((data) => {
    // 이미지 presigned url 발급 후 이미지 업로드
    const imageUploadPromise = Promise.all(
      imageFiles.map((file) => {
        return getPresignedUrl(file.name).then((res) => {
          return axios
            .put(res.presignedUrl, file, {
              headers: { "Content-Type": file.type },
            })
            .then(
              () => res.presignedUrl.split("?")[0].split("amazonaws.com/")[1],
            );
        });
      }),
    );

    // 리뷰를 수정하는 경우
    if (isEditing && review) {
      imageDeletePromise.then(() => {
        imageUploadPromise.then((imageUrls) => {
          patchReview(restaurantId, review.id, {
            ...data,
            imageUrls: imageUrls,
          })
            .then((res) => {
              if (res) {
                toast.success("리뷰가 성공적으로 수정되었습니다!");
                refetch && refetch();
                setIsOpened(false);
              }
            })
            .catch(() => {
              toast.error("리뷰 수정에 실패했습니다.");
            });
        });
      });
    }
    // 리뷰를 작성하는 경우
    if (!isEditing) {
      imageUploadPromise.then((imageUrls) => {
        postReview(restaurantId.toString(), { ...data, imageUrls: imageUrls })
          .then((res) => {
            if (res) {
              toast.success("리뷰가 성공적으로 작성되었습니다!");
              refetch && refetch();
              setIsOpened(false);
            }
          })
          .catch(() => {
            toast.error("리뷰 작성에 실패했습니다.");
          });
      });
    }
  });

  const handleCancelImage = (idx: number) => {
    const newImageSrcSet = [...imageSrcSet];
    newImageSrcSet[idx] = "-";
    setImageSrcSet(newImageSrcSet);
  };

  return (
    <Dialog
      open={isOpened}
      onOpenChange={setIsOpened}
    >
      <DialogTrigger
        onClick={() => setIsOpened(true)}
        asChild
      >
        {trigger}
      </DialogTrigger>
      <DialogContent
        className={
          "flex h-[620px] w-[360px] flex-col justify-start md:w-[400px]"
        }
      >
        <DialogHeader className={"mb-4"}>
          <DialogTitle>{isEditing ? "리뷰 수정" : "리뷰 작성"}</DialogTitle>
          <DialogDescription className={"pt-4"}>
            {isEditing ? "수정할 내용을 입력해주세요!" : "리뷰를 작성해주세요!"}
          </DialogDescription>
        </DialogHeader>

        <Form {...ReviewWriteForm}>
          <form onSubmit={handleSubmit}>
            <FormItem>
              <FormLabel className={"text-sm font-semibold"}>
                리뷰 내용
              </FormLabel>
              <FormControl>
                <Textarea
                  className={"h-[100px] w-full"}
                  defaultValue={isEditing ? review?.content : ""}
                  placeholder={"맛집에 대한 생각을 자유롭게 남겨주세요!"}
                  {...ReviewWriteForm.register("content")}
                />
              </FormControl>
              {ReviewWriteForm.formState.errors.content && (
                <FormMessage>
                  {ReviewWriteForm.formState.errors.content.message}
                </FormMessage>
              )}
            </FormItem>

            <FormField
              name={"rating"}
              render={({ field }) => (
                <FormItem className={"my-4 flex flex-col"}>
                  <FormLabel className={"text-sm font-semibold"}>
                    별점
                  </FormLabel>
                  <FormControl>
                    <RatingStar
                      defaultScore={isEditing ? review?.rating : 0}
                      onChangeScore={(score) => {
                        field.onChange(score);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <h1 className={"mb-4 text-sm font-semibold"}>
              사진 업로드 (최대 3장)
            </h1>
            <ScrollArea>
              <div className={"flex gap-4 overflow-x-scroll"}>
                {imageSrcSet.map((src, index) => (
                  <>
                    {src === "-" ? (
                      <>
                        <label htmlFor={`review-image-${index}`}>
                          <div
                            key={`empty-image-${index}`}
                            className={
                              "flex h-[108px] w-[108px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300"
                            }
                          >
                            <PlusCircle className={"h-16 w-16 text-gray-300"} />{" "}
                          </div>
                        </label>
                        <input
                          type="file"
                          id={`review-image-${index}`}
                          accept="image/png, image/jpeg, image/jpg"
                          className="hidden"
                          onChange={(event) => onUploadImage(event, index)}
                        />
                      </>
                    ) : (
                      <div
                        key={`image-${index}`}
                        className={
                          "relative z-30 h-[108px] w-[108px] cursor-pointer rounded-lg border-2 border-gray-300"
                        }
                      >
                        <div
                          className={
                            "absolute right-0 top-0 z-30 h-4 w-4 rounded-full bg-white"
                          }
                          onClick={() => handleCancelImage(index)}
                        >
                          <XIcon className={"h-4 w-4"} />
                        </div>
                        <label htmlFor={`review-image-${index}`}>
                          <Image
                            className={"cursor-pointer"}
                            src={src}
                            alt={"리뷰 이미지"}
                            layout={"fill"}
                            objectFit={"cover"}
                          />
                        </label>
                        <input
                          type="file"
                          id={`review-image-${index}`}
                          accept="image/png, image/jpeg, image/jpg"
                          className="hidden"
                          onChange={(event) => onUploadImage(event, index)}
                        />
                      </div>
                    )}
                  </>
                ))}
              </div>
              <Scrollbar orientation={"horizontal"} />
            </ScrollArea>
            <Button
              className={"mt-4 w-full"}
              type={"submit"}
            >
              {isEditing ? "수정 완료" : "작성 완료"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
