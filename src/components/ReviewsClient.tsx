'use client';
import dynamic from 'next/dynamic';
const Reviews = dynamic(() => import('./Reviews'), { ssr: false, loading: () => <div style={{ minHeight: '100vh', background: '#fff' }} /> });
export default function ReviewsClient() { return <Reviews />; }
