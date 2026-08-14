import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const article = z.object({
  title: z.string(),
  description: z.string(),
  track: z.enum(['control', 'vision', 'both']),
  tags: z.array(z.string()).default([]),
  date: z.coerce.date(),
  resources: z
    .array(
      z.object({
        title: z.string(),
        url: z.string().url(),
        note: z.string().optional(),
      })
    )
    .default([]),
});

export const collections = {
  basics: defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/basics' }), schema: article }),
  algorithms: defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/algorithms' }), schema: article }),
  hardware: defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/hardware' }), schema: article }),
  contests: defineCollection({ loader: glob({ pattern: '**/*.mdx', base: './src/content/contests' }), schema: article }),
};
