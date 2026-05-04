import { Metadata } from 'next';
import GalleryClient from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: 'Restaurant Gallery | De Leela Veg Restaurant — Food & Ambiance Photos',
  description: 'Browse De Leela\'s gallery showcasing our beautifully plated vegetarian dishes, elegant restaurant decor, warm dining ambiance, and family-friendly atmosphere.',
  keywords: 'vegetarian restaurant photos, restaurant ambiance, Indian food photography, De Leela gallery, dining interior',
};

export default function Gallery() {
  return <GalleryClient />;
}
