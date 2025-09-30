import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Package, Wrench, Edit, Trash2, Plus } from "lucide-react";
import { User } from "@supabase/supabase-js";

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

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

const AdminEnhanced = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category: "",
    discount_percent: "0",
    stock_status: true,
  });

  // Service form state
  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    price: "",
    icon: "",
  });

  useEffect(() => {
    checkAuth();
    fetchProducts();
    fetchServices();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("admin_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!profile) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão de administrador.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setUser(user);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar produtos.",
        variant: "destructive",
      });
    } else {
      setProducts(data || []);
    }
  };

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar serviços.",
        variant: "destructive",
      });
    } else {
      setServices(data || []);
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      image_url: "",
      category: "",
      discount_percent: "0",
      stock_status: true,
    });
    setEditingProduct(null);
  };

  const resetServiceForm = () => {
    setServiceForm({
      name: "",
      description: "",
      price: "",
      icon: "",
    });
    setEditingService(null);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        image_url: productForm.image_url,
        category: productForm.category,
        discount_percent: parseInt(productForm.discount_percent),
        stock_status: productForm.stock_status,
      };

      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);

        if (error) throw error;

        toast({
          title: "Produto atualizado!",
          description: "Produto atualizado com sucesso.",
        });
      } else {
        // Create new product
        const { error } = await supabase.from("products").insert(productData);

        if (error) throw error;

        toast({
          title: "Produto adicionado!",
          description: "Produto cadastrado com sucesso.",
        });
      }

      resetProductForm();
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceData = {
        name: serviceForm.name,
        description: serviceForm.description,
        price: parseFloat(serviceForm.price),
        icon: serviceForm.icon,
      };

      if (editingService) {
        // Update existing service
        const { error } = await supabase
          .from("services")
          .update(serviceData)
          .eq("id", editingService.id);

        if (error) throw error;

        toast({
          title: "Serviço atualizado!",
          description: "Serviço atualizado com sucesso.",
        });
      } else {
        // Create new service
        const { error } = await supabase.from("services").insert(serviceData);

        if (error) throw error;

        toast({
          title: "Serviço adicionado!",
          description: "Serviço cadastrado com sucesso.",
        });
      }

      resetServiceForm();
      fetchServices();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar produto.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Produto deletado!",
      });
      fetchProducts();
    }
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar serviço.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Serviço deletado!",
      });
      fetchServices();
    }
  };

  const startEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      image_url: product.image_url || "",
      category: product.category || "",
      discount_percent: product.discount_percent.toString(),
      stock_status: product.stock_status,
    });
  };

  const startEditService = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      description: service.description || "",
      price: service.price.toString(),
      icon: service.icon || "",
    });
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Painel Admin - Neon Fix Pro
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Produtos ({products.length})
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Serviços ({services.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {editingProduct ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editingProduct ? "Editar Produto" : "Adicionar Produto"}
                </CardTitle>
                <CardDescription>
                  {editingProduct ? "Edite as informações do produto" : "Cadastre um novo produto no sistema"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                      required
                      placeholder="Nome do produto"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      required
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Input
                      id="category"
                      value={productForm.category}
                      onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                      placeholder="Ex: Smartphones, Tablets, Acessórios"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">Desconto (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={productForm.discount_percent}
                      onChange={(e) => setProductForm({...productForm, discount_percent: e.target.value})}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="image_url">URL da Imagem</Label>
                    <Input
                      id="image_url"
                      type="url"
                      value={productForm.image_url}
                      onChange={(e) => setProductForm({...productForm, image_url: e.target.value})}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                      placeholder="Descrição detalhada do produto..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2 md:col-span-2">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? "Salvando..." : (editingProduct ? "Atualizar Produto" : "Adicionar Produto")}
                    </Button>
                    {editingProduct && (
                      <Button type="button" variant="outline" onClick={resetProductForm}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Produtos Cadastrados ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum produto cadastrado ainda.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <Card key={product.id} className="bg-surface">
                        <CardContent className="p-4">
                          {product.image_url && (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-32 object-cover rounded-md mb-3"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          )}
                          <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                          {product.description && (
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                          )}
                          <div className="flex items-center gap-2 mb-2">
                            {product.discount_percent > 0 ? (
                              <>
                                <span className="text-sm text-muted-foreground line-through">
                                  R$ {product.price.toFixed(2)}
                                </span>
                                <span className="font-bold text-neon">
                                  R$ {(product.price * (1 - product.discount_percent / 100)).toFixed(2)}
                                </span>
                                <Badge variant="destructive" className="text-xs">
                                  -{product.discount_percent}% OFF
                                </Badge>
                              </>
                            ) : (
                              <span className="font-bold text-neon">
                                R$ {product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {product.category && (
                            <Badge variant="outline" className="mb-3">
                              {product.category}
                            </Badge>
                          )}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startEditProduct(product)}
                              className="flex-1"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Editar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteProduct(product.id)}
                              className="flex-1"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Deletar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {editingService ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editingService ? "Editar Serviço" : "Adicionar Serviço"}
                </CardTitle>
                <CardDescription>
                  {editingService ? "Edite as informações do serviço" : "Cadastre um novo serviço no sistema"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleServiceSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-name">Nome *</Label>
                    <Input
                      id="service-name"
                      value={serviceForm.name}
                      onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                      required
                      placeholder="Nome do serviço"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service-price">Preço (R$) *</Label>
                    <Input
                      id="service-price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={serviceForm.price}
                      onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                      required
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="service-icon">Ícone (classe Lucide)</Label>
                    <Input
                      id="service-icon"
                      value={serviceForm.icon}
                      onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})}
                      placeholder="Ex: Smartphone, Battery, Cpu, Wrench"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="service-description">Descrição</Label>
                    <Textarea
                      id="service-description"
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                      placeholder="Descrição detalhada do serviço..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2 md:col-span-2">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? "Salvando..." : (editingService ? "Atualizar Serviço" : "Adicionar Serviço")}
                    </Button>
                    {editingService && (
                      <Button type="button" variant="outline" onClick={resetServiceForm}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Serviços Cadastrados ({services.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {services.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum serviço cadastrado ainda.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                      <Card key={service.id} className="bg-surface">
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-2">{service.name}</h3>
                          {service.description && (
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{service.description}</p>
                          )}
                          <p className="font-bold text-neon mb-2">
                            R$ {service.price.toFixed(2)}
                          </p>
                          {service.icon && (
                            <Badge variant="outline" className="mb-3">
                              {service.icon}
                            </Badge>
                          )}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startEditService(service)}
                              className="flex-1"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Editar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteService(service.id)}
                              className="flex-1"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Deletar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminEnhanced;

