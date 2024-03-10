import { baseInstance } from "@/apis/index";
import type { RegisterRestaurantSchemaType } from "@/schemas/RegisterRestaurantSchema";

const patchRestaurantCandidate = async (
  candidateId: number,
  data: RegisterRestaurantSchemaType,
) => {
  try {
    const res = await baseInstance.patch(
      `/api/v1/candidates/${candidateId.toString()}`,
      data,
    );
    return res.status === 200;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default patchRestaurantCandidate;
