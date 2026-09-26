import type { Product } from './types'

export const categories = [
  { name: 'Meesho Deals', sub: 'Huge Savings', icon: '🛍️', tone: 'pink' },
  { name: 'Amazon Deals', sub: 'Top Offers', icon: '🛒', tone: 'amber' },
  { name: 'Flipkart Deals', sub: 'Best Prices', icon: '🏷️', tone: 'blue' },
  { name: 'Myntra Deals', sub: 'Trendy Styles', icon: '👗', tone: 'rose' },
  { name: 'Fashion', sub: 'Latest Looks', icon: '👕', tone: 'red' },
  { name: 'Electronics', sub: 'Latest Gadgets', icon: '🎧', tone: 'violet' },
  { name: 'Home & Kitchen', sub: 'Smart Living', icon: '🏠', tone: 'green' },
  { name: 'Beauty', sub: 'Look Beautiful', icon: '💄', tone: 'pink' },
]

export const products: Product[] = [
  { id: 1, title: "Women's Ethnic Kurti Set", store: 'Meesho', category: 'Fashion', emoji: '👗', oldPrice: 999, price: 399, rating: 4.4, reviews: '2.1K', discount: 60, href: '#' },
  { id: 2, title: 'Wireless Bluetooth Earbuds', store: 'Amazon', category: 'Electronics', emoji: '🎧', oldPrice: 2999, price: 999, rating: 4.3, reviews: '5.2K', discount: 67, href: '#' },
  { id: 3, title: 'Portable Mini Blender', store: 'Flipkart', category: 'Home & Kitchen', emoji: '🥤', oldPrice: 1599, price: 799, rating: 4.2, reviews: '1.1K', discount: 50, href: '#' },
  { id: 4, title: 'Smart Watch for Men', store: 'Amazon', category: 'Electronics', emoji: '⌚', oldPrice: 1799, price: 499, rating: 4.4, reviews: '3.8K', discount: 72, href: '#', featured: true },
  { id: 5, title: 'Skincare Combo Set', store: 'Myntra', category: 'Beauty', emoji: '🧴', oldPrice: 949, price: 399, rating: 4.3, reviews: '2.9K', discount: 58, href: '#' },
  { id: 6, title: 'Home Storage Organizer', store: 'Meesho', category: 'Home & Kitchen', emoji: '🧺', oldPrice: 1299, price: 449, rating: 4.5, reviews: '4.4K', discount: 65, href: '#' },
  { id: 7, title: 'Running Shoes', store: 'Flipkart', category: 'Fashion', emoji: '👟', oldPrice: 2299, price: 1099, rating: 4.3, reviews: '8.2K', discount: 52, href: '#' },
  { id: 8, title: 'Premium Travel Backpack', store: 'Amazon', category: 'Fashion', emoji: '🎒', oldPrice: 1899, price: 799, rating: 4.6, reviews: '6.6K', discount: 58, href: '#' },
  { id: 9, title: 'Mixer Grinder 750W', store: 'Croma', category: 'Home & Kitchen', emoji: '⚙️', oldPrice: 4999, price: 2999, rating: 4.2, reviews: '990', discount: 40, href: '#' },
  { id: 10, title: 'Casual Cotton T-Shirt', store: 'Myntra', category: 'Fashion', emoji: '👕', oldPrice: 1299, price: 499, rating: 4.1, reviews: '1.7K', discount: 62, href: '#' },
  { id: 11, title: 'Wireless Keyboard & Mouse', store: 'Amazon', category: 'Electronics', emoji: '⌨️', oldPrice: 2499, price: 1199, rating: 4.4, reviews: '3.4K', discount: 52, href: '#' },
  { id: 12, title: 'Makeup Essentials Kit', store: 'Ajio', category: 'Beauty', emoji: '💄', oldPrice: 1999, price: 899, rating: 4.5, reviews: '2.5K', discount: 55, href: '#' },
]

