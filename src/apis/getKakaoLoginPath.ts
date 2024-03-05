import { baseInstance } from "@/apis/index";

const getKakaoLoginPath = async () => {
  try {
    const res = await baseInstance.get("/api/v1/auth/login/KAKAO");
    return res.headers.location;
  } catch (error) {
    console.error(error);
  }
};

export default getKakaoLoginPath;
