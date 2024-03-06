import { baseInstance } from "@/apis/index";
import type { MarkerData } from "@/types";

const getMarkers = async () => {
  try {
    const res = await baseInstance.get<MarkerData>(
      "/api/v1/restaurants/markers",
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export default getMarkers;
