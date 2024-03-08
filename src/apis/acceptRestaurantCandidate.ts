import { baseInstance } from "@/apis/index";

const acceptRestaurantCandidate = async (candidateId: number) => {
  try {
    const res = await baseInstance.post(`/api/v1/candidates/${candidateId}`);
    return res.status === 200;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default acceptRestaurantCandidate;
