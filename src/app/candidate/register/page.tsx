"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import postRestaurant from "@/apis/postRestaurant";
import postRestaurantCandidate from "@/apis/postRestaurantCandidate";
import PostSearchDialog from "@/components/Dialog/PostSearchDialog";
import NavBar from "@/components/NavBar";
import SingleSelector from "@/components/Selector/SingleSelector";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { APPNAME, KGU_ENCODED_NAME, KGU_POS } from "@/constants";
import { cn } from "@/lib/utils";
import type { RegisterRestaurantSchemaType } from "@/schemas/RegisterRestaurantSchema";
import { RegisterRestaurantSchema } from "@/schemas/RegisterRestaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import checkUserAuthLevel from "@/utils/checkUserAuthLevel";
import { RestaurantCategories } from "@/constants/selectorOptions";

const MAP_LOGO_SIZE = 32;
const INTENT_NAVER_MAP = `intent://place?lat=${KGU_POS.suwon.lat}&lng=${KGU_POS.suwon.lng}&name=${KGU_ENCODED_NAME}&appname=${APPNAME}#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end`;

const handleOpenNaverMapApp = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (!isMobile) {
    window.open(
      `https://map.naver.com/p/entry/place/11591483?c=16.00,0,0,0,dh`,
      "_blank",
    );
    return;
  }
  const userOS = window.navigator.userAgent.match(/Android/i)
    ? "android"
    : "ios";
  if (userOS === "android") {
    window.location.href = INTENT_NAVER_MAP;
    return;
  }

  if (userOS === "ios") {
    const clickedAt = +new Date();

    window.location.href = `nmap://actionPath?parameter=value&place?lat=${KGU_POS.suwon.lat}&lng=${KGU_POS.suwon.lng}&name=${KGU_ENCODED_NAME}&appname=${APPNAME}`;

    setTimeout(function () {
      if (+new Date() - clickedAt < 2000) {
        window.location.href = "http://itunes.apple.com/app/id311867728?mt=8";
      }
    }, 1500);
  }
};

export default function CandidateRegisterPage() {
  const router = useRouter();
  const level = checkUserAuthLevel();
  const restaurantRegisterForm = useForm<RegisterRestaurantSchemaType>({
    resolver: zodResolver(RegisterRestaurantSchema),
  });

  const handleSubmit = restaurantRegisterForm.handleSubmit((data) => {
    if (level === "USER") {
      postRestaurantCandidate(data).then((res) => {
        if (res) {
          toast.success("맛집 등록 신청이 완료되었습니다! 😆");
          router.push("/");
        }
        if (!res) {
          toast.error("맛집 등록 신청에 실패했습니다... 🥹");
        }
      });
    }
    if (level === "ADMIN") {
      postRestaurant(data).then((res) => {
        if (res) {
          toast.success("맛집 등록이 완료되었습니다! 😆");
          router.push("/");
        }
        if (!res) {
          toast.error("맛집 등록에 실패했습니다... 🥹");
        }
      });
    }
  });

  return (
    <>
      <NavBar />
      <div className={"flex w-full flex-col p-4"}>
        <div className={"text-lg font-semibold text-black"}>맛집 등록 신청</div>
        <div className={"mt-2 text-sm text-gray-500"}>
          아직 등록되지 않은 경기대학교 근처의 맛집을 등록해주세요!
        </div>
        <Form {...restaurantRegisterForm}>
          <form onSubmit={handleSubmit}>
            <div className={"mt-4 flex w-full flex-col gap-4"}>
              <div className={"flex w-full justify-around gap-4"}>
                <FormItem className={"w-full"}>
                  <FormLabel>맛집 이름</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"맛집 이름을 입력해주세요!"}
                      {...restaurantRegisterForm.register("name")}
                    />
                  </FormControl>
                  <FormMessage>
                    {restaurantRegisterForm.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
                <FormField
                  control={restaurantRegisterForm.control}
                  name={"category"}
                  render={({ field }) => (
                    <FormItem className={"w-full"}>
                      <FormLabel>카테고리</FormLabel>
                      <SingleSelector
                        items={RestaurantCategories}
                        initialLabel={"맛집 카테고리"}
                        onSelectedChange={(selected) => {
                          field.onChange(selected);
                        }}
                      />
                      <FormMessage>
                        {
                          restaurantRegisterForm.formState.errors.category
                            ?.message
                        }
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormItem className={"w-full"}>
                <FormLabel>맛집 연락처</FormLabel>
                <FormControl>
                  <Input
                    placeholder={"맛집의 연락처를 알려주세요! (선택 사항)"}
                    {...restaurantRegisterForm.register("contact")}
                  />
                </FormControl>
                <FormMessage>
                  {restaurantRegisterForm.formState.errors.contact?.message}
                </FormMessage>
              </FormItem>
              <FormItem className={"w-full"}>
                <div className={cn("flex w-full justify-between")}>
                  <FormLabel className={"my-auto"}>맛집 주소</FormLabel>
                  <div className={"mr-2 flex gap-3"}>
                    <Image
                      src={"/images/naver_map.png"}
                      alt={"네이버맵_로고"}
                      width={MAP_LOGO_SIZE}
                      height={MAP_LOGO_SIZE}
                      className={"cursor-pointer"}
                      onClick={handleOpenNaverMapApp}
                    />
                    {/*<Image*/}
                    {/*  src={"/images/kakao_map.png"}*/}
                    {/*  alt={"카카오맵_로고"}*/}
                    {/*  width={MAP_LOGO_SIZE}*/}
                    {/*  height={MAP_LOGO_SIZE}*/}
                    {/*/>*/}
                  </div>
                </div>
                <FormControl>
                  <div className={"flex w-full gap-2"}>
                    <Input
                      readOnly
                      className={"w-full"}
                      placeholder={"맛집의 주소를 알려주세요!"}
                      {...restaurantRegisterForm.register("address")}
                    />
                    <PostSearchDialog
                      setValue={restaurantRegisterForm.setValue}
                    />
                  </div>
                </FormControl>
                <FormMessage>
                  {restaurantRegisterForm.formState.errors.address?.message}
                </FormMessage>
              </FormItem>
              <FormItem className={"w-full"}>
                <FormLabel>맛집 추천 이유</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={"맛집을 추천하는 이유를 알려주세요!"}
                    {...restaurantRegisterForm.register("reason")}
                  />
                </FormControl>
                <FormMessage>
                  {restaurantRegisterForm.formState.errors.reason?.message}
                </FormMessage>
              </FormItem>
              <Button
                type="submit"
                className={
                  "rounded-10 h-12 bg-blue-300 p-4 text-white hover:bg-blue-400"
                }
              >
                등록하기
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
