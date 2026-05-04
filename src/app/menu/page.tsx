import { Metadata } from 'next';
import MenuClient from '@/components/MenuClient';

export const metadata: Metadata = {
  title: 'Vegetarian Menu | De Leela Veg Restaurant — Biryanis, Paneer, Chaats & More',
  description: 'Explore De Leela\'s pure vegetarian menu featuring 50+ dishes — aromatic biryanis, paneer specialties, crispy chaats, fresh salads, wood-fired pizzas, noodles, and refreshing beverages.',
  keywords: 'vegetarian menu, veg biryani, paneer dishes, Indian vegetarian food, chaat, pizza, noodles, vegetarian restaurant menu',
};

export default function Menu() {
  return <MenuClient />;
}
