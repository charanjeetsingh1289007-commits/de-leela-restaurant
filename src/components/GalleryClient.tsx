'use client';
import dynamic from 'next/dynamic';
const Gallery = dynamic(() => import('./Gallery'), { ssr: false, loading: () => <div style={{ minHeight: '100vh', background: '#1A1A1A' }} /> });
export default function GalleryClient() { return <Gallery />; }
