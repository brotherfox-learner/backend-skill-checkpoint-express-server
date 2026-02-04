import { z } from "zod";

export const voteSchema = z.object({
    vote: z
      .coerce
      .number()
      .refine((val) => val === 1 || val === -1, {
        message: "Invalid vote value: Vote must be 1 or -1",
      }),
  });
  