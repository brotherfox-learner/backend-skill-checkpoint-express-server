import { z } from "zod";

//Schema สำหรับสร้าง answer
export const createAnswerBodySchema = z.object({
  content: z
    .string({ required_error: "Content is required" })
    .trim()
    .min(1, "Content cannot be empty")
    .max(300, "Content cannot be more than 300 characters"),
});

