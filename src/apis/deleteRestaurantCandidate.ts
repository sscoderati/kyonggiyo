import { baseInstance } from "@/apis/index";

const deleteRestaurantCandidate = async (id: number) => {
  try {
    const res = await baseInstance.delete(
      `/api/v1/candidates/${id.toString()}`,
    );
    return res.status === 200;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteRestaurantCandidate;
