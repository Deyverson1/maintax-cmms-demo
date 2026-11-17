// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../utility/supabase";

export default function ProtectedRoute({
  children,
  allowedRoles,
  role,
  roleLoading,
}) {
  const [sessionLoading, setSessionLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setSessionLoading(false);
    };

    getSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Esperamos tanto la sesión como el rol (si la ruta lo necesita)
  if (sessionLoading || (allowedRoles && roleLoading)) {
    return;
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/WorkOrders" replace />;
  }

  return children;
}
