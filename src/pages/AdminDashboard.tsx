import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Users, 
  Store, 
  QrCode, 
  TrendingUp, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Mail,
  Bell,
  Settings,
  BarChart3,
  Calendar,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import RestaurantDetailModal from '../components/RestaurantDetailModal';
import BusinessForm from '../components/BusinessForm';
import { useBusinesses, Business } from '@/hooks/useBusinesses';

const AdminDashboard = () => {
  const { businesses, addBusiness, updateBusiness, deleteBusiness, getBusinessStats } = useBusinesses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddBusinessDialogOpen, setIsAddBusinessDialogOpen] = useState(false);

  const stats = getBusinessStats();
  const realStats = [
    { title: "Entreprises Total", value: stats.total.toString(), change: "+12%", icon: Store, color: "bg-blue-500" },
    { title: "Entreprises Actives", value: stats.active.toString(), change: "+8%", icon: Users, color: "bg-green-500" },
    { title: "QR Codes Scannés", value: stats.totalScans.toString(), change: "+23%", icon: QrCode, color: "bg-purple-500" },
    { title: "Plats au Menu", value: stats.totalMenuItems.toString(), change: "+15%", icon: DollarSign, color: "bg-orange-500" }
  ];

  // Mock data étendu
  const restaurants = [
    { 
      id: 1, 
      name: "Le Petit Bistro", 
      email: "contact@petitbistro.fr", 
      phone: "+33 1 42 33 44 55",
      address: "123 Rue de la Paix, 75001 Paris",
      plan: "Premium", 
      status: "Actif", 
      menuItems: 45, 
      totalScans: 1234,
      lastActive: "Il y a 2h",
      owner: "Marie Dupont"
    },
    { 
      id: 2, 
      name: "Sushi Zen", 
      email: "hello@sushizen.com", 
      phone: "+33 1 45 67 89 01",
      address: "456 Avenue des Champs, 75008 Paris",
      plan: "Gratuit", 
      status: "Actif", 
      menuItems: 28, 
      totalScans: 567,
      lastActive: "Il y a 1j",
      owner: "Takeshi Yamamoto"
    },
    { 
      id: 3, 
      name: "Pizza Corner", 
      email: "info@pizzacorner.fr", 
      phone: "+33 1 23 45 67 89",
      address: "789 Boulevard Saint-Germain, 75006 Paris",
      plan: "Standard", 
      status: "Suspendu", 
      menuItems: 32, 
      totalScans: 890,
      lastActive: "Il y a 5j",
      owner: "Giuseppe Romano"
    },
    { 
      id: 4, 
      name: "Café de Flore", 
      email: "contact@cafedeflore.com", 
      phone: "+33 1 45 48 55 26",
      address: "172 Boulevard Saint-Germain, 75006 Paris",
      plan: "Premium", 
      status: "Actif", 
      menuItems: 67, 
      totalScans: 2890,
      lastActive: "Il y a 30min",
      owner: "Philippe Martin"
    }
  ];

  const recentActivities = [
    { id: 1, action: "Nouveau restaurant inscrit", restaurant: "Le Petit Bistro", time: "Il y a 2h" },
    { id: 2, action: "Menu mis à jour", restaurant: "Sushi Zen", time: "Il y a 4h" },
    { id: 3, action: "QR Code généré", restaurant: "Pizza Corner", time: "Il y a 6h" },
    { id: 4, action: "Abonnement Premium activé", restaurant: "Café de Flore", time: "Il y a 1j" }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === 'all' || restaurant.plan === selectedPlan;
    const matchesStatus = selectedStatus === 'all' || restaurant.status === selectedStatus;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleAddBusiness = (businessData: Omit<Business, 'id' | 'menuItems' | 'lastUpdate' | 'totalScans'>) => {
    addBusiness(businessData);
    setIsAddBusinessDialogOpen(false);
  };

  const handleViewRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsDetailModalOpen(true);
  };

  const handleEditRestaurant = (restaurantId) => {
    toast.info(`Édition du restaurant ${restaurantId} à implémenter`);
  };

  const handleDeleteRestaurant = (restaurantId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce restaurant ?')) {
      toast.success(`Restaurant ${restaurantId} supprimé`);
    }
  };

  const handleSendEmail = () => {
    toast.success('Email de bienvenue envoyé à tous les nouveaux restaurants');
  };

  const handleExportData = () => {
    toast.success('Export des données en cours...');
  };

  const handleSendNotification = () => {
    toast.success('Notification push envoyée à tous les restaurants actifs');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-600 mt-2">Gérez tous les restaurants et utilisateurs Scanner-Leen</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSendEmail} variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Envoyer Email
            </Button>
            <Button onClick={handleSendNotification} variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notification
            </Button>
            <Button onClick={handleExportData} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button 
              className="bg-scanner-green-600 hover:bg-scanner-green-700"
              onClick={() => setIsAddBusinessDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Entreprise
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {realStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} ce mois</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="restaurants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants" className="space-y-6">
            {/* Filtres et recherche */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher par nom, email ou propriétaire..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-scanner-green-500"
                    >
                      <option value="all">Tous les plans</option>
                      <option value="Gratuit">Gratuit</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                    </select>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-scanner-green-500"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="Actif">Actif</option>
                      <option value="Suspendu">Suspendu</option>
                      <option value="Inactif">Inactif</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liste des restaurants */}
            <Card>
              <CardHeader>
                <CardTitle>Restaurants ({filteredRestaurants.length})</CardTitle>
                <CardDescription>Gérez tous les restaurants inscrits sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-scanner-red to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                            {restaurant.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span>{restaurant.email}</span>
                              <span>{restaurant.phone}</span>
                              <span>Propriétaire: {restaurant.owner}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{restaurant.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right text-sm">
                            <p className="text-gray-600">{restaurant.menuItems} plats</p>
                            <p className="text-gray-600">{restaurant.totalScans} scans</p>
                            <p className="text-xs text-gray-500">{restaurant.lastActive}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant={restaurant.status === 'Actif' ? 'default' : 'secondary'}>
                              {restaurant.status}
                            </Badge>
                            <Badge variant="outline">{restaurant.plan}</Badge>
                          </div>
                          
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewRestaurant(restaurant)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditRestaurant(restaurant.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteRestaurant(restaurant.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics Avancées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Graphiques et métriques détaillées à implémenter...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Gestion des Paiements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Interface de gestion des abonnements et paiements à implémenter...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Paramètres Système
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Configuration système et paramètres globaux à implémenter...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Activités récentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Activités Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">Restaurant: {activity.restaurant}</p>
                  </div>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <RestaurantDetailModal
        restaurant={selectedRestaurant}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Add Business Dialog */}
      <Dialog open={isAddBusinessDialogOpen} onOpenChange={setIsAddBusinessDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nouvelle entreprise</DialogTitle>
            <DialogDescription>
              Ajoutez une nouvelle entreprise à votre plateforme
            </DialogDescription>
          </DialogHeader>
          <BusinessForm onSubmit={handleAddBusiness} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
