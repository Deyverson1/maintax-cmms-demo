import SidebarNavigation from "../components/ui/SidebarNavigation";
import GeneralHeader from "../components/general-header/GeneralHeader";
import ItemsList from "../icons/itemsList";
import OrderTypeSelector from "../components/work-orders/create/OrderTypeSelector";
import GeneralInfo from "../components/work-orders/create/GeneralInfo";
import { supabase } from "../utility/supabase";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CreateWorkTask() {
  const [orderType, setOrderType] = useState("nota");
  const [priority, setPriority] = useState("Baja");
  const [status, setStatus] = useState("Pendiente");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [orderNumber, setOrderNumber] = useState(null);
  const [area, setArea] = useState("");
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      const fetchOrder = async () => {
        const { data: orderData, error } = await supabase
          .from("work-orders")
          .select("*")
          .eq("id", id)
          .single();

        if (!error) {
          setTitle(orderData.title);
          setDescription(orderData.description);
          setPriority(orderData.priority);
          setDeadline(orderData.deadline || "");
          setArea(orderData.area);
          setOrderType(orderData.type);
          setOrderNumber(orderData.order_number);
          setStatus(orderData.status);
        }
      };
      fetchOrder();
    }
  }, [id]);

  const handleDelete = async () => {
    const { error } = await supabase.from("work-orders").delete().eq("id", id);
    if (error) {
      console.log("Error:", error);
    } else {
      navigate("/WorkOrders");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("handleSubmit ejecutado");
    if (isEditing) {
      // console.log("entrado editing");
      const { error } = await supabase
        .from("work-orders")
        .update({
          type: orderType,
          title,
          description,
          priority,
          deadline: deadline || null,
          area,
          status,
          completed_at:
            status === "Completado" ? new Date().toISOString() : null,
        })
        .eq("id", id);

      console.log("error del update:", error);
    } else {
      await supabase.from("work-orders").insert([
        {
          type: orderType,
          title,
          description,
          priority,
          deadline: deadline || null,
          area,
          status: "Pendiente",
        },
      ]);
    }
    navigate("/WorkOrders");
  };

  return (
    <main className="flex bg-[#F8FAFB]">
      <SidebarNavigation />
      <section className="w-full px-4 lg:w-[80%] lg:px-12">
        <GeneralHeader />
        <nav className="flex items-center gap-1 pt-10 text-sm uppercase lg:gap-2 lg:text-lg">
          <Link to={"/WorkOrders"} className="tracking-wider text-gray-900">
            Órdenes de Trabajo
          </Link>
          <span className="flex items-center">{">"}</span>
          <Link
            onClick={() => window.location.reload()}
            className="font-bold tracking-wider text-[#0A3960]"
          >
            {isEditing ? "Editar tarea" : "Nueva tarea"}
          </Link>
        </nav>
        <header className="mt-6 flex flex-col justify-between lg:flex-row">
          <div>
            <div className="flex gap-2">
              <h3 className="text-lg font-black tracking-tight text-[#191C1D]">
                {isEditing
                  ? "Editar Orden de Trabajo"
                  : "Crear Nueva Orden de Trabajo"}
              </h3>
              {isEditing && (
                <p className="text-xl font-black tracking-tight text-[#0A3960]">
                  OT #{orderNumber}
                </p>
              )}
            </div>
            <p className="mt-1.5 text-lg tracking-tight text-gray-800">
              {isEditing
                ? "Actualiza la información de esta orden de trabajo."
                : "Completa los datos para registrar una nueva orden en el sistema."}
            </p>
          </div>
          {isEditing ? (
            <div className="mt-4 flex items-center justify-center gap-4 text-xs lg:mt-0 lg:text-base">
              <Link to={"/WorkOrders"}>
                <button className="cursor-pointer rounded-lg border border-gray-300 px-6 py-2 font-semibold tracking-wide text-gray-600 uppercase">
                  Descartar
                </button>
              </Link>

              <button
                type="submit"
                form="workOrdersForm"
                className="cursor-pointer rounded-lg border border-gray-300 bg-[#0A3960] px-6 py-2 font-semibold tracking-wide text-[#ffffff] uppercase"
              >
                Guardar cambios
              </button>
            </div>
          ) : (
            ""
          )}
        </header>

        <form id="workOrdersForm" onSubmit={handleSubmit}>
          <GeneralInfo
            orderType={orderType}
            setOrderType={setOrderType}
            priority={priority}
            setPriority={setPriority}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            deadline={deadline}
            setDeadline={setDeadline}
            area={area}
            setArea={setArea}
            status={status}
            setStatus={setStatus}
            isEditing={isEditing}
            handleDelete={handleDelete}
          />
          {isEditing ? (
            ""
          ) : (
            <div className="flex justify-center">
              <button
                type="submit"
                className="mb-4 cursor-pointer rounded bg-[#0A3960] px-4 py-1 text-xl text-white uppercase transition-all duration-300 hover:scale-105"
              >
                enviar
              </button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
