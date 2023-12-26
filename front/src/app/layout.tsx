import { ReactNode } from 'react';

interface iProps {
  children: ReactNode;
}

export default function RootLayout({ children }: iProps) {
  return <>{children}</>;
}
