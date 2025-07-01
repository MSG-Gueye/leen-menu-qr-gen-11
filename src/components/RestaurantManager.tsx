
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Users, MapPin, Phone, Mail, QrCode, Power, PowerOff } from 'lucide-react';
import { toast } from 'sonner';
import { useBusinesses, Business } from '@/hooks/useBusinesses';
import { useBusinessTypes } from '@/hooks/useBusinessTypes';
import BusinessForm from './BusinessForm';

const RestaurantManager = () => {
  const { businesses, addBusiness, updateBusiness, deleteBusiness, toggleBusinessStatus, generateQRCode, getBusinessStats } = useBusinesses();
  const { getBusinessType, getBusinessTypeIcon } = useBusinessTypes();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const stats = getBusinessStats();

  const handleAddBusiness = (businessData: Omit<Business, 'id' | 'menuItems' | 'lastUpdate' | 'totalScans'>) => {
    addBusiness(businessData);
    setIsDialogOpen(false);
  };

  const handleEditBusiness = (business: Business) => {
    setEditingBusiness(business);
    setIsEditDialogOpen(true);
  };

  const handleUpdateBusiness = (businessData: Omit<Business, 'id' | 'menuItems' | 'lastUpdate' | 'totalScans'>) => {
    if (editingBusiness) {
      updateBusiness(editingBusiness.id, businessData);
      setIsEditDialogOpen(false);
      setEditingBusiness(null);
    }
  };

  const handleDeleteBusiness = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
      deleteBusiness(id);
    }
  };

  const handleGenerateQR = (id: number) => {
    generateQRCode(id);
  };

  const handleToggleStatus = (id: number) => {
    toggleBusinessStatus(id);
  };

  const sendNotificationEmail = (business: Business) => {
    // Simulation d'envoi d'email
    toast.success(`Email de notification envoyé à ${business.name} (${business.email})`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion des entreprises</h2>
          <p className="text-gray-600">Gérez tous vos établissements clients</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-scanner-green-600 hover:bg-scanner-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle entreprise
            </Button>
          </DialogTrigger>
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

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entreprises</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">établissements</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entreprises Actives</CardTitle>
            <Power className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">sur {stats.total} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menus Totaux</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMenuItems}</div>
            <p className="text-xs text-muted-foreground">plats référencés</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scans QR</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalScans}</div>
            <p className="text-xs text-muted-foreground">scans effectués</p>
          </CardContent>
        </Card>
      </div>

      {/* Businesses list */}
      <div className="space-y-4">
        {businesses.map((business) => {
          const businessType = getBusinessType(business.businessType);
          return (
            <Card key={business.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{businessType.icon}</span>
                        <div>
                          <h3 className="text-xl font-semibold">{business.name}</h3>
                          <p className="text-sm text-gray-500">{businessType.name}</p>
                        </div>
                      </div>
                      <Badge variant={business.status === "Actif" ? "default" : business.status === "Suspendu" ? "destructive" : "secondary"}>
                        {business.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{business.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{business.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{business.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Propriétaire: {business.owner}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{business.menuItems} plats au menu</span>
                      <span>{business.totalScans || 0} scans QR</span>
                      <span>Mis à jour: {business.lastUpdate}</span>
                    </div>
                    
                    {business.description && (
                      <p className="text-sm text-gray-600 mb-3">{business.description}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditBusiness(business)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleGenerateQR(business.id)}
                        className="text-blue-600 hover:text-blue-700 hover:border-blue-300"
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleStatus(business.id)}
                        className={business.status === 'Actif' ? "text-orange-600 hover:text-orange-700 hover:border-orange-300" : "text-green-600 hover:text-green-700 hover:border-green-300"}
                      >
                        {business.status === 'Actif' ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => sendNotificationEmail(business)}
                        className="text-purple-600 hover:text-purple-700 hover:border-purple-300"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteBusiness(business.id)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {businesses.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Aucune entreprise enregistrée</p>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-scanner-green-600 hover:bg-scanner-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter votre première entreprise
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier l'entreprise</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'entreprise
            </DialogDescription>
          </DialogHeader>
          {editingBusiness && (
            <BusinessForm 
              onSubmit={handleUpdateBusiness} 
              initialData={editingBusiness}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantManager;
