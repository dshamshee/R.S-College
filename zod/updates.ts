import { z } from "zod";

export const zodUpdates = z.object({
    title: z.string().min(1, { message: "Title is required" }).trim().toLowerCase().transform(val => val.charAt(0).toUpperCase() + val.slice(1)),
    description: z.string().min(1, { message: "Description is required" }).trim().toLowerCase().transform(val => val.charAt(0).toUpperCase() + val.slice(1)),
    type: z.enum(["NOTICE", "EXAMINATION", "TENDER"]),
    files: z.array(z.string()).optional(),
}).strict();

export type zodUpdateType = z.infer<typeof zodUpdates>;


