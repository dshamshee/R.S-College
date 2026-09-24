import { z } from "zod";

export const zodFaculty = z.object({
  name: z.string().min(1, "Faculty name is required"),
  designation: z.string().min(1, "Designation is required"),
  department: z.string().min(1, "Department is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  type: z.string().min(1, "Faculty type is required"),
  image: z.string().nullable().optional(),
  achivements: z.array(z.string()).optional().default([]),
});

export type FacultyInput = z.infer<typeof zodFaculty>;
