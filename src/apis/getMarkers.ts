import { baseInstance } from "@/apis/index";

const getMarkers = async () => {
  try {
    const res = await baseInstance.get("/api/v1/restaurants/markers");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export default getMarkers;
