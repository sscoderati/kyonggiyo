import { baseInstance } from "@/apis/index";
import type { RegisterRestaurantSchemaType } from "@/schemas/RegisterRestaurantSchema";

const postRestaurant = async (data: RegisterRestaurantSchemaType) => {
  try {
    const res = await baseInstance.post("/api/v1/restaurants", data);
    return res.status === 200;
  } catch (error) {
    console.error(error);
  }
};

export default postRestaurant;
