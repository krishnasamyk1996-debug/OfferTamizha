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

export interface Banner {
  id: number
  src: string
  title?: string
  cta?: string
  href?: string
}
