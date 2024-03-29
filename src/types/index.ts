export type Restaurant = {
  id: number;
  name: string;
  address: string;
  reason: string;
  contact?: string;
  category: FOOD_CATEGORY;
  lat: number;
  lng: number;
  averageRating: number;
  reviews: Review[];
};

export type Candidate = {
  id: number;
  name: string;
  category: FOOD_CATEGORY;
  contact?: string;
  address: string;
  reason: string;
  lat: number;
  lng: number;
  createdAt: string;
  requesterId: number;
};

export type CandidateStatus = "WAITING" | "ACCEPTED";

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
  images?: { id: number; imageUrl: string; key: string }[];
  reviewer: User;
  createdAt: string;
};

export type ReviewForm = {
  rating: number;
  content: string;
  imageUrls: string[];
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

export type CandidateResponse = {
  data: Candidate[];
  numberOfElements: number;
  hasNext: boolean;
};

export type FOOD_CATEGORY =
  | "KOREAN"
  | "CHINESE"
  | "JAPANESE"
  | "WESTERN"
  | "FAST"
  | "CAFE"
  | "BAKERY"
  | "ASIAN"
  | "INDIAN"
  | "ALCOHOL"
  | "CHICKEN"
  | "FLOUR"
  | "ETC";
