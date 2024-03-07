import { baseInstance } from "@/apis/index";

const patchReview = async (
  restaurantId: number,
  reviewId: number,
  data: FormData,
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
  }
};

export default patchReview;
