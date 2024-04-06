import { baseInstance } from "@/apis/index";
import type { SearchResult } from "@/types";

const getRestaurantByKeyword = async (keyword: string) => {
  try {
    const res = await baseInstance.get<SearchResult>(
      `/api/v1/restaurants/markers/search?keyword=${keyword}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default getRestaurantByKeyword;
