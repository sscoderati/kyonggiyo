import { z } from "zod";

export const RegisterRestaurantSchema = z.object({
  name: z.string({ required_error: "맛집 이름 입력은 필수입니다!" }).min(2, {
    message: "맛집 이름은 최소 2글자 이상이어야 합니다.",
  }),
  category: z.string({ required_error: "맛집 카테고리 선택은 필수입니다!" }),
  contact: z.string().optional(),
  reason: z
    .string()
    .min(10, { message: "추천 이유는 최소 10글자 이상이어야 합니다." }),
  address: z.string({ required_error: "맛집 주소 입력은 필수입니다!" }),
  lat: z.number(),
  lng: z.number(),
});

export type RegisterRestaurantSchemaType = z.infer<
  typeof RegisterRestaurantSchema
>;
