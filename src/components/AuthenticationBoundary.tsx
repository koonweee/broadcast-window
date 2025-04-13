import React from 'react';
import { useSession } from 'next-auth/react';
import LoadingPage from './LoadingPage';
import {UnauthenticatedPage} from './UnauthenticatedPage';

interface AuthenticationBoundaryProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  unauthenticatedComponent?: React.ReactNode;
}

const AuthenticationBoundary: React.FC<AuthenticationBoundaryProps> = ({
  children,
  loadingComponent = <LoadingPage />,
  unauthenticatedComponent = <UnauthenticatedPage />
}) => {
  const { status } = useSession();

  if (status === "loading") {
    return <>{loadingComponent}</>;
  }

  if (status === "unauthenticated") {
    return <>{unauthenticatedComponent}</>;
  }

  return <>{children}</>;
};

export default AuthenticationBoundary;
