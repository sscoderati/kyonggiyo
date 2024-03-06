import { baseInstance } from "@/apis/index";

const postReview = async (restaurantId: string, data: FormData) => {
  try {
    const res = await baseInstance.post(
      `/api/v1/restaurants/${restaurantId}/reviews`,
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

export default postReview;
