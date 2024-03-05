import { baseInstance } from "@/apis/index";
import type { TokenResponse } from "@/types";

interface getTokenResponse {
  accountId: number;
  token: TokenResponse;
}

const getTokens = async (platform: string, code: string) => {
  try {
    const res = await baseInstance.get<getTokenResponse>(
      `/api/v1/auth/login/${platform}/callback?code=${code}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default getTokens;
