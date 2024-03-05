"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { PlusCircle, Star } from "lucide-react";

export default function ReviewWriteDialog() {
  const [starArray, setStarArray] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [imageSrcSet, setImageSrcSet] = useState<string[]>(["-", "-", "-"]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [reviewScore, setReviewScore] = useState(0);

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

  const handleStarMouseOver = (index: number) => {
    const newStarArray = [...starArray];
    for (let i = 0; i < 5; i++) {
      newStarArray[i] = i <= index;
    }
    setStarArray(newStarArray);
  };

  const handleCalculateReviewScore = () => {
    const reviewScore = starArray.reduce(
      (acc, cur) => (cur ? acc + 1 : acc),
      0,
    );
    setReviewScore(reviewScore);
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
        <h1 className={"text-sm font-semibold"}>리뷰 내용</h1>
        <Textarea
          className={"h-[100px] w-full"}
          placeholder={"맛집에 대한 생각을 자유롭게 남겨주세요! (10자 이상)"}
        />
        <h1 className={"text-sm font-semibold"}>별점</h1>
        <div className={"mx-auto flex gap-2"}>
          {starArray.map((isFilled, index) => (
            <Star
              key={index}
              fill={isFilled ? "black" : "none"}
              className={"h-7 w-7 cursor-pointer"}
              onMouseOver={() => handleStarMouseOver(index)}
              onClick={handleCalculateReviewScore}
              onTouchStart={() => handleStarMouseOver(index)}
              onTouchMove={() => handleStarMouseOver(index)}
              onTouchEnd={handleCalculateReviewScore}
            />
          ))}
        </div>
        {reviewScore > 0 && (
          <p className={"mx-auto text-sm font-semibold text-gray-400"}>
            {reviewScore}점!
          </p>
        )}
        <h1 className={"text-sm font-semibold"}>사진 업로드 (최대 3장)</h1>
        <ScrollArea>
          <div className={"flex gap-4 overflow-x-scroll"}>
            {imageSrcSet.map((src, index) => (
              <>
                {src === "-" ? (
                  <>
                    <label htmlFor={`review-image-${index}`}>
                      <div
                        key={index}
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
                    key={index}
                    className={
                      "relative h-[108px] w-[108px] cursor-pointer rounded-lg border-2 border-gray-300"
                    }
                  >
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
        <Button className={"mt-4"}>작성 완료</Button>
      </DialogContent>
    </Dialog>
  );
}
