import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Location = () => {
  const handleOpenMaps = () => {
    const address = "Rua das Flores, 123 - Centro, São Paulo - SP";
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    window.open('tel:+5511999999999', '_self');
  };

  return (
    <section id="localizacao" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossa <span className="bg-gradient-neon-green bg-clip-text text-transparent">Localização</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visite nossa loja física ou entre em contato conosco
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map Container */}
          <div className="order-2 lg:order-1">
            <Card className="bg-card-dark border-border overflow-hidden h-96">
              <div className="w-full h-full bg-muted relative rounded-lg">
                {/* Placeholder for Google Maps */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="h-12 w-12 text-primary mx-auto" />
                    <p className="text-muted-foreground">
                      Google Maps será integrado aqui
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleOpenMaps}
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Abrir no Google Maps
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2 space-y-6">
            <Card className="bg-card-dark border-border hover:bg-card-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <MapPin className="mr-3 h-6 w-6 text-primary" />
                  Endereço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  Rua das Flores, 123<br />
                  Centro - São Paulo - SP<br />
                  CEP: 01234-567
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card-dark border-border hover:bg-card-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Phone className="mr-3 h-6 w-6 text-accent" />
                  Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-muted-foreground">Telefone/WhatsApp:</p>
                  <p className="text-lg font-semibold text-foreground">(11) 99999-9999</p>
                </div>
                <Button
                  className="w-full bg-gradient-neon-green hover:shadow-neon transition-all duration-300"
                  onClick={handleCall}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Ligar Agora
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card-dark border-border hover:bg-card-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Clock className="mr-3 h-6 w-6 text-primary" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Segunda à Sexta:</span>
                    <span className="font-semibold text-foreground">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado:</span>
                    <span className="font-semibold text-foreground">08:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo:</span>
                    <span className="font-semibold text-accent">Fechado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;