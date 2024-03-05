export type Restaurant = {
  id: number;
  name: string;
  address: string;
  contact?: string;
  category: string;
  lat: number;
  lng: number;
  averageRating: number;
  reviews: Review[];
};

export type MarkerInfo = {
  id: number;
  name: string;
  address: string;
  category: string;
  lat: number;
  lng: number;
};

export type Review = {
  id: number;
  rating: number;
  content: string;
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
