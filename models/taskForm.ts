import { z } from "zod";

export const taskSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    status: z.enum(["Backlog", "Todo", "Inprogress", "Done", "Canceled"]),
    label: z.enum(["Documentation", "Feature", "Bug"]),
    priority: z.enum(["Low", "Medium", "High"]),
});

export type TaskFormData = z.infer<typeof taskSchema>;