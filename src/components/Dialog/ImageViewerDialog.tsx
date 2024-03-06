import type { ReactNode } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ImageViewerDialogProps = {
  trigger: ReactNode;
  imageSrcSet: { imageUrl: string }[];
};

export default function ImageViewerDialog({
  trigger,
  imageSrcSet,
}: ImageViewerDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>리뷰 이미지</DialogTitle>
        </DialogHeader>
        <Carousel className={"mx-auto h-4/5 w-4/5"}>
          <CarouselContent>
            {imageSrcSet.map((path, idx) => (
              <CarouselItem
                className={"relative"}
                key={`viewer-image${idx}`}
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        src={path.imageUrl}
                        alt={"리뷰 이미지"}
                        layout={"fill"}
                        objectFit={"cover"}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={"fixed left-4 top-1/2"} />
          <CarouselNext className={"fixed right-4 top-1/2"} />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
