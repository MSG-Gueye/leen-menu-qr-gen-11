
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { QrCode, Plus, Settings, Menu, Users, BarChart3, TrendingUp, Eye, Zap, Bell, Calendar, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RestaurantManager from '@/components/RestaurantManager';
import MenuManager from '@/components/MenuManager';
import QRGenerator from '@/components/QRGenerator';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data pour les statistiques
  const stats = {
    totalRestaurants: 12,
    totalMenuItems: 156,
    totalScans: 2847,
    monthlyGrowth: 23.5,
    todayScans: 47,
    activeMenus: 12,
    pendingUpdates: 3
  };

  const recentActivity = [
    {
      id: 1,
      type: 'menu_update',
      restaurant: 'Le Petit Bistro',
      action: 'Mise à jour du menu - Ajout de 3 nouveaux plats',
      time: 'Il y a 2h',
      icon: <Menu className="h-4 w-4 text-blue-500" />
    },
    {
      id: 2,
      type: 'qr_generated',
      restaurant: 'Brasserie Moderne',
      action: 'Nouveau QR code généré et téléchargé',
      time: 'Il y a 4h',
      icon: <QrCode className="h-4 w-4 text-green-500" />
    },
    {
      id: 3,
      type: 'stats',
      restaurant: 'Café du Coin',
      action: '156 nouveaux scans de QR code',
      time: 'Il y a 6h',
      icon: <BarChart3 className="h-4 w-4 text-purple-500" />
    }
  ];

  const quickActions = [
    {
      title: "Nouveau restaurant",
      description: "Ajouter un établissement",
      icon: <Plus className="h-6 w-6" />,
      action: () => setActiveTab('restaurants'),
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Créer un menu",
      description: "Éditeur de menu rapide",
      icon: <Menu className="h-6 w-6" />,
      action: () => setActiveTab('menus'),
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      title: "Générer QR",
      description: "Nouveau QR code",
      icon: <QrCode className="h-6 w-6" />,
      action: () => setActiveTab('qrcodes'),
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      title: "Analytics",
      description: "Voir les statistiques",
      icon: <BarChart3 className="h-6 w-6" />,
      action: () => setActiveTab('analytics'),
      color: "bg-gradient-to-r from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header amélioré */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex items-center space-x-3 hover:bg-gray-50 p-3 rounded-xl transition-all"
              >
                <div className="p-2 bg-gradient-to-br from-scanner-red to-pink-500 rounded-lg">
                  <QrCode className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-gray-900">Scanner-Leen</div>
                  <div className="text-sm text-gray-500">Dashboard</div>
                </div>
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  3
                </Badge>
              </Button>
              
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Paramètres</span>
              </Button>
              
              <div className="w-8 h-8 bg-gradient-to-br from-scanner-blue to-scanner-dark rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Onglets avec design moderne */}
          <TabsList className="grid w-full grid-cols-5 p-1 bg-gray-100 rounded-xl h-12">
            <TabsTrigger value="overview" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Vue d'ensemble</span>
            </TabsTrigger>
            <TabsTrigger value="restaurants" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Restaurants</span>
            </TabsTrigger>
            <TabsTrigger value="menus" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <Menu className="h-4 w-4" />
              <span className="hidden sm:inline">Menus</span>
            </TabsTrigger>
            <TabsTrigger value="qrcodes" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">QR Codes</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-8">
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-elegant">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Restaurants actifs</CardTitle>
                  <Users className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalRestaurants}</div>
                  <p className="text-xs opacity-80 mt-1">+2 ce mois-ci</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-elegant">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Plats au menu</CardTitle>
                  <Menu className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalMenuItems}</div>
                  <p className="text-xs opacity-80 mt-1">+12 cette semaine</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-elegant">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Scans totaux</CardTitle>
                  <QrCode className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalScans.toLocaleString()}</div>
                  <p className="text-xs opacity-80 mt-1">+{stats.todayScans} aujourd'hui</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-elegant">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Croissance</CardTitle>
                  <TrendingUp className="h-5 w-5 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">+{stats.monthlyGrowth}%</div>
                  <p className="text-xs opacity-80 mt-1">vs mois dernier</p>
                </CardContent>
              </Card>
            </div>

            {/* Actions rapides */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Actions rapides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover:shadow-elegant transition-all duration-300 hover:scale-105 border-0 overflow-hidden"
                    onClick={action.action}
                  >
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Activité récente et métriques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Activité récente */}
              <Card className="shadow-soft border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-scanner-red" />
                    <span>Activité récente</span>
                  </CardTitle>
                  <CardDescription>Dernières actions sur la plateforme</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="mt-1">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.restaurant}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir toute l'activité
                  </Button>
                </CardContent>
              </Card>

              {/* Métriques du jour */}
              <Card className="shadow-soft border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-scanner-red" />
                    <span>Aujourd'hui</span>
                  </CardTitle>
                  <CardDescription>Métriques de la journée en cours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Scans de QR codes</span>
                    <span className="text-2xl font-bold text-scanner-red">{stats.todayScans}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Menus consultés</span>
                    <span className="text-2xl font-bold text-blue-600">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mises à jour</span>
                    <span className="text-2xl font-bold text-green-600">5</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-scanner-red to-pink-500 hover:from-scanner-red/90 hover:to-pink-500/90">
                    <Download className="h-4 w-4 mr-2" />
                    Rapport journalier
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="restaurants">
            <RestaurantManager />
          </TabsContent>

          <TabsContent value="menus">
            <MenuManager />
          </TabsContent>

          <TabsContent value="qrcodes">
            <QRGenerator />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics avancées</h3>
              <p className="text-gray-600 mb-6">Section en cours de développement</p>
              <Badge variant="outline" className="text-scanner-red border-scanner-red">
                Bientôt disponible
              </Badge>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
