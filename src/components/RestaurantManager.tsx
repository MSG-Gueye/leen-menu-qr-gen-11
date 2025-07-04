import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useBusinesses, Business } from '@/hooks/useBusinesses';
import BusinessForm from './BusinessForm';
import RestaurantStats from './RestaurantStats';
import RestaurantCard from './RestaurantCard';
import EmptyRestaurantState from './EmptyRestaurantState';

const RestaurantManager = () => {
  const navigate = useNavigate();
  const { businesses, addBusiness, updateBusiness, deleteBusiness, toggleBusinessStatus, generateQRCode, generatePaymentQRCode, getBusinessStats } = useBusinesses();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const stats = getBusinessStats();
  const suspendedCount = businesses.filter(b => b.status === 'Suspendu').length;

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

  const handleGeneratePaymentQR = (id: number) => {
    generatePaymentQRCode(id);
  };

  const handleToggleStatus = (id: number) => {
    toggleBusinessStatus(id);
  };

  const handleSuspendForNonPayment = (id: number) => {
    const business = businesses.find(b => b.id === id);
    if (confirm(`Êtes-vous sûr de vouloir suspendre ${business?.name} pour non-paiement ?`)) {
      updateBusiness(id, { status: 'Suspendu', paymentStatus: 'pending' });
      toast.success(`${business?.name} suspendu pour non-paiement`);
    }
  };

  const handleReactivateAfterPayment = (id: number) => {
    const business = businesses.find(b => b.id === id);
    if (confirm(`Confirmer la réactivation de ${business?.name} après paiement ?`)) {
      updateBusiness(id, { 
        status: 'Actif', 
        paymentStatus: 'paid',
        lastPayment: new Date().toISOString().split('T')[0]
      });
      toast.success(`${business?.name} réactivé après paiement`);
    }
  };

  const sendNotificationEmail = (business: Business) => {
    toast.success(`Email de notification envoyé à ${business.name} (${business.email})`);
  };

  const sendPaymentReminder = (business: Business) => {
    toast.success(`Rappel de paiement envoyé à ${business.name}`);
  };

  const handlePaymentClick = (businessId: number) => {
    navigate(`/paiement/${businessId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion des entreprises</h2>
          <p className="text-gray-600">Gérez tous vos établissements clients - Abonnement: 15,000 FCFA/mois</p>
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

      <RestaurantStats stats={stats} suspendedCount={suspendedCount} />

      <div className="space-y-4">
        {businesses.map((business) => (
          <RestaurantCard
            key={business.id}
            business={business}
            onEdit={handleEditBusiness}
            onGenerateQR={handleGenerateQR}
            onGeneratePaymentQR={handleGeneratePaymentQR}
            onToggleStatus={handleToggleStatus}
            onSuspendForNonPayment={handleSuspendForNonPayment}
            onReactivateAfterPayment={handleReactivateAfterPayment}
            onSendNotification={sendNotificationEmail}
            onSendPaymentReminder={sendPaymentReminder}
            onDelete={handleDeleteBusiness}
            onPaymentClick={handlePaymentClick}
          />
        ))}
      </div>

      {businesses.length === 0 && (
        <EmptyRestaurantState onAddBusiness={() => setIsDialogOpen(true)} />
      )}

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
