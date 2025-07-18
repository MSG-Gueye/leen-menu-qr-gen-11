import { useState } from 'react';
import { toast } from 'sonner';

export interface Business {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  businessType: string;
  status: 'Actif' | 'Inactif' | 'Suspendu';
  menuItems: number;
  lastUpdate: string;
  owner: string;
  description?: string;
  qrCodeUrl?: string;
  paymentQrCodeUrl?: string;
  totalScans?: number;
  paymentStatus?: 'paid' | 'pending';
  lastPayment?: string;
  subscriptionPackage: 'basic' | 'premium' | 'enterprise';
}

export const subscriptionPackages = {
  basic: {
    name: 'Package Basic',
    price: 25000,
    setupFee: 25000,
    features: ['Menu numérique personnalisé', 'QR Code design standard', '10 QR codes physiques', 'Hébergement sécurisé', 'Support email']
  },
  premium: {
    name: 'Package Premium', 
    price: 35000,
    setupFee: 35000,
    features: ['Menu numérique entièrement personnalisé', 'Design haut de gamme du QR code', '30 QR codes physiques', 'Hébergement sécurisé et maintenance', 'Mises à jour illimitées', 'Statistiques de consultation', 'Support prioritaire 7j/7']
  },
  enterprise: {
    name: 'Package Enterprise',
    price: 75000,
    setupFee: 75000,
    features: ['Tout Premium', 'QR codes illimités', 'Multi-restaurants', 'API personnalisée', 'Formation dédiée', 'Support VIP 24h/24']
  }
};

export const useBusinesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: 1,
      name: "Le Petit Bistro",
      address: "123 Rue de la Paix, 75001 Paris",
      phone: "01 42 33 44 55",
      email: "contact@petitbistro.fr",
      businessType: "restaurant",
      status: "Actif",
      menuItems: 24,
      lastUpdate: "2024-01-15",
      owner: "Marie Dupont",
      totalScans: 1234,
      paymentStatus: "paid",
      lastPayment: "2025-01-02",
      subscriptionPackage: "premium"
    },
    {
      id: 2,
      name: "Douceurs & Délices",
      address: "456 Avenue des Champs, 75008 Paris",
      phone: "01 56 78 90 12",
      email: "info@douceurs-delices.fr",
      businessType: "patisserie",
      status: "Suspendu",
      menuItems: 18,
      lastUpdate: "2024-01-12",
      owner: "Sophie Martin",
      totalScans: 890,
      paymentStatus: "pending",
      lastPayment: "2024-12-02",
      subscriptionPackage: "basic"
    },
    {
      id: 3,
      name: "Gelato Paradiso",
      address: "789 Boulevard Saint-Germain, 75006 Paris",
      phone: "01 23 45 67 89",
      email: "hello@gelato-paradiso.fr",
      businessType: "glacier",
      status: "Actif",
      menuItems: 15,
      lastUpdate: "2024-01-10",
      owner: "Marco Rossi",
      totalScans: 567,
      paymentStatus: "paid",
      lastPayment: "2025-01-01",
      subscriptionPackage: "enterprise"
    }
  ]);

  const [deletedBusinesses, setDeletedBusinesses] = useState<Business[]>([]);

  const addBusiness = (newBusiness: Omit<Business, 'id' | 'menuItems' | 'lastUpdate' | 'totalScans'>) => {
    const business: Business = {
      ...newBusiness,
      id: Date.now(),
      menuItems: 0,
      totalScans: 0,
      paymentStatus: 'pending',
      lastUpdate: new Date().toISOString().split('T')[0]
    };

    setBusinesses(prev => [...prev, business]);
    toast.success(`${business.name} ajouté avec succès !`);
    return business;
  };

  const updateBusiness = (id: number, updatedBusiness: Partial<Business>) => {
    setBusinesses(prev => 
      prev.map(business => 
        business.id === id 
          ? { ...business, ...updatedBusiness, lastUpdate: new Date().toISOString().split('T')[0] }
          : business
      )
    );
    toast.success("Entreprise mise à jour avec succès !");
  };

  const deleteBusiness = (id: number) => {
    const business = businesses.find(b => b.id === id);
    if (business) {
      setDeletedBusinesses(prev => [...prev, business]);
      setBusinesses(prev => prev.filter(b => b.id !== id));
      toast.success(`${business.name} déplacé vers la corbeille`);
    }
  };

  const restoreFromTrash = (id: number) => {
    const business = deletedBusinesses.find(b => b.id === id);
    if (business) {
      setBusinesses(prev => [...prev, business]);
      setDeletedBusinesses(prev => prev.filter(b => b.id !== id));
      toast.success(`${business.name} restauré`);
    }
  };

  const permanentlyDeleteBusiness = (id: number) => {
    const business = deletedBusinesses.find(b => b.id === id);
    setDeletedBusinesses(prev => prev.filter(b => b.id !== id));
    toast.success(`${business?.name} supprimé définitivement`);
  };

  const emptyTrash = () => {
    setDeletedBusinesses([]);
    toast.success('Corbeille vidée');
  };

  const toggleBusinessStatus = (id: number) => {
    setBusinesses(prev => 
      prev.map(business => 
        business.id === id 
          ? { 
              ...business, 
              status: business.status === 'Actif' ? 'Inactif' : 'Actif',
              lastUpdate: new Date().toISOString().split('T')[0]
            }
          : business
      )
    );
    const business = businesses.find(b => b.id === id);
    const newStatus = business?.status === 'Actif' ? 'Inactif' : 'Actif';
    toast.success(`${business?.name} ${newStatus === 'Actif' ? 'activé' : 'désactivé'}`);
  };

  const generateQRCode = (id: number) => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${window.location.origin}/menu/${id}`;
    updateBusiness(id, { qrCodeUrl });
    toast.success("QR Code généré avec succès !");
    return qrCodeUrl;
  };

  const generatePaymentQRCode = (id: number) => {
    const paymentUrl = `${window.location.origin}/paiement-public?business=${id}`;
    const paymentQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paymentUrl)}`;
    updateBusiness(id, { paymentQrCodeUrl });
    toast.success("QR Code de paiement généré avec succès !");
    return paymentQrCodeUrl;
  };

  const getBusinessStats = () => {
    return {
      total: businesses.length,
      active: businesses.filter(b => b.status === 'Actif').length,
      totalMenuItems: businesses.reduce((acc, b) => acc + b.menuItems, 0),
      totalScans: businesses.reduce((acc, b) => acc + (b.totalScans || 0), 0)
    };
  };

  return {
    businesses,
    deletedBusinesses,
    addBusiness,
    updateBusiness,
    deleteBusiness,
    restoreFromTrash,
    permanentlyDeleteBusiness,
    emptyTrash,
    toggleBusinessStatus,
    generateQRCode,
    generatePaymentQRCode,
    getBusinessStats
  };
};
