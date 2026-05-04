import { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact & Reservations | De Leela Veg Restaurant — Book Your Table',
  description: 'Contact De Leela Veg Restaurant in Talwara, Punjab to reserve your table or make an enquiry. Open daily 11 AM to 11 PM.',
  keywords: 'De Leela contact, restaurant reservation, book table vegetarian restaurant, De Leela Talwara location',
};

export default function Contact() {
  return <ContactClient />;
}
