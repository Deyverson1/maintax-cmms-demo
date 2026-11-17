import Footer from "../../layouts/Footer";
import LoginAccess from "../../components/login/loginAccess";
import { useState } from "react";
import RequesAccessForm from "./RequestAccessForm";

export default function Login() {
  const [showRequestForm, setRequestForm] = useState(false);
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 bg-center bg-cover">
      <section className="flex items-center justify-center w-full h-f backdrop-blur-lg">
        <section className="flex flex-col items-center justify-center w-full h-full md:flex-row">
          <section className="flex h-screen w-full flex-1 flex-col items-center justify-center pt-14 md:bg-[#1B4F72] md:pt-0">
            <img
              src="/maintaxLogo.png"
              alt="Logo de Maintax CMMS Industrial"
              className="aspect-4/3 w-2/8 rounded-2xl"
            />
            <h1 className="text:[#1B4F72] pt-4 text-xl font-bold md:text-3xl md:text-[#ffffff]">
              MaintaX CMMS Industrial
            </h1>
            <p className="pt-1 text-sm text-gray-800 md:text-lg md:text-gray-200">
              Control total de tu operación de mantenimiento.
            </p>
          </section>
          <section className="flex-1">
            {showRequestForm ? (
              <RequesAccessForm
                setRequestForm={setRequestForm}
                showRequestForm={showRequestForm}
              />
            ) : (
              <LoginAccess
                setRequestForm={setRequestForm}
                showRequestForm={showRequestForm}
              />
            )}
          </section>
        </section>
      </section>
      <Footer />
    </main>
  );
}
