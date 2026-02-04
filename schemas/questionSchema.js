import  {z} from "zod";

//Schema สำหรับสร้าง question
export const questionSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
  
    // รับได้: undefined, null, "", "   ", หรือ string ปกติ
    // แล้ว transform ให้เป็น null ถ้าว่าง
    category: z
    .string()
    .optional()
    .nullable()
    .transform((val) => {
      if (val == null) return null;
      const trimmed = val.trim();
      return trimmed === "" ? null : trimmed;
    }),
  });