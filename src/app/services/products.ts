import { getToken } from './auth'
import type { Product } from '../types/product'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchProducts(): Promise<Product[]> {
  const token = getToken()

  const res = await fetch(`${API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.status === 401) {
    throw new Error('No autorizado. Iniciá sesión para ver los productos.')
  }

  if (!res.ok) {
    throw new Error('Error al obtener los productos.')
  }

  return res.json()
}
