import { baseInstance } from "@/apis/index";

const deleteReviewImage = async (imageId: string) => {
  try {
    const res = await baseInstance.delete(`/api/v1/images/${imageId}`);
    return res.status === 204;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteReviewImage;
