import { z } from "zod";

export const ReviewWriteFormSchema = z.object({
  rating: z.number({ required_error: "평점 입력은 필수입니다!" }),
  content: z
    .string({ required_error: "리뷰 내용 입력은 필수입니다!" })
    .min(10, {
      message: "리뷰 내용은 최소 10글자 이상이어야 합니다.",
    }),
  images: z.array(z.any()).optional(),
});

export type ReviewWriteFormType = z.infer<typeof ReviewWriteFormSchema>;
