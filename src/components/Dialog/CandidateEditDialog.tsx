import { useEffect } from "react";
import { useForm } from "react-hook-form";
import patchRestaurantCandidate from "@/apis/patchRestaurantCandidate";
import PostSearchDialog from "@/components/Dialog/PostSearchDialog";
import SingleSelector from "@/components/Selector/SingleSelector";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import type { RegisterRestaurantSchemaType } from "@/schemas/RegisterRestaurantSchema";
import { RegisterRestaurantSchema } from "@/schemas/RegisterRestaurantSchema";
import type { Candidate } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RestaurantCategories } from "@/constants/selectorOptions";

type CandidateWriteDialogProps = {
  candidate: Omit<Candidate, "createdAt">;
  isOpened: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpened: (value: boolean) => void;
  refetch: () => void;
};

export default function CandidateEditDialog({
  candidate,
  isOpened,
  setIsOpened,
  refetch,
}: CandidateWriteDialogProps) {
  const candidateEditForm = useForm<RegisterRestaurantSchemaType>({
    resolver: zodResolver(RegisterRestaurantSchema),
  });

  const handleSubmit = candidateEditForm.handleSubmit((data) => {
    patchRestaurantCandidate(candidate.id, data).then((res) => {
      if (res) {
        toast.success("맛집 후보 수정이 완료되었습니다! 😆");
        refetch();
        setIsOpened(false);
        candidateEditForm.reset();
      }
      if (!res) {
        toast.error("맛집 후보 수정에 실패했습니다... 🥹");
      }
    });
  });

  useEffect(() => {
    candidateEditForm.setValue("address", candidate?.address);
    candidateEditForm.setValue("lat", candidate?.lat);
    candidateEditForm.setValue("lng", candidate?.lng);
    return () => {
      candidateEditForm.reset();
    };
  }, [candidate, candidateEditForm]);

  return (
    <Dialog
      open={isOpened}
      onOpenChange={setIsOpened}
    >
      <DialogContent
        className={
          "flex h-[620px] w-[360px] flex-col justify-start md:w-[400px]"
        }
      >
        <DialogHeader>
          <DialogTitle>맛집 후보 수정</DialogTitle>
          <DialogDescription className={"pt-2"}>
            수정할 내용을 입력해주세요!
          </DialogDescription>
        </DialogHeader>

        <Form {...candidateEditForm}>
          <form onSubmit={handleSubmit}>
            <div className={"py-3"}>
              <FormItem>
                <FormLabel>맛집 이름</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={candidate?.name}
                    placeholder={"맛집 이름을 입력해주세요!"}
                    {...candidateEditForm.register("name")}
                  />
                </FormControl>
                <FormMessage>
                  {candidateEditForm.formState.errors.name?.message}
                </FormMessage>
              </FormItem>
              <FormField
                control={candidateEditForm.control}
                defaultValue={candidate?.category}
                name={"category"}
                render={({ field }) => (
                  <FormItem className={"w-full"}>
                    <FormLabel>카테고리</FormLabel>
                    <SingleSelector
                      items={RestaurantCategories}
                      initialLabel={"맛집 카테고리"}
                      initialData={candidate?.category}
                      onSelectedChange={(selected) => {
                        field.onChange(selected);
                      }}
                    />
                    <FormMessage>
                      {candidateEditForm.formState.errors.category?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormItem className={"w-full"}>
                <FormLabel>맛집 연락처</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={candidate?.contact}
                    placeholder={"맛집의 연락처를 알려주세요! (선택 사항)"}
                    {...candidateEditForm.register("contact")}
                  />
                </FormControl>
                <FormMessage>
                  {candidateEditForm.formState.errors.contact?.message}
                </FormMessage>
              </FormItem>
              <FormItem className={"w-full"}>
                <FormLabel>맛집 주소</FormLabel>
                <FormControl>
                  <div className={"flex w-full gap-2"}>
                    <Input
                      readOnly
                      className={"w-full"}
                      defaultValue={candidate?.address}
                      placeholder={"맛집의 주소를 알려주세요!"}
                      {...candidateEditForm.register("address")}
                    />
                    <PostSearchDialog setValue={candidateEditForm.setValue} />
                  </div>
                </FormControl>
                <FormMessage>
                  {candidateEditForm.formState.errors.address?.message}
                </FormMessage>
              </FormItem>
              <FormItem className={"w-full"}>
                <FormLabel>맛집 추천 이유</FormLabel>
                <FormControl>
                  <Textarea
                    defaultValue={candidate?.reason}
                    placeholder={"맛집을 추천하는 이유를 알려주세요!"}
                    {...candidateEditForm.register("reason")}
                  />
                </FormControl>
                <FormMessage>
                  {candidateEditForm.formState.errors.reason?.message}
                </FormMessage>
              </FormItem>
              <Button
                type="submit"
                className={
                  "rounded-10 my-4 h-8 w-full bg-blue-300 p-4 text-white hover:bg-blue-400"
                }
              >
                수정하기
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
