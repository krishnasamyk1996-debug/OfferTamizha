export type Store = 'Meesho' | 'Amazon' | 'Flipkart' | 'Myntra' | 'Ajio' | 'Croma'

export type CategoryName = 'Meesho Deals' | 'Amazon Deals' | 'Flipkart Deals' | 'Myntra Deals' | 'Fashion' | 'Electronics' | 'Home & Kitchen' | 'Beauty'

export interface Product {
  id: number
  title: string
  store: Store
  category: CategoryName | string
  emoji: string
  image?: string
  oldPrice: number
  price: number
  rating: number
  reviews: string
  discount: number
  href: string
  description?: string
  buttonLabel?: string
  active?: boolean
  featured?: boolean
  clicks?: number
  createdAt?: string
  updatedAt?: string
}

export interface Slide {
  id: number
  type: 'image' | 'design'
  src?: string
  eyebrow?: string
  title?: string
  accent?: string
  copy?: string
  cta?: string
  href?: string
  theme?: 'orange' | 'purple' | 'blue'
}
