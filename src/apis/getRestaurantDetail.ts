import { baseInstance } from "@/apis/index";
import type { Restaurant } from "@/types";

const getRestaurantDetail = async (id: number) => {
  try {
    const res = await baseInstance.get<Restaurant>(
      `/api/v1/restaurants/markers/${id}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default getRestaurantDetail;
