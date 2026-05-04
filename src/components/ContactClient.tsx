'use client';
import dynamic from 'next/dynamic';
const Contact = dynamic(() => import('./Contact'), { ssr: false, loading: () => <div style={{ minHeight: '100vh', background: '#fff' }} /> });
export default function ContactClient() { return <Contact />; }
