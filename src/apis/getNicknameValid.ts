import { baseInstance } from "@/apis/index";

const getNicknameValid = async (nickname: string) => {
  try {
    const res = await baseInstance.get(
      `/api/v1/users/profile/nickname?nickname=${nickname}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default getNicknameValid;
