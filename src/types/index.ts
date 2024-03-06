export type Restaurant = {
  id: number;
  name: string;
  address: string;
  content: string;
  contact?: string;
  category: FOOD_CATEGORY;
  lat: number;
  lng: number;
  averageRating: number;
  reviews: Review[];
};

export type MarkerDetail = {
  id: number;
  name: string;
  averageRating: number;
  category: FOOD_CATEGORY;
  lat: number;
  lng: number;
};

export type MarkerData = {
  data: MarkerDetail[];
  size: number;
};

export type Review = {
  id: number;
  rating: number;
  content: string;
  images?: string[];
  reviewer: User;
  createdAt: string;
};

export type User = {
  id: number;
  nickname: string;
};

export type TokenResponse = {
  accessToken: string;
  accessTokenMaxAge: number;
  refreshTokenMaxAge: number;
};

export type FOOD_CATEGORY =
  | "KOREAN"
  | "CHINESE"
  | "JAPANESE"
  | "WESTERN"
  | "FAST"
  | "CAFE"
  | "BAKERY"
  | "THAI"
  | "ASIAN"
  | "INDIAN"
  | "ALCOHOL"
  | "CHICKEN"
  | "FLOUR"
  | "ETC";
