import { useState, useEffect } from 'react';
import { Monitor, Battery, Cpu, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback services if database is empty
  const fallbackServices = [
    {
      id: "1",
      name: "Troca de Tela",
      description: "Substituição de displays LCD, OLED e touch screen com garantia de qualidade.",
      price: 120,
      icon: "Monitor"
    },
    {
      id: "2",
      name: "Troca de Bateria",
      description: "Baterias originais e compatíveis para todos os modelos de smartphone.",
      price: 80,
      icon: "Battery"
    },
    {
      id: "3",
      name: "Reparos em Placa",
      description: "Soldagem e reparo de componentes SMD com equipamentos profissionais.",
      price: 150,
      icon: "Cpu"
    },
    {
      id: "4",
      name: "Software",
      description: "Reset, desbloqueio e atualização de software para diversos modelos.",
      price: 60,
      icon: "Unlock"
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  const handleQuoteRequest = (service: Service | typeof fallbackServices[0]) => {
    const message = `Olá! Gostaria de solicitar um orçamento para o serviço: *${service.name}*. Poderia me fornecer mais informações sobre prazo e valor?`;
    const phoneNumber = "5511999999999"; // Replace with actual number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Monitor,
      Battery,
      Cpu,
      Unlock,
    };
    return icons[iconName] || Monitor;
  };

  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="bg-gradient-neon-green bg-clip-text text-transparent">Serviços</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluções completas para seu smartphone com qualidade profissional e garantia
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando serviços...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayServices.map((service) => {
              const IconComponent = getIcon(service.icon);
              return (
                <Card 
                  key={service.id} 
                  className="bg-card-dark border-border hover:bg-card-hover transition-all duration-300 hover:shadow-card hover:-translate-y-2 group"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="bg-gradient-neon-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-background" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <CardDescription className="text-muted-foreground">
                      {service.description}
                    </CardDescription>
                    <div className="text-lg font-semibold text-accent">
                      A partir de R$ {service.price.toFixed(2).replace('.', ',')}
                    </div>
                    <Button
                      className="w-full bg-gradient-neon-blue hover:shadow-neon transition-all duration-300"
                      onClick={() => handleQuoteRequest(service)}
                    >
                      Solicitar Orçamento
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;