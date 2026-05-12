import type { Product } from '../types/product'
import productsData from '../assets/products.json'

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

export async function fetchProducts(): Promise<Product[]> {
  await delay(400)
  return productsData as Product[]
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  await delay(400)
  return (productsData as Product[]).find(p => p.id === id)
}
