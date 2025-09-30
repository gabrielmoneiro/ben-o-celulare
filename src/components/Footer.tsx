import { Smartphone, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-card-dark border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-neon-blue p-2 rounded-lg">
                <Smartphone className="h-6 w-6 text-background" />
              </div>
              <span className="text-xl font-bold bg-gradient-neon-blue bg-clip-text text-transparent">
                TechFix
              </span>
            </div>
            <p className="text-muted-foreground">
              Assistência técnica especializada em celulares com qualidade, garantia e preços justos.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Links Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors">
                Início
              </a>
              <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors">
                Serviços
              </a>
              <a href="#produtos" className="text-muted-foreground hover:text-primary transition-colors">
                Produtos
              </a>
              <a href="#localizacao" className="text-muted-foreground hover:text-primary transition-colors">
                Localização
              </a>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Serviços</h3>
            <nav className="flex flex-col space-y-2">
              <span className="text-muted-foreground">Troca de Tela</span>
              <span className="text-muted-foreground">Troca de Bateria</span>
              <span className="text-muted-foreground">Reparos em Placa</span>
              <span className="text-muted-foreground">Desbloqueio</span>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">
                  Rua das Flores, 123 - Centro, SP
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground text-sm">
                  (11) 99999-9999
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">
                  contato@techfix.com.br
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="bg-muted p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-muted p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © {currentYear} TechFix. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;