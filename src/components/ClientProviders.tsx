import SmoothScrollProvider from './SmoothScrollProvider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      {children}
    </SmoothScrollProvider>
  );
}
