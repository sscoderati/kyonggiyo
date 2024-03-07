import { baseInstance } from "@/apis/index";
import type { CandidateResponse, CandidateStatus } from "@/types";

const getRestaurantCandidates = async (
  status: CandidateStatus,
  page: number,
) => {
  try {
    const res = await baseInstance.get<CandidateResponse>(
      `/api/v1/candidates?status=${status}&page=${page}`,
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default getRestaurantCandidates;
