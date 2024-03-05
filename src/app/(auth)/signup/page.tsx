"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import postUserSignUp from "@/apis/postUserSignUp";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { SignUpFormSchemaType } from "@/schemas/SignUpFormSchema";
import { SignUpFormSchema } from "@/schemas/SignUpFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUserStore } from "@/store/UserStore";

export default function SignUpPage() {
  const { accountId } = useUserStore();
  const router = useRouter();

  const signUpForm = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleSubmit = signUpForm.handleSubmit((data) => {
    if (!accountId) {
      return console.error("계정 정보가 없습니다.");
    }
    postUserSignUp({ accountId: accountId, nickname: data.username }).then(
      (res) => {
        if (res) {
          toast.success("회원가입이 완료되었습니다! 😆");
          router.replace("/login");
        }
        if (!res) {
          toast.error("회원가입에 실패했습니다... 🥹");
        }
      },
    );
  });

  return (
    <div className={"mx-auto flex h-dvh w-2/3 flex-col justify-center"}>
      <div className={"my-12 text-center text-3xl font-bold text-blue-500"}>
        환영합니다! <br /> 경기요에서 사용하실 닉네임을 알려주세요!
      </div>
      <Form {...signUpForm}>
        <form
          onSubmit={handleSubmit}
          className={"flex w-full flex-col items-center"}
        >
          <Input
            className={"mx-auto w-[220px] md:w-[400px]"}
            type={"text"}
            placeholder={"닉네임 (2자 이상)"}
            {...signUpForm.register("username")}
          />
          {signUpForm.formState.errors.username && (
            <FormMessage className={"mt-4"}>
              {signUpForm.formState.errors.username.message}
            </FormMessage>
          )}
          <Button
            type={"submit"}
            className={"mx-auto mt-8 rounded-md bg-blue-500 p-2 text-white"}
          >
            가입하기
          </Button>
        </form>
      </Form>
    </div>
  );
}
