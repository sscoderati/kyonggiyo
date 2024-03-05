import { baseInstance } from "@/apis/index";

const getLogout = async () => {
  try {
    const res = await baseInstance.get("/api/v1/auth/logout");
    return res.status === 204;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getLogout;
