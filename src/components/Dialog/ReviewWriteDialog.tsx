"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { PlusCircle, XIcon } from "lucide-react";
import { toast } from "sonner";

type ReviewWriteDialogProps = {
  restaurantId: number;
};

export default function ReviewWriteDialog({
  restaurantId,
}: ReviewWriteDialogProps) {
  const [imageSrcSet, setImageSrcSet] = useState<string[]>(["-", "-", "-"]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const ReviewWriteForm = useForm<ReviewWriteFormType>({
    resolver: zodResolver(ReviewWriteFormSchema),
  });

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

  const handleSubmit = ReviewWriteForm.handleSubmit((data) => {
    const json = JSON.stringify(data);
    const reviewData = new FormData();
    reviewData.append("request", json);
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        reviewData.append("image", file);
      });
    }
    postReview(restaurantId.toString(), reviewData)
      .then((res) => {
        if (res) {
          toast.success("리뷰가 성공적으로 작성되었습니다!");
        }
      })
      .catch(() => {
        toast.error("리뷰 작성에 실패했습니다.");
      });
  });

  const handleCancelImage = (idx: number) => {
    const newImageSrcSet = [...imageSrcSet];
    newImageSrcSet[idx] = "-";
    setImageSrcSet(newImageSrcSet);
    const newImageFiles = [...imageFiles];
    newImageFiles[idx] = new File([""], "empty");
    setImageFiles(newImageFiles);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>리뷰 작성</Button>
      </DialogTrigger>
      <DialogContent
        className={
          "flex h-[620px] w-[360px] flex-col justify-start md:w-[400px]"
        }
      >
        <DialogHeader className={"mb-4"}>
          <DialogTitle>리뷰 작성</DialogTitle>
          <DialogDescription className={"pt-4"}>
            리뷰를 작성해주세요!
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
                  placeholder={
                    "맛집에 대한 생각을 자유롭게 남겨주세요! (10자 이상)"
                  }
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
              작성 완료
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
