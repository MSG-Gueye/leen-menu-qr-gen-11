
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Users, TrendingUp, Eye, QrCode, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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

  if (!restaurant) return null;

  const handleSuspendRestaurant = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Restaurant ${restaurant.name} suspendu`);
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
      toast.success(`Restaurant ${restaurant.name} supprimé`);
      onClose();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMenu = () => {
    window.open(`/menu/${restaurant.id}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-scanner-red to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {restaurant.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{restaurant.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={restaurant.status === 'Actif' ? 'default' : 'secondary'}>
                  {restaurant.status}
                </Badge>
                <Badge variant="outline">{restaurant.plan}</Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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
                    <span className="text-sm">{restaurant.email}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-gray-500 mt-1" />
                    <span className="text-sm">{restaurant.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <span className="text-sm">{restaurant.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-gray-500 mt-1" />
                    <span className="text-sm">Lun-Dim: 12h-22h</span>
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
                    <span className="font-semibold">{restaurant.menuItems}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total scans QR</span>
                    <span className="font-semibold">{restaurant.totalScans}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Dernière activité</span>
                    <span className="font-semibold text-sm">{restaurant.lastActive}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Propriétaire</span>
                    <span className="font-semibold text-sm">{restaurant.owner}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleViewMenu} className="bg-scanner-green-600 hover:bg-scanner-green-700">
                <Eye className="h-4 w-4 mr-2" />
                Voir le menu
              </Button>
              <Button variant="outline">
                <QrCode className="h-4 w-4 mr-2" />
                QR Code
              </Button>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
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
          </TabsContent>

          <TabsContent value="menu">
            <Card>
              <CardHeader>
                <CardTitle>Gestion du menu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fonctionnalité de gestion de menu à implémenter...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics détaillées</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Graphiques et statistiques détaillées à implémenter...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du restaurant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Paramètres de configuration à implémenter...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantDetailModal;
