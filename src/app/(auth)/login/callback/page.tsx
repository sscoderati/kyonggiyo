"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getTokens from "@/apis/getTokens";
import { useUserStore } from "@/store/UserStore";

export default function LoginCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setAccountId, setToken } = useUserStore();
  useEffect(() => {
    getTokens("KAKAO", searchParams.get("code") as string).then((res) => {
      if (res) {
        setAccountId(res.accountId);
        if (res.token) {
          setToken(res.token);
          router.replace("/");
        }
        if (!res.token) {
          router.replace("/signup");
        }
      }
    });
  }, [searchParams]);
  return null;
}
