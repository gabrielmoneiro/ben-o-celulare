import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import Products from "@/components/Products";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Classe pt-20 adicionada abaixo para corrigir a sobreposição */}
      <main className="flex-grow pt-20">
        <Hero />
        <Services />
        <Products />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;