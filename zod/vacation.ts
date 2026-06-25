import { z } from "zod";

export const zodVacation = z.object({
    name: z.string().min(1, { message: "Name is required" }).trim(),
    startDate: z.string().min(1, { message: "Start date is required" }),
    endDate: z.string().min(1, { message: "End date is required" }),
}).strict();

export type zodVacationType = z.infer<typeof zodVacation>;
