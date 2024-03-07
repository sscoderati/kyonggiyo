import { useUserStore } from "@/store/UserStore";

const useUserId = () => {
  const token = useUserStore.getState().token;

  if (token) {
    const payload = JSON.parse(atob(token.accessToken.split(".")[1]));
    return payload.id;
  }
};

export default useUserId;
