import { Metadata } from 'next';
import CinematicHomeClient from '@/components/CinematicHomeClient';

export const metadata: Metadata = {
  title: 'De Leela Veg Restaurant | Premium Pure Vegetarian Dining',
  description: 'De Leela Veg Restaurant offers an authentic, premium pure vegetarian dining experience in Talwara. Enjoy biryanis, paneer specialties, chaats, and more in a warm, family-friendly ambiance. Rated 4.8 stars by 119+ happy guests.',
  keywords: 'vegetarian restaurant, pure veg restaurant, Talwara, family dining, Indian vegetarian food, biryani, paneer, De Leela restaurant',
};

export default function HomePage() {
  return <CinematicHomeClient />;
}
