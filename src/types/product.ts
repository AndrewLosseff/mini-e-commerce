import { z } from 'zod'

export const reviewSchema = z.object({
  username: z.string(),
  comment: z.string(),
})

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  shortDescription: z.string(),
  thumbnailUrl: z.string(),
  longDescription: z.string(),
  category: z.string(),
  reviews: z.array(reviewSchema),
})

export const cartItemSchema = z.object({
  product: productSchema,
  quantity: z.number(),
})

export const productsSchema = z.array(productSchema)

export type Review = z.infer<typeof reviewSchema>
export type Product = z.infer<typeof productSchema>
export type CartItem = z.infer<typeof cartItemSchema>
