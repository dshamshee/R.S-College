import { z } from "zod";

export const zodGallery = z.object({
  title: z.string().optional().default(""),
  description: z.string().optional().default(""),
  types: z.enum(["EVENT", "FESTIVAL", "ACADEMIC", "OTHER"], {
    error: "Type must be EVENT, FESTIVAL, ACADEMIC, or OTHER",
  }),
  image: z.string().nullable().optional(),
  video: z.string().nullable().optional(),
});

export type GalleryInput = z.infer<typeof zodGallery>;
