
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Users, TrendingUp, Eye, QrCode, Edit, Trash2, Settings, BarChart3, Menu, Save, Bell } from 'lucide-react';
import { toast } from 'sonner';
import QRCodeGenerator from './QRCodeGenerator';
import RestaurantEditForm from './RestaurantEditForm';

interface Restaurant {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  plan: string;
  status: string;
  menuItems: number;
  totalScans: number;
  lastActive: string;
  owner: string;
  description?: string;
  hours?: string;
  category?: string;
}

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
}

const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({ restaurant, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(restaurant);

  // Analytics mock data
  const analyticsData = {
    weeklyScans: [45, 52, 48, 61, 55, 67, 73],
    monthlyRevenue: "€1,234",
    averageSessionTime: "2m 15s",
    conversionRate: "4.2%",
    topMenuItems: [
      { name: "Pizza Margherita", views: 245, orders: 89 },
      { name: "Burger Classic", views: 198, orders: 76 },
      { name: "Salade César", views: 167, orders: 45 }
    ],
    deviceBreakdown: { mobile: 75, desktop: 20, tablet: 5 }
  };

  // Settings states
  const [settings, setSettings] = useState({
    notifications: true,
    autoUpdate: false,
    publicProfile: true,
    allowReviews: true
  });

  React.useEffect(() => {
    setCurrentRestaurant(restaurant);
  }, [restaurant]);

  if (!currentRestaurant) return null;

  const handleSuspendRestaurant = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Restaurant ${currentRestaurant.name} suspendu`);
      onClose();
    } catch (error) {
      toast.error('Erreur lors de la suspension');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRestaurant = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce restaurant ?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Restaurant ${currentRestaurant.name} supprimé`);
      onClose();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMenu = () => {
    window.open(`/menu/${currentRestaurant.id}`, '_blank');
  };

  const handleSaveRestaurant = (updatedRestaurant: Restaurant) => {
    setCurrentRestaurant(updatedRestaurant);
    setIsEditing(false);
  };

  const handleSaveSettings = () => {
    toast.success('Paramètres sauvegardés avec succès !');
  };

  const handleSendNotification = () => {
    toast.success(`Notification envoyée à ${currentRestaurant.name}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-scanner-red to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {currentRestaurant.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{currentRestaurant.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={currentRestaurant.status === 'Actif' ? 'default' : 'secondary'}>
                  {currentRestaurant.status}
                </Badge>
                <Badge variant="outline">{currentRestaurant.plan}</Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="qrcode">QR Code</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {isEditing ? (
              <RestaurantEditForm
                restaurant={currentRestaurant}
                onSave={handleSaveRestaurant}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-scanner-red" />
                        Informations de contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail className="h-4 w-4 text-gray-500 mt-1" />
                        <span className="text-sm">{currentRestaurant.email}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-4 w-4 text-gray-500 mt-1" />
                        <span className="text-sm">{currentRestaurant.phone}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                        <span className="text-sm">{currentRestaurant.address}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-4 w-4 text-gray-500 mt-1" />
                        <span className="text-sm">{currentRestaurant.hours || 'Lun-Dim: 12h-22h'}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-scanner-green-600" />
                        Statistiques
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Plats au menu</span>
                        <span className="font-semibold">{currentRestaurant.menuItems}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total scans QR</span>
                        <span className="font-semibold">{currentRestaurant.totalScans}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Dernière activité</span>
                        <span className="font-semibold text-sm">{currentRestaurant.lastActive}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Propriétaire</span>
                        <span className="font-semibold text-sm">{currentRestaurant.owner}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleViewMenu} className="bg-scanner-green-600 hover:bg-scanner-green-700">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir le menu
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                  <Button variant="outline" onClick={handleSendNotification}>
                    <Bell className="h-4 w-4 mr-2" />
                    Notifier
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-orange-600 border-orange-200 hover:bg-orange-50"
                    onClick={handleSuspendRestaurant}
                    disabled={loading}
                  >
                    Suspendre
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={handleDeleteRestaurant}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="menu">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Gestion du menu</h3>
                  <p className="text-gray-600">Gérez les plats et catégories du menu</p>
                </div>
                <Button className="bg-scanner-green-600 hover:bg-scanner-green-700">
                  <Menu className="h-4 w-4 mr-2" />
                  Ajouter un plat
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Plats Total</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{currentRestaurant.menuItems}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Catégories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Plats Populaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Catégories de menu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Entrées', 'Plats principaux', 'Desserts', 'Boissons'].map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{Math.floor(Math.random() * 10) + 1} plats</span>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Analytics détaillées</h3>
                  <p className="text-gray-600">Performances et statistiques du restaurant</p>
                </div>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Exporter Rapport
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Revenus Mensuel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{analyticsData.monthlyRevenue}</div>
                    <p className="text-xs text-gray-500">+12% vs mois dernier</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Temps de Session</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.averageSessionTime}</div>
                    <p className="text-xs text-gray-500">temps moyen</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Taux de Conversion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.conversionRate}</div>
                    <p className="text-xs text-gray-500">scan vers commande</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Scans Aujourd'hui</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.weeklyScans[6]}</div>
                    <p className="text-xs text-gray-500">+8% vs hier</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Scans QR par Jour</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-end gap-2">
                      {analyticsData.weeklyScans.map((scans, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="bg-scanner-green-500 w-full rounded-t"
                            style={{ height: `${(scans / Math.max(...analyticsData.weeklyScans)) * 100}%` }}
                          />
                          <span className="text-xs mt-2">{scans}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Plats les Plus Consultés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.topMenuItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.views} vues</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{item.orders}</p>
                            <p className="text-xs text-gray-500">commandes</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qrcode">
            <QRCodeGenerator restaurantId={currentRestaurant.id} restaurantName={currentRestaurant.name} />
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Paramètres du restaurant</h3>
                  <p className="text-gray-600">Configurez les options spécifiques à ce restaurant</p>
                </div>
                <Button onClick={handleSaveSettings} className="bg-scanner-green-600 hover:bg-scanner-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications">Notifications par email</Label>
                        <p className="text-sm text-gray-600">Recevoir les notifications importantes</p>
                      </div>
                      <Switch 
                        id="notifications"
                        checked={settings.notifications}
                        onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-update">Mise à jour automatique</Label>
                        <p className="text-sm text-gray-600">Mettre à jour automatiquement le menu</p>
                      </div>
                      <Switch 
                        id="auto-update"
                        checked={settings.autoUpdate}
                        onCheckedChange={(checked) => setSettings({...settings, autoUpdate: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Visibilité</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="public-profile">Profil public</Label>
                        <p className="text-sm text-gray-600">Rendre le restaurant visible publiquement</p>
                      </div>
                      <Switch 
                        id="public-profile"
                        checked={settings.publicProfile}
                        onCheckedChange={(checked) => setSettings({...settings, publicProfile: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allow-reviews">Autoriser les avis</Label>
                        <p className="text-sm text-gray-600">Permettre aux clients de laisser des avis</p>
                      </div>
                      <Switch 
                        id="allow-reviews"
                        checked={settings.allowReviews}
                        onCheckedChange={(checked) => setSettings({...settings, allowReviews: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Informations de contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-email">Email de contact</Label>
                      <Input id="contact-email" defaultValue={currentRestaurant.email} />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Téléphone</Label>
                      <Input id="contact-phone" defaultValue={currentRestaurant.phone} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact-address">Adresse</Label>
                    <Textarea id="contact-address" defaultValue={currentRestaurant.address} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantDetailModal;
