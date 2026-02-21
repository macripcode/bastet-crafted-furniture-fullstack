export type Measures = {
  width_cm: number
  height_cm: number
  depth_cm: number
  weight_kg?: number
}

export interface Product {
  id: number
  name: string
  price: number
  stock: number
  image_url: string
  category: string
  description: string
  characteristics: string[]
  materials: string[]
  measures: Measures
}
