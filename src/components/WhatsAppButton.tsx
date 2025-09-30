import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de mais informações sobre os serviços da TechFix.";
    const phoneNumber = "5511999999999"; // Replace with actual number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 bg-gradient-neon-green hover:shadow-neon transition-all duration-300 rounded-full h-14 w-14 p-0 shadow-floating animate-pulse hover:animate-none group"
    >
      <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
    </Button>
  );
};

export default WhatsAppButton;