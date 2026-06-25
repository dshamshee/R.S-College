import { z } from "zod";

export const zodHoliday = z.object({
    date: z.string().min(1, { message: "Date is required" }),
    occasion: z.string().min(1, { message: "Occasion is required" }).trim(),
    type: z.enum(["Gazetted", "Local"]),
}).strict();

export type zodHolidayType = z.infer<typeof zodHoliday>;
