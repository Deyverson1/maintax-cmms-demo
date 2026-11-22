import { useNavigate } from "react-router-dom";
import { supabase } from "../utility/supabase";

export default function Logout() {
  const navigate = useNavigate();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error al cerrar sesión", error);
      return;
    }
    navigate("/");
  };
  return logout;
}
