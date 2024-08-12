import Header from '@/components/shared/header';
import NavBar from '@/components/shared/navbar';
import { getAuthedUserAction } from '@/server-actions/auth-actions';
import React, { ReactNode } from 'react';

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getAuthedUserAction();
  return (
    <div className="flex min-h-screen bg-[#F4F5F9]">
      <NavBar user={user} />
      <div className="mx-2 my-2.5 w-full pl-[98px]">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
