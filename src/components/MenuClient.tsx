'use client';
import dynamic from 'next/dynamic';
const Menu = dynamic(() => import('./Menu'), { ssr: false, loading: () => <div style={{ minHeight: '100vh', background: '#fff' }} /> });
export default function MenuClient() { return <Menu />; }
