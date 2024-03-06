import { useUserStore } from "@/store/UserStore";

const useUserAuthLevel = () => {
  const token = useUserStore.getState().token;

  if (token) {
    const payload = JSON.parse(atob(token.accessToken.split(".")[1]));
    return payload.role;
  }
};

export default useUserAuthLevel;
