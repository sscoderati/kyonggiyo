import { useTokenStore } from "@/store/UserStore";

const checkUserAuthLevel = () => {
  const token = useTokenStore.getState().token;

  if (token) {
    const payload = JSON.parse(atob(token.accessToken.split(".")[1]));
    return payload.role as string;
  }
};

export default checkUserAuthLevel;
