import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DollarSign,
  Palette,
  CreditCard,
  Globe,
  Shield,
  Smartphone,
  Activity,
  PieChart,
  LineChart,
  Target,
  Clock,
  FileText,
  Database,
  Server,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import RestaurantDetailModal from '../components/RestaurantDetailModal';
import BusinessForm from '../components/BusinessForm';
import BusinessTypeManager from '../components/BusinessTypeManager';
import { useBusinesses, Business } from '@/hooks/useBusinesses';
import { useBusinessTypes } from '@/hooks/useBusinessTypes';

const AdminDashboard = () => {
  const { businesses, addBusiness, updateBusiness, deleteBusiness, getBusinessStats } = useBusinesses();
  const { getBusinessType } = useBusinessTypes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddBusinessDialogOpen, setIsAddBusinessDialogOpen] = useState(false);

  // Analytics states
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState('7d');
  
  // Settings states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const stats = getBusinessStats();
  const realStats = [
    { title: "Entreprises Total", value: stats.total.toString(), change: "+12%", icon: Store, color: "bg-blue-500" },
    { title: "Entreprises Actives", value: stats.active.toString(), change: "+8%", icon: Users, color: "bg-green-500" },
    { title: "QR Codes Scannés", value: stats.totalScans.toString(), change: "+23%", icon: QrCode, color: "bg-purple-500" },
    { title: "Plats au Menu", value: stats.totalMenuItems.toString(), change: "+15%", icon: DollarSign, color: "bg-orange-500" }
  ];

  // Mock analytics data
  const analyticsData = {
    totalRevenue: "€15,234",
    monthlyGrowth: "+18.2%",
    activeUsers: "1,429",
    conversionRate: "3.2%",
    topBusinesses: [
      { name: "Le Petit Bistro", scans: 1248, revenue: "€2,340" },
      { name: "Sushi Zen", scans: 987, revenue: "€1,890" },
      { name: "Pizza Corner", scans: 756, revenue: "€1,456" },
    ],
    weeklyScans: [120, 145, 167, 189, 203, 245, 267],
    deviceBreakdown: { mobile: 68, desktop: 22, tablet: 10 }
  };

  // Mock payment data
  const paymentData = {
    totalRevenue: "€45,678",
    pendingPayments: "€1,234",
    failedPayments: 12,
    successRate: "98.7%",
    recentTransactions: [
      { id: "TX001", business: "Le Petit Bistro", amount: "€29.99", status: "Complété", date: "2024-01-15" },
      { id: "TX002", business: "Sushi Zen", amount: "€49.99", status: "Complété", date: "2024-01-15" },
      { id: "TX003", business: "Pizza Corner", amount: "€19.99", status: "En attente", date: "2024-01-14" },
      { id: "TX004", business: "Café de Flore", amount: "€39.99", status: "Échec", date: "2024-01-14" },
    ]
  };

  const filteredRestaurants = businesses.map(business => {
    const businessType = getBusinessType(business.businessType);
    return {
      id: business.id,
      name: business.name,
      email: business.email,
      phone: business.phone,
      address: business.address,
      plan: "Standard",
      status: business.status,
      menuItems: business.menuItems,
      totalScans: business.totalScans || 0,
      lastActive: `Mis à jour le ${business.lastUpdate}`,
      owner: business.owner,
      businessType: businessType.name,
      icon: businessType.icon
    };
  }).filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === 'all' || restaurant.plan === selectedPlan;
    const matchesStatus = selectedStatus === 'all' || restaurant.status === selectedStatus;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const recentActivities = [
    { id: 1, action: "Nouvelle entreprise inscrite", restaurant: "Le Petit Bistro", time: "Il y a 2h" },
    { id: 2, action: "Menu mis à jour", restaurant: "Sushi Zen", time: "Il y a 4h" },
    { id: 3, action: "QR Code généré", restaurant: "Pizza Corner", time: "Il y a 6h" },
    { id: 4, action: "Abonnement Premium activé", restaurant: "Café de Flore", time: "Il y a 1j" }
  ];

  const handleAddBusiness = (businessData: Omit<Business, 'id' | 'menuItems' | 'lastUpdate' | 'totalScans'>) => {
    addBusiness(businessData);
    setIsAddBusinessDialogOpen(false);
  };

  const handleViewRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setIsDetailModalOpen(true);
  };

  const handleEditRestaurant = (restaurantId: number) => {
    const business = businesses.find(b => b.id === restaurantId);
    if (business) {
      toast.info(`Édition de ${business.name} - Fonctionnalité à implémenter`);
    }
  };

  const handleDeleteRestaurant = (restaurantId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
      deleteBusiness(restaurantId);
    }
  };

  const handleSendEmail = () => {
    toast.success('Email de bienvenue envoyé à toutes les nouvelles entreprises');
  };

  const handleExportData = () => {
    const csvData = businesses.map(business => ({
      Nom: business.name,
      Type: getBusinessType(business.businessType).name,
      Email: business.email,
      Téléphone: business.phone,
      Propriétaire: business.owner,
      Statut: business.status,
      'Dernière mise à jour': business.lastUpdate
    }));
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + Object.keys(csvData[0] || {}).join(",") + "\n"
      + csvData.map(row => Object.values(row).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "entreprises_scanner_leen.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Export des données terminé');
  };

  const handleSendNotification = () => {
    toast.success('Notification push envoyée à toutes les entreprises actives');
  };

  const handleSaveSettings = () => {
    toast.success('Paramètres sauvegardés avec succès');
  };

  const handleBackupNow = () => {
    toast.success('Sauvegarde en cours... Vous recevrez une notification une fois terminée.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-600 mt-2">Gérez toutes les entreprises Scanner-Leen</p>
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

        <Tabs defaultValue="businesses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="businesses">Entreprises</TabsTrigger>
            <TabsTrigger value="types">Types</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="businesses" className="space-y-6">
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

            <Card>
              <CardHeader>
                <CardTitle>Entreprises ({filteredRestaurants.length})</CardTitle>
                <CardDescription>Gérez toutes les entreprises inscrites sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-scanner-red to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl">
                            {restaurant.icon || restaurant.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {restaurant.businessType}
                              </Badge>
                            </div>
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
                  
                  {filteredRestaurants.length === 0 && (
                    <div className="text-center py-12">
                      <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">Aucune entreprise trouvée</p>
                      <Button 
                        onClick={() => setIsAddBusinessDialogOpen(true)}
                        className="bg-scanner-green-600 hover:bg-scanner-green-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter votre première entreprise
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="types">
            <BusinessTypeManager />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              {/* Analytics Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Analytics Avancées</h2>
                  <p className="text-gray-600">Tableaux de bord et métriques détaillées</p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={analyticsTimeRange}
                    onChange={(e) => setAnalyticsTimeRange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="7d">7 derniers jours</option>
                    <option value="30d">30 derniers jours</option>
                    <option value="90d">3 derniers mois</option>
                    <option value="1y">Dernière année</option>
                  </select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter Rapport
                  </Button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenus Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.totalRevenue}</div>
                    <p className="text-xs text-green-600">{analyticsData.monthlyGrowth} vs mois dernier</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.activeUsers}</div>
                    <p className="text-xs text-muted-foreground">utilisateurs uniques</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.conversionRate}</div>
                    <p className="text-xs text-muted-foreground">scan vers commande</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Temps Moyen Session</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2m 34s</div>
                    <p className="text-xs text-muted-foreground">par visite</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5" />
                      Scans QR par Jour
                    </CardTitle>
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
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Répartition par Appareil
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <span>Mobile</span>
                        </div>
                        <span className="font-semibold">{analyticsData.deviceBreakdown.mobile}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span>Desktop</span>
                        </div>
                        <span className="font-semibold">{analyticsData.deviceBreakdown.desktop}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          <span>Tablette</span>
                        </div>
                        <span className="font-semibold">{analyticsData.deviceBreakdown.tablet}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Businesses */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Entreprises</CardTitle>
                  <CardDescription>Entreprises les plus performantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topBusinesses.map((business, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-scanner-green-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold">{business.name}</p>
                            <p className="text-sm text-gray-600">{business.scans} scans</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{business.revenue}</p>
                          <p className="text-xs text-gray-500">revenus</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="space-y-6">
              {/* Payments Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Gestion des Paiements</h2>
                  <p className="text-gray-600">Suivez les revenus et transactions</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Transactions
                  </Button>
                  <Button variant="outline">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Configurer Stripe
                  </Button>
                </div>
              </div>

              {/* Payment Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenus Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{paymentData.totalRevenue}</div>
                    <p className="text-xs text-green-600">+12% ce mois</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Paiements en Attente</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{paymentData.pendingPayments}</div>
                    <p className="text-xs text-orange-600">À traiter</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Paiements Échoués</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{paymentData.failedPayments}</div>
                    <p className="text-xs text-red-600">ce mois</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taux de Succès</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{paymentData.successRate}</div>
                    <p className="text-xs text-green-600">transactions</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Transactions Récentes</CardTitle>
                  <CardDescription>Dernières transactions effectuées</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentData.recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold">{transaction.business}</p>
                            <p className="text-sm text-gray-600">ID: {transaction.id}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{transaction.amount}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              transaction.status === 'Complété' ? 'default' : 
                              transaction.status === 'En attente' ? 'secondary' : 'destructive'
                            }>
                              {transaction.status}
                            </Badge>
                            <span className="text-xs text-gray-500">{transaction.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Méthodes de Paiement</CardTitle>
                  <CardDescription>Configuration des passerelles de paiement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Stripe</p>
                          <p className="text-sm text-gray-600">Cartes de crédit et débits</p>
                        </div>
                      </div>
                      <Badge variant="default">Actif</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-600">PayPal</p>
                          <p className="text-sm text-gray-500">Portefeuille électronique</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Inactif</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              {/* Settings Header */}
              <div>
                <h2 className="text-2xl font-bold">Paramètres Système</h2>
                <p className="text-gray-600">Configuration et paramètres globaux</p>
              </div>

              {/* General Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Paramètres Généraux
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="site-name">Nom de la plateforme</Label>
                      <Input id="site-name" defaultValue="Scanner-Leen" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="admin-email">Email administrateur</Label>
                      <Input id="admin-email" type="email" defaultValue="admin@scanner-leen.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="support-email">Email support</Label>
                      <Input id="support-email" type="email" defaultValue="support@scanner-leen.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="max-businesses">Limite d'entreprises par utilisateur</Label>
                      <Input id="max-businesses" type="number" defaultValue="10" className="mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Paramètres de Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Notifications par email</Label>
                      <p className="text-sm text-gray-600">Recevoir les notifications importantes par email</p>
                    </div>
                    <Switch 
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">Notifications SMS</Label>
                      <p className="text-sm text-gray-600">Recevoir les alertes critiques par SMS</p>
                    </div>
                    <Switch 
                      id="sms-notifications"
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notification-frequency">Fréquence des rapports</Label>
                    <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                      <option value="daily">Quotidien</option>
                      <option value="weekly">Hebdomadaire</option>
                      <option value="monthly">Mensuel</option>
                      <option value="never">Jamais</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="session-timeout">Timeout de session (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="60" className="mt-1" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                      <p className="text-sm text-gray-600">Renforcer la sécurité avec 2FA</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  <div>
                    <Label htmlFor="allowed-domains">Domaines autorisés</Label>
                    <Textarea 
                      id="allowed-domains" 
                      placeholder="exemple.com&#10;autredomaine.fr"
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">Un domaine par ligne</p>
                  </div>
                </CardContent>
              </Card>

              {/* System Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Système
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-backup">Sauvegarde automatique</Label>
                      <p className="text-sm text-gray-600">Sauvegarde quotidienne des données</p>
                    </div>
                    <Switch 
                      id="auto-backup"
                      checked={autoBackup}
                      onCheckedChange={setAutoBackup}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                      <p className="text-sm text-gray-600">Désactiver temporairement la plateforme</p>
                    </div>
                    <Switch 
                      id="maintenance-mode"
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleBackupNow} variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Sauvegarder maintenant
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Logs système
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Save Settings */}
              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-scanner-green-600 hover:bg-scanner-green-700">
                  Sauvegarder les paramètres
                </Button>
              </div>
            </div>
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
                    <p className="text-sm text-gray-600">Entreprise: {activity.restaurant}</p>
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
