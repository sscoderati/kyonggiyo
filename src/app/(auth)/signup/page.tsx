"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import getNicknameValid from "@/apis/getNicknameValid";
import postUserSignUp from "@/apis/postUserSignUp";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { SignUpFormSchemaType } from "@/schemas/SignUpFormSchema";
import { SignUpFormSchema } from "@/schemas/SignUpFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";
import { useAccountStore } from "@/store/UserStore";

export default function SignUpPage() {
  const { accountId, reset } = useAccountStore();
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const router = useRouter();

  const signUpForm = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleCheckNickname = async (nickname: string) => {
    const { flag: isValid } = await getNicknameValid(nickname);
    if (isValid) {
      setIsNicknameValid(true);
      toast.success("사용 가능한 닉네임입니다! 😆");
    }
    if (!isValid) {
      setIsNicknameValid(false);
      toast.error("이미 사용중인 닉네임입니다. 🥹");
    }
  };

  const handleSubmit = signUpForm.handleSubmit((data) => {
    if (!isNicknameValid) {
      toast.error("닉네임 중복확인을 해주세요. 🥹");
      return;
    }
    if (!accountId) {
      toast.error("계정 정보가 없습니다. 다시 로그인해주세요. 🥹");
      console.error("계정 정보가 없습니다.");
      return;
    }
    postUserSignUp({ accountId: accountId, nickname: data.username }).then(
      (res) => {
        if (res) {
          toast.success("회원가입이 완료되었습니다! 😆");
          reset();
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
          <div className={"flex items-center gap-x-5"}>
            <Input
              className={`mx-auto w-[220px] md:w-[400px] ${isNicknameValid ? "border-green-400" : "border-gray-200"}`}
              type={"text"}
              placeholder={"닉네임 (2자 이상)"}
              {...signUpForm.register("username")}
            />
            <Button
              variant={"outline"}
              className={`flex items-center gap-x-1 px-2 ${isNicknameValid ? "border-green-400" : "border-gray-200"}`}
              onClick={(event) => {
                event.preventDefault();
                handleCheckNickname(signUpForm.getValues("username"));
              }}
            >
              중복확인
              <CheckIcon
                className={`h-5 w-5 ${isNicknameValid ? "text-green-400" : "text-gray-500"}`}
              />
            </Button>
          </div>
          {signUpForm.formState.errors.username && (
            <FormMessage className={"mt-4"}>
              {signUpForm.formState.errors.username.message}
            </FormMessage>
          )}
          <Button
            type={"submit"}
            className={
              "mx-auto mt-8 h-12 w-24 rounded-xl bg-blue-500 p-2 text-[16px] text-white hover:bg-blue-400"
            }
          >
            가입하기
          </Button>
        </form>
      </Form>
    </div>
  );
}
