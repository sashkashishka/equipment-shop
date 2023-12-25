import React from 'react';

interface iProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function EquipmentLayout({ children }: iProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4">
      <div>
      sidebar

      </div>
      {children}
    </div>
  );
}
