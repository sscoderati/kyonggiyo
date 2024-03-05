import { baseInstance } from "@/apis/index";

interface UserProfile {
  accountId: number;
  nickname: string;
}
const postUserSignUp = async (profile: UserProfile) => {
  try {
    const res = await baseInstance.post("/api/v1/users/profile", profile);
    return res.status === 201;
  } catch (error) {
    console.error(error);
  }
};

export default postUserSignUp;
