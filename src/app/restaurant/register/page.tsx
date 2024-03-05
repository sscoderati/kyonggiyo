"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import type { RegisterRestaurantSchemaType } from "@/schemas/RegisterRestaurantSchema";
import { RegisterRestaurantSchema } from "@/schemas/RegisterRestaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RestaurantCategories } from "@/constants/selectorOptions";

export default function RestaurantRegisterPage() {
  const router = useRouter();
  const restaurantRegisterForm = useForm<RegisterRestaurantSchemaType>({
    resolver: zodResolver(RegisterRestaurantSchema),
  });

  const handleSubmit = restaurantRegisterForm.handleSubmit((data) => {
    postRestaurantCandidate(data).then((res) => {
      if (res) {
        toast.success("맛집 등록 신청이 완료되었습니다! 😆");
        router.push("/");
      }
      if (!res) {
        toast.error("맛집 등록 신청에 실패했습니다... 🥹");
      }
    });
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
                <FormLabel>맛집 주소</FormLabel>
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