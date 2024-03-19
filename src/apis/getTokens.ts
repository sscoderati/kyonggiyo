import { baseInstance } from "@/apis/index";
import type { TokenResponse } from "@/types";
import { setCookie } from "cookies-next";

interface getTokenResponse {
  accountId: number;
  token: TokenResponse;
}

const getTokens = async (platform: string, code: string) => {
  try {
    const res = await baseInstance.get<getTokenResponse>(
      `/api/v1/auth/login/${platform}/callback?code=${code}`,
    );
    if (res.data.token) {
      setCookie("isAuth", "true", {
        path: "/",
        maxAge: res.data.token.refreshTokenMaxAge,
      });
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default getTokens;
