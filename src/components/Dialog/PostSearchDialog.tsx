"use client";

import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import type { UseFormSetValue } from "react-hook-form";
import getAddressCoordinates from "@/apis/getAddressCoordinates";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { RegisterRestaurantSchemaType } from "@/schemas/RegisterRestaurantSchema";

type PostSearchDialogProps = {
  setValue: UseFormSetValue<RegisterRestaurantSchemaType>;
};

export default function PostSearchDialog({ setValue }: PostSearchDialogProps) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setValue("address", fullAddress);
    getAddressCoordinates(fullAddress).then((res) => {
      if (res) {
        setValue("lat", Number(res.y));
        setValue("lng", Number(res.x));
      }
    });
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          className={
            "rounded-10 h-10 bg-blue-300 p-4 text-white hover:bg-blue-400"
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          주소 검색
        </Button>
      </DialogTrigger>
      <DialogContent className={"h-[500px] w-[400px]"}>
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </DialogContent>
    </Dialog>
  );
}
