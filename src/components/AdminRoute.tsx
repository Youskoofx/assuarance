import { Navigate, useLocation } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { useAuth } from "@/context/AuthContext";

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAdminUser(user: User | null) {
  if (!user) return false;
  const email = user.email?.toLowerCase() ?? "";
  const metadataRole =
    (user.app_metadata?.role as string | undefined) ||
    (user.user_metadata?.role as string | undefined);
  const metadataAdmin =
    (user.app_metadata?.is_admin as boolean | undefined) ||
    (user.user_metadata?.is_admin as boolean | undefined);

  const isAdminEmail = ADMIN_EMAILS.includes(email);
  const isAdminMeta = metadataRole === "admin" || metadataAdmin === true;

  return isAdminEmail || isAdminMeta;
}

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/espace-client" replace state={{ from: location }} />;
  }

  if (!isAdminUser(user)) {
    return <Navigate to="/espace-client/dashboard" replace />;
  }

  return <>{children}</>;
}
