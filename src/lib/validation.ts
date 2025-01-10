import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title is too short").max(100, "Title is too long"),
  description: z
    .string()
    .min(10, "Need a detailed description")
    .max(500, "Description is very long"),
  dueDate: z.date().optional(),
});