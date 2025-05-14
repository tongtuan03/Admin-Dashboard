import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { AppSidebar } from '@/components/AppSidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <main className='mx-5 w-full'>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>

  );
}


