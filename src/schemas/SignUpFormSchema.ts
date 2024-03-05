import { z } from "zod";

export const SignUpFormSchema = z.object({
  username: z.string().min(2, {
    message: "닉네임은 최소 2글자 이상이어야 합니다.",
  }),
});

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;
