import { z } from 'zod';

import { MetaSchema } from '@server/shared/schemas/metadata.schema';
import { imageSchema } from '../../images/schemas/image.schema';

export const createArticleSchema = z.object({
  isActive: z.boolean().default(true),
  slug: z.string().trim().toLowerCase().min(1),
  title: z.string().min(1),
  preview: z.string().min(1),
  text: z.string().min(1),
  metadata: MetaSchema,
  image_id: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const updateArticleSchema = z.object({
  id: z.string(),
  isActive: z.boolean().default(false),
  slug: z.string().trim().toLowerCase().min(1),
  title: z.string().min(1),
  preview: z.string().min(1),
  text: z.string().min(1),
  metadata: MetaSchema,
  image_id: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const paginationArticleSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  sort: z.string().optional(),
});

export const outputArticleSchema = z.object({
  id: z.string(),
  isActive: z.boolean().default(false),
  slug: z.string().trim().toLowerCase().min(1),
  title: z.string().min(1),
  preview: z.string().min(1),
  text: z.string().min(1),
  metadata: MetaSchema,
  image_id: z.string(),
  image: imageSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const outputArticleWithPaginationSchema = z.object({
  itemsCount: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  rangeStart: z.number(),
  rangeEnd: z.number(),
  items: z.array(outputArticleSchema),
});

export type createArticleSchema = z.TypeOf<typeof createArticleSchema>;
export type updateArticleSchema = z.TypeOf<typeof updateArticleSchema>;
export type paginationArticleSchema = z.TypeOf<typeof paginationArticleSchema>;
export type outputArticleSchema = z.TypeOf<typeof outputArticleSchema>;
export type outputArticleWithPaginationSchema = z.TypeOf<
  typeof outputArticleWithPaginationSchema
>;
