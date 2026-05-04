import { Metadata } from 'next';
import ReviewsClient from '@/components/ReviewsClient';

export const metadata: Metadata = {
  title: 'Customer Reviews | De Leela Veg Restaurant — Rated 4.8 Stars',
  description: 'Read genuine customer reviews for De Leela Veg Restaurant. Rated 4.8/5 by 119+ satisfied guests who praise the delicious food, great ambiance, friendly staff, and consistent quality.',
  keywords: 'De Leela reviews, vegetarian restaurant reviews, restaurant rating, best veg restaurant, guest testimonials',
};

export default function Reviews() {
  return <ReviewsClient />;
}
