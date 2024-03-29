import { baseInstance } from "@/apis/index";

export type DeleteReviewImageRequestBody = {
  id: number;
  key: string;
};

const deleteReviewImage = async (info: DeleteReviewImageRequestBody) => {
  try {
    const res = await baseInstance.delete(`/api/v1/images/${info.id}`, {
      data: info,
    });
    return res.status === 204;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteReviewImage;
