import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogIn, LogOut, Package, Shirt, Plus, Edit, Trash2, Eye, EyeOff, 
  Save, X, Shield, Sparkles, Crown, Star, AlertCircle, Upload, Server, Settings
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AdminSession {
  id: string;
  username: string;
  sessionToken: string;
}

interface ShopPackage {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  rarity: string;
  category: string;
  features: string[];
  is_active: boolean;
  sort_order: number;
}

interface ShopSkin {
  id: string;
  name: string;
  category: string;
  rarity: string;
  price: number;
  image_url: string | null;
  images: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

const rarityColors: Record<string, string> = {
  Comune: "text-gray-400 bg-gray-500/20 border-gray-500/30",
  Raro: "text-blue-400 bg-blue-500/20 border-blue-500/30",
  Epico: "text-purple-400 bg-purple-500/20 border-purple-500/30",
  Leggendario: "text-amber-400 bg-amber-500/20 border-amber-500/30",
  Elite: "text-rose-400 bg-rose-500/20 border-rose-500/30",
};

const rarityIcons: Record<string, React.ElementType> = {
  Comune: Star,
  Raro: Star,
  Epico: Sparkles,
  Leggendario: Crown,
  Elite: Sparkles,
};

const AdminPage = () => {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState<"packages" | "skins" | "settings">("packages");
  const [packages, setPackages] = useState<ShopPackage[]>([]);
  const [skins, setSkins] = useState<ShopSkin[]>([]);
  
  const [editingItem, setEditingItem] = useState<ShopPackage | ShopSkin | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Server settings
  const [serverAddress, setServerAddress] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Check for existing session
  useEffect(() => {
    const savedSession = sessionStorage.getItem("admin_session");
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
  }, []);

  // Load data when logged in
  useEffect(() => {
    if (session) {
      if (activeTab === "settings") {
        loadSettings();
      } else {
        loadData();
      }
    }
  }, [session, activeTab]);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("admin-shop", {
        body: { action: "get-settings" },
      });

      if (!error && data.success) {
        const serverSetting = data.data?.find((s: { key: string }) => s.key === "server_address");
        if (serverSetting) {
          setServerAddress(serverSetting.value);
        }
      }
    } catch (err) {
      console.error("Load settings error:", err);
    }
  };

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-shop", {
        body: { 
          action: "update-setting", 
          key: "server_address", 
          value: serverAddress 
        },
      });

      if (!error && data.success) {
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 2000);
      }
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const { data, error } = await supabase.functions.invoke("admin-auth", {
        body: { action: "login", username, password },
      });

      if (error || !data.success) {
        setLoginError(data?.error || "Errore durante il login");
        return;
      }

      const newSession: AdminSession = {
        id: data.admin.id,
        username: data.admin.username,
        sessionToken: data.sessionToken,
      };
      
      setSession(newSession);
      sessionStorage.setItem("admin_session", JSON.stringify(newSession));
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Errore di connessione");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setSession(null);
    sessionStorage.removeItem("admin_session");
  };

  const loadData = async () => {
    const table = activeTab === "packages" ? "shop_packages" : "shop_skins";
    
    try {
      const { data, error } = await supabase.functions.invoke("admin-shop", {
        body: { action: "get-all", table },
      });

      if (error || !data.success) {
        console.error("Error loading data:", data?.error);
        return;
      }

      if (activeTab === "packages") {
        setPackages(data.data || []);
      } else {
        setSkins((data.data || []).map((skin: ShopSkin) => ({
          ...skin,
          images: Array.isArray(skin.images) ? skin.images : [],
        })));
      }
    } catch (err) {
      console.error("Load error:", err);
    }
  };

  const handleToggleActive = async (id: string) => {
    const table = activeTab === "packages" ? "shop_packages" : "shop_skins";
    
    try {
      const { data, error } = await supabase.functions.invoke("admin-shop", {
        body: { action: "toggle-active", table, id },
      });

      if (!error && data.success) {
        loadData();
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sei sicuro di voler eliminare questo elemento?")) return;
    
    const table = activeTab === "packages" ? "shop_packages" : "shop_skins";
    
    try {
      const { data, error } = await supabase.functions.invoke("admin-shop", {
        body: { action: "delete", table, id },
      });

      if (!error && data.success) {
        loadData();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleSave = async (formData: Partial<ShopPackage | ShopSkin>) => {
    const table = activeTab === "packages" ? "shop_packages" : "shop_skins";
    const action = editingItem ? "update" : "create";
    const id = editingItem?.id;

    try {
      const { data, error } = await supabase.functions.invoke("admin-shop", {
        body: { action, table, data: formData, id },
      });

      if (!error && data.success) {
        loadData();
        setEditingItem(null);
        setIsCreating(false);
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // Login screen
  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="font-minecraft text-2xl text-gradient-primary">Admin Panel</h1>
              <p className="text-muted-foreground text-sm mt-2">Accedi per gestire lo shop</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="bg-background"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-background"
                />
              </div>

              {loginError && (
                <motion.div 
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <AlertCircle className="w-4 h-4" />
                  {loginError}
                </motion.div>
              )}

              <Button 
                type="submit" 
                className="w-full gradient-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⟳
                  </motion.div>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Accedi
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="font-minecraft text-xl">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Ciao, <span className="text-primary font-medium">{session.username}</span>
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Esci
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <Button
            variant={activeTab === "packages" ? "default" : "outline"}
            onClick={() => setActiveTab("packages")}
            className="gap-2"
          >
            <Package className="w-4 h-4" />
            Pacchetti VIP
          </Button>
          <Button
            variant={activeTab === "skins" ? "default" : "outline"}
            onClick={() => setActiveTab("skins")}
            className="gap-2"
          >
            <Shirt className="w-4 h-4" />
            Skin
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "outline"}
            onClick={() => setActiveTab("settings")}
            className="gap-2"
          >
            <Settings className="w-4 h-4" />
            Impostazioni
          </Button>
        </div>

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl"
          >
            <div className="bg-card border-2 border-border rounded-2xl p-6">
              <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" />
                Impostazioni Server
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Indirizzo Server Minecraft</label>
                  <Input
                    value={serverAddress}
                    onChange={(e) => setServerAddress(e.target.value)}
                    placeholder="play.example.com:25565"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Questo indirizzo verrà mostrato in tutto il sito
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={handleSaveSettings} 
                    disabled={isSavingSettings}
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {isSavingSettings ? "Salvataggio..." : "Salva Impostazioni"}
                  </Button>
                  
                  <AnimatePresence>
                    {settingsSaved && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-green-500 text-sm font-medium"
                      >
                        ✓ Salvato!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Packages/Skins Tabs */}
        {activeTab !== "settings" && (
          <>
            {/* Actions */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-bold">
                {activeTab === "packages" ? "Pacchetti VIP" : "Skin"}
              </h2>
              <Button onClick={() => setIsCreating(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Nuovo {activeTab === "packages" ? "Pacchetto" : "Skin"}
              </Button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(activeTab === "packages" ? packages : skins).map((item) => {
                const RarityIcon = rarityIcons[item.rarity] || Star;
                const isPackage = activeTab === "packages";
                const pkg = isPackage ? (item as ShopPackage) : null;
                
                return (
                  <motion.div
                    key={item.id}
                    className={`p-4 rounded-xl border-2 bg-card ${
                      item.is_active ? "border-border" : "border-red-500/30 opacity-60"
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display font-bold">{item.name}</h3>
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border mt-1 ${rarityColors[item.rarity]}`}>
                          <RarityIcon className="w-3 h-3" />
                          {item.rarity}
                        </div>
                      </div>
                      <span className="font-bold text-accent">{item.price}€</span>
                    </div>

                    {item.image_url && (
                      <div className="w-full h-32 rounded-lg overflow-hidden bg-background mb-3">
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                    )}

                    {/* Show package description and features */}
                    {pkg && (
                      <div className="mb-3 space-y-2">
                        {pkg.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">{pkg.description}</p>
                        )}
                        {pkg.features && pkg.features.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {(pkg.features as string[]).slice(0, 3).map((feature, i) => (
                              <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                {feature}
                              </span>
                            ))}
                            {(pkg.features as string[]).length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{(pkg.features as string[]).length - 3} altro
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleActive(item.id)}
                        className="gap-1"
                      >
                        {item.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        {item.is_active ? "Nascondi" : "Mostra"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingItem(item)}
                        className="gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Modifica
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                        className="gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {(activeTab === "packages" ? packages : skins).length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p>Nessun elemento trovato. Clicca su "Nuovo" per aggiungerne uno.</p>
              </div>
            )}
          </>
        )}

        {/* Edit/Create Modal */}
        <AnimatePresence>
          {(editingItem || isCreating) && activeTab !== "settings" && (
            <EditModal
              item={editingItem}
              type={activeTab}
              onSave={handleSave}
              onClose={() => {
                setEditingItem(null);
                setIsCreating(false);
              }}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

interface EditModalProps {
  item: ShopPackage | ShopSkin | null;
  type: "packages" | "skins";
  onSave: (data: Partial<ShopPackage | ShopSkin>) => void;
  onClose: () => void;
}

const EditModal = ({ item, type, onSave, onClose }: EditModalProps) => {
  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    if (item) return { ...item };
    
    if (type === "packages") {
      return {
        name: "",
        description: "",
        price: 0,
        image_url: "",
        rarity: "Comune",
        category: "VIP",
        features: [],
        is_active: true,
        sort_order: 0,
      };
    }
    
    return {
      name: "",
      category: "Guerriero",
      rarity: "Raro",
      price: 0,
      image_url: "",
      images: [],
      is_popular: false,
      is_active: true,
      sort_order: 0,
    };
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [newFeature, setNewFeature] = useState("");

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('folder', type);

      const { data, error } = await supabase.functions.invoke('upload-image', {
        body: formDataUpload,
      });

      if (error || !data.success) {
        console.error('Upload failed:', data?.error || error);
        alert('Errore durante il caricamento: ' + (data?.error || 'Errore sconosciuto'));
        return;
      }

      // For skins: add to images array, for packages: set image_url
      if (type === "skins") {
        const currentImages = (formData.images as string[]) || [];
        const newImages = [...currentImages, data.url];
        setFormData({ 
          ...formData, 
          images: newImages,
          image_url: newImages[0] // First image is always the main one
        });
      } else {
        setFormData({ ...formData, image_url: data.url });
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Errore durante il caricamento');
    } finally {
      setIsUploading(false);
    }
  }, [type, formData]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const addFeature = () => {
    if (!newFeature.trim()) return;
    const features = (formData.features as string[]) || [];
    setFormData({ ...formData, features: [...features, newFeature.trim()] });
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    const features = (formData.features as string[]) || [];
    setFormData({ ...formData, features: features.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg bg-card border-2 border-border rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold">
            {item ? "Modifica" : "Nuovo"} {type === "packages" ? "Pacchetto VIP" : "Skin"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Nome</label>
            <Input
              value={formData.name as string}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={type === "packages" ? "es. Starter, VIP, Premium..." : "es. Guerriero Oscuro, Mago del Fuoco..."}
              required
            />
          </div>

          {type === "packages" && (
            <div>
              <label className="text-sm font-medium mb-2 block">Descrizione</label>
              <Textarea
                value={formData.description as string || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrizione del pacchetto..."
                rows={3}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Prezzo (€)</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.price as number}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Rarità</label>
              <select
                value={formData.rarity as string}
                onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              >
                <option value="Comune">Comune</option>
                <option value="Raro">Raro</option>
                <option value="Epico">Epico</option>
                <option value="Leggendario">Leggendario</option>
                <option value="Elite">Elite</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Categoria</label>
            {type === "packages" ? (
              <select
                value={formData.category as string}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              >
                <option value="VIP">VIP</option>
                <option value="Starter">Starter</option>
                <option value="Premium">Premium</option>
                <option value="Altro">Altro</option>
              </select>
            ) : (
              <select
                value={formData.category as string}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              >
                <option value="Guerriero">Guerriero</option>
                <option value="Mago">Mago</option>
                <option value="Assassino">Assassino</option>
                <option value="Elfo">Elfo</option>
                <option value="Non-Morto">Non-Morto</option>
                <option value="Cavaliere">Cavaliere</option>
                <option value="Altro">Altro</option>
              </select>
            )}
          </div>

          {/* Features for packages */}
          {type === "packages" && (
            <div>
              <label className="text-sm font-medium mb-2 block">Contenuto / Features</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="es. Accesso VIP, Kit Speciale..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                  />
                  <Button type="button" onClick={addFeature} size="icon" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {((formData.features as string[]) || []).length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-background rounded-lg border border-border">
                    {((formData.features as string[]) || []).map((feature, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-1 bg-primary/20 text-primary px-2 py-1 rounded text-sm"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Image Upload Area */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              {type === "skins" ? "Immagini (principale + galleria)" : "Immagine"}
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                isDragging 
                  ? "border-primary bg-primary/10" 
                  : "border-border hover:border-primary/50"
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                  />
                  <span className="text-sm text-muted-foreground">Caricamento...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-medium">
                      Trascina un'immagine qui
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      oppure clicca per selezionare (PNG, JPEG, WebP)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Images preview */}
            {type === "skins" && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-muted-foreground">
                  Prima immagine = principale, le altre = galleria
                </p>
                <div className="flex flex-wrap gap-2">
                  {((formData.images as string[]) || []).map((img, index) => (
                    <div key={index} className="relative group">
                      <div className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === 0 ? "border-primary" : "border-border"
                      }`}>
                        <img src={img} alt={`Img ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                      {index === 0 && (
                        <span className="absolute -top-1 -left-1 bg-primary text-primary-foreground text-xs px-1 rounded">
                          Main
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          const images = (formData.images as string[]) || [];
                          const newImages = images.filter((_, i) => i !== index);
                          setFormData({ 
                            ...formData, 
                            images: newImages,
                            image_url: newImages[0] || ""
                          });
                        }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Single image preview for packages */}
            {type === "packages" && formData.image_url && (
              <div className="mt-4 space-y-3">
                <div className="w-full h-32 rounded-lg overflow-hidden bg-background">
                  <img 
                    src={formData.image_url as string} 
                    alt="Preview" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({ ...formData, image_url: "" })}
                >
                  <X className="w-4 h-4 mr-2" />
                  Rimuovi immagine
                </Button>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Ordine visualizzazione</label>
            <Input
              type="number"
              min="0"
              value={formData.sort_order as number}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
            />
          </div>

          {type === "skins" && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_popular"
                checked={formData.is_popular as boolean}
                onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="is_popular" className="text-sm font-medium">Popolare (in evidenza)</label>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annulla
            </Button>
            <Button type="submit" className="flex-1 gap-2" disabled={isUploading}>
              <Save className="w-4 h-4" />
              Salva
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminPage;
