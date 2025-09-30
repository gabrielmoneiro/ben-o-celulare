import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-repair.jpg';

const Hero = () => {
  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de mais informações sobre os serviços da TechFix.";
    const phoneNumber = "5511999999999"; // Replace with actual number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Reparo profissional de celulares"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center md:text-left">
        <div className="max-w-4xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Assistência Técnica</span>
            <br />
            <span className="bg-gradient-neon-blue bg-clip-text text-transparent">
              Especializada
            </span>
            <br />
            <span className="text-foreground">em Celulares</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
            Reparo rápido, qualidade garantida e preços justos. 
            Sua confiança é nossa prioridade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-gradient-neon-blue hover:shadow-neon transition-all duration-300 text-lg px-8 py-6 h-auto group"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
              Fale Conosco no WhatsApp
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 h-auto"
              onClick={() => document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Produtos
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;