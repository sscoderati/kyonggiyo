import { baseInstance } from "@/apis/index";

const deleteReview = async (restaurantId: number, reviewId: number) => {
  try {
    const res = await baseInstance.delete(
      `/api/v1/restaurants/${restaurantId.toString()}/reviews/${reviewId.toString()}`,
    );
    return res.status === 200;
  } catch (error) {
    console.error(error);
  }
};

export default deleteReview;
