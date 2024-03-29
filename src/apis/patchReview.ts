import { baseInstance } from "@/apis/index";
import type { ReviewForm } from "@/types";

const patchReview = async (
  restaurantId: number,
  reviewId: number,
  data: ReviewForm,
) => {
  try {
    const res = await baseInstance.patch(
      `/api/v1/restaurants/${restaurantId}/reviews/${reviewId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.status === 200;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default patchReview;
