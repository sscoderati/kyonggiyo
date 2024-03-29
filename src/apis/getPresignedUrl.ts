import { baseInstance } from "@/apis/index";

const getPresignedUrl = async (filename: string) => {
  try {
    const res = await baseInstance.post("/api/v1/images/presignedUrl", {
      filename: filename,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default getPresignedUrl;
