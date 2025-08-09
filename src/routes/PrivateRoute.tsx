import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../redux/feature/auth/authSlice";
import type { ReactNode } from "react";
import { useAppSelector } from "../redux/feature/hook";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;