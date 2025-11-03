import { defineCollection, z } from "astro:content";

const docs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["draft", "alpha", "beta", "stable"]).default("draft"),
    updated: z.string().optional()
  })
});

export const collections = {
  docs
};
