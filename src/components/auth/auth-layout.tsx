import React, { ReactNode } from 'react';
import AuthHeader from './auth-header';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid h-screen grid-rows-[min-content_1fr]">
      <AuthHeader />
      {children}
    </div>
  );
};

export default AuthLayout;
