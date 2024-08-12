import React, { ReactNode } from 'react';
import AuthLayoutWrapper from '../../components/auth/auth-layout';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
};

export default AuthLayout;
