import { productsSchema } from '../types/product'
import type { Product } from '../types/product'
import productsData from '../assets/products.json'

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

const products = productsSchema.parse(productsData)

export async function fetchProducts(): Promise<Product[]> {
  await delay(400)
  return products
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  await delay(400)
  return products.find(p => p.id === id)
}
