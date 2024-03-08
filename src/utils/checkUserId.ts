import { useTokenStore } from "@/store/UserStore";

const checkUserId = () => {
  const token = useTokenStore.getState().token;

  if (token) {
    const payload = JSON.parse(atob(token.accessToken.split(".")[1]));
    return payload.id;
  }
};

export default checkUserId;
