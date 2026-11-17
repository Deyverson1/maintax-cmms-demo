import ResourceAssignment from "../components/requisition/ResourceAssignment.jsx";
import PurchaseMetadata from "../components/requisition/PurchaseMetadata.jsx";
import ArrowBack from "../icons/arrowBack.jsx";
import ItemsDetails from "../components/requisition/ItemsDetails.jsx";
import SidebarNavigation from "../components/ui/SidebarNavigation.jsx";
import RequisitionMetadata from "../components/requisition/RequisitionMetadata.jsx";
import Footer from "../layouts/Footer.jsx";
import { useState } from "react";
import GeneralHeader from "../components/general-header/GeneralHeader.jsx";

export default function FormRequisition() {
  const [files, setFiles] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState({
    priority: "",
    description: "",
    requisitionNumber: "",
    requisitionName: "",
    section: "",
    machine: "",
    supplier: "",
    items: [
      {
        itemName: "",
        itemAmount: "",
        itemType: "",
        itemValue: "",
      },
    ],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updateItems = [...prev.items];
      updateItems[index] = {
        ...updateItems[index],
        [name]: value,
      };
      return {
        ...prev,
        items: updateItems,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col bg-white md:flex-row">
      <header className="flex items-center gap-2 border-b-2 border-[#F3F4F6] bg-[#F8FAFB] p-4 text-[#1B4F72] md:hidden">
        <ArrowBack />
        <h2 className="text-xl font-semibold">Nueva Requisición</h2>
      </header>
      <SidebarNavigation />
      <main className="mb-20 flex h-auto w-[80%] px-12 md:flex-col">
        <GeneralHeader />
        <div className="flex gap-4">
          <form className="flex flex-col md:w-[72%]" onSubmit={handleSubmit}>
            <div className="hidden pt-10 pb-6 md:flex md:flex-col">
              <h2 className="pl-4 text-4xl font-black tracking-tighter text-[#1B4F72]">
                Nueva Requisición de Compras
              </h2>
              <p className="py-2 pl-4 text-sm font-normal tracking-tighter text-gray-700 uppercase">
                Área de mantenimiento Industrial
              </p>
            </div>
            <ResourceAssignment
              formData={formData}
              handleChange={handleChange}
            />
            <PurchaseMetadata formData={formData} handleChange={handleChange} />
            <ItemsDetails
              formData={formData}
              handleItemChange={handleItemChange}
              setFormData={setFormData}
            />
          </form>
          <RequisitionMetadata
            formData={formData}
            files={files}
            setFiles={setFiles}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        </div>
      </main>
      <Footer />
    </section>
  );
}
