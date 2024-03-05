import { baseInstance } from "@/apis/index";

const getNewToken = async () => {
  try {
    const res = await baseInstance.get("/api/v1/auth/reissue");
    return res.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getNewToken;
