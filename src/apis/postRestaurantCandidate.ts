import { baseInstance } from "@/apis/index";
import type { RegisterRestaurantSchemaType } from "@/schemas/RegisterRestaurantSchema";

const postRestaurantCandidate = async (data: RegisterRestaurantSchemaType) => {
  try {
    const res = await baseInstance.post("/api/v1/candidates", data);
    return res.status === 200;
  } catch (error) {
    console.log(error);
  }
};

export default postRestaurantCandidate;
