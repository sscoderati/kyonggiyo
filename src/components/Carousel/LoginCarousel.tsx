"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CarouselImagePaths = [
  "/images/markers/american.png",
  "/images/markers/flour.png",
  "/images/markers/korean.png",
  "/images/markers/fastfood.png",
  "/images/markers/cafe.png",
];

export default function LoginCarousel() {
  return (
    <Carousel
      className={"max-xs:w-[210px] max-xs:h-[200px] mx-auto max-w-xs"}
      plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
    >
      <CarouselContent>
        {CarouselImagePaths.map((path, idx) => (
          <CarouselItem key={idx}>
            <div className="p-1">
              <Card className={"max-xs:w-[200px] max-xs:h-[200px]"}>
                <CardContent className=" flex aspect-square items-center justify-center p-6">
                  <Image
                    src={path}
                    alt={"음식 이미지"}
                    width={75}
                    height={75}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
