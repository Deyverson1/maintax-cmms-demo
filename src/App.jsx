import { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FormRequisition from "./pages/FormRequisiton";
import Login from "./pages/auth/Login";
import MainDashboard from "./pages/MainDashboard";
import WorkOrders from "./pages/WorkOrders";
import CreateWorkTask from "./pages/CreateWorkTask";
import RequisitionViewerPDF from "./components/requisition-viewer/RequisitionViewerPDF";
import Requisitions from "./pages/Requisitions";
import ProtectedRoute from "./components/login/ProtectedRoute";
import Assets from "./pages/Assets";
import { supabase } from "./utility/supabase";
import AssetProfile from "./components/assets/AssetProfile";
import Inventory from "./pages/Inventory";
import PartOutbound from "./pages/PartOutbound";
import Calendar from "./pages/Calendar";

function App() {
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const roleRef = useRef(null);

  useEffect(() => {
    const getRole = async (user) => {
      if (!user) {
        setRole(null);
        roleRef.current = null;
        setRoleLoading(false);
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const resolvedRole = data?.role ?? null;
      setRole(resolvedRole);
      roleRef.current = resolvedRole;
      setRoleLoading(false);
    };

    supabase.auth.getUser().then(({ data: { user } }) => {
      getRole(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "TOKEN_REFRESHED") return;
      if (event === "SIGNED_IN" && roleRef.current) return;
      setRoleLoading(true);
      getRole(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/MainDashboard"
          element={
            <ProtectedRoute
              roleLoading={roleLoading}
              allowedRoles={["admin"]}
              role={role}
            >
              <MainDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/RequisitionGenerator"
          element={
            <ProtectedRoute
              roleLoading={roleLoading}
              allowedRoles={["admin"]}
              role={role}
            >
              <FormRequisition />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Requisitions"
          element={
            <ProtectedRoute
              roleLoading={roleLoading}
              allowedRoles={["admin"]}
              role={role}
            >
              <Requisitions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Requisitions/:id"
          element={
            <ProtectedRoute
              roleLoading={roleLoading}
              allowedRoles={["admin"]}
              role={role}
            >
              <RequisitionViewerPDF />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Assets"
          element={
            <ProtectedRoute
              roleLoading={roleLoading}
              allowedRoles={["admin"]}
              role={role}
            >
              <Assets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Assets/Profile"
          element={
            <ProtectedRoute
              roleLoading={roleLoading}
              allowedRoles={["admin"]}
              role={role}
            >
              <AssetProfile />
            </ProtectedRoute>
          }
        />

        {/* Rutas accesibles para cualquier usuario autenticado */}
        <Route
          path="/WorkOrders"
          element={
            <ProtectedRoute roleLoading={roleLoading} role={role}>
              <WorkOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/WorkOrders/Create"
          element={
            <ProtectedRoute roleLoading={roleLoading} role={role}>
              <CreateWorkTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/WorkOrders/Edit/:id"
          element={
            <ProtectedRoute roleLoading={roleLoading} role={role}>
              <CreateWorkTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Inventory"
          element={
            <ProtectedRoute roleLoading={roleLoading} role={role}>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/PartOutbound"
          element={
            <ProtectedRoute roleLoading={roleLoading} role={role}>
              <PartOutbound />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Calendar"
          element={
            <ProtectedRoute roleLoading={roleLoading} role={role}>
              <Calendar />
            </ProtectedRoute>
          }
        />
        {/* Fallback para que nunca quede en blanco */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
