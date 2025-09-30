import { useState, useEffect } from "react";
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  discount_percent: number;
  stock_status: boolean;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("stock_status", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback products if database is empty
  const fallbackProducts = [
    {
      id: "1",
      name: "Carregador USB-C Rápido",
      description: "Carregador original com cabo USB-C para smartphones",
      price: 45.00,
      image_url: "/carregador.png",
      category: "Acessórios",
      discount_percent: 10,
      stock_status: true
    },
    {
      id: "2", 
      name: "Fone de Ouvido Bluetooth",
      description: "Fone de ouvido sem fio com design moderno e qualidade de som superior",
      price: 120.00,
      image_url: "/fone.png",
      category: "Acessórios",
      discount_percent: 15,
      stock_status: true
    }
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  const handlePurchase = (product: Product | typeof fallbackProducts[0]) => {
    const finalPrice = product.discount_percent > 0 
      ? product.price * (1 - product.discount_percent / 100)
      : product.price;
    
    const message = `Olá! Tenho interesse no produto *${product.name}* no valor de R$ ${finalPrice.toFixed(2).replace('.', ',')}. Poderia me fornecer mais informações?`;
    const phoneNumber = "5511999999999"; // Replace with actual number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="produtos" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Produtos em <span className="bg-gradient-neon-blue bg-clip-text text-transparent">Destaque</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smartphones seminovos e novos com garantia e procedência
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {displayProducts.map((product) => {
              const finalPrice = product.discount_percent > 0 
                ? product.price * (1 - product.discount_percent / 100)
                : product.price;

              return (
                <Card 
                  key={product.id}
                  className="bg-card-dark border-border hover:bg-card-hover transition-all duration-300 hover:shadow-floating hover:-translate-y-2 group relative overflow-hidden"
                  style={{ borderRadius: '20px' }}
                >
                  {/* Discount Badge */}
                  {product.discount_percent > 0 && (
                    <Badge 
                      className="absolute top-3 right-3 z-10 bg-gradient-neon-green text-background font-bold text-xs px-2 py-1"
                      style={{ borderRadius: '8px' }}
                    >
                      -{product.discount_percent}% OFF
                    </Badge>
                  )}

                  <CardContent className="p-4 space-y-4">
                    {/* Product Image */}
                    <div className="aspect-square overflow-hidden rounded-xl bg-muted">
                      <img
                        src={product.image_url || "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {product.category && (
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                      )}
                      
                      {/* Pricing */}
                      <div className="space-y-1">
                        {product.discount_percent > 0 && (
                          <div className="text-xs text-muted-foreground line-through">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </div>
                        )}
                        <div className="text-lg md:text-xl font-bold text-accent">
                          R$ {finalPrice.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                    </div>

                    {/* Purchase Button */}
                    <Button
                      className="w-full bg-gradient-neon-blue hover:shadow-neon transition-all duration-300 text-xs md:text-sm h-10 group/btn"
                      onClick={() => handlePurchase(product)}
                      disabled={!product.stock_status}
                    >
                      {product.stock_status ? (
                        <>
                          <MessageCircle className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                          Comprar no WhatsApp
                        </>
                      ) : (
                        'Indisponível'
                      )}
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

export default Products;