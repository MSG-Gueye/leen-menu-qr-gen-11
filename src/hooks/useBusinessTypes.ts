
import { useState } from 'react';

export interface BusinessType {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const useBusinessTypes = () => {
  const [businessTypes, setBusinessTypes] = useState<BusinessType[]>([
    {
      id: 'restaurant',
      name: 'Restaurant',
      icon: '🍽️',
      color: 'bg-red-500',
      description: 'Restaurant traditionnel'
    },
    {
      id: 'patisserie',
      name: 'Pâtisserie',
      icon: '🧁',
      color: 'bg-pink-500',
      description: 'Pâtisserie et boulangerie'
    },
    {
      id: 'glacier',
      name: 'Glacier',
      icon: '🍦',
      color: 'bg-blue-500',
      description: 'Glacier et desserts glacés'
    },
    {
      id: 'brasserie',
      name: 'Brasserie',
      icon: '🍺',
      color: 'bg-amber-500',
      description: 'Brasserie et bar'
    },
    {
      id: 'cafe',
      name: 'Café',
      icon: '☕',
      color: 'bg-brown-500',
      description: 'Café et salon de thé'
    },
    {
      id: 'fastfood',
      name: 'Fast Food',
      icon: '🍔',
      color: 'bg-orange-500',
      description: 'Restauration rapide'
    },
    {
      id: 'pizzeria',
      name: 'Pizzeria',
      icon: '🍕',
      color: 'bg-green-500',
      description: 'Pizzeria italienne'
    },
    {
      id: 'traiteur',
      name: 'Traiteur',
      icon: '🥘',
      color: 'bg-purple-500',
      description: 'Service traiteur'
    },
    {
      id: 'boulangerie',
      name: 'Boulangerie',
      icon: '🥖',
      color: 'bg-yellow-500',
      description: 'Boulangerie artisanale'
    },
    {
      id: 'epicerie',
      name: 'Épicerie',
      icon: '🛒',
      color: 'bg-indigo-500',
      description: 'Épicerie fine'
    },
    {
      id: 'salon_de_the',
      name: 'Salon de thé',
      icon: '🫖',
      color: 'bg-teal-500',
      description: 'Salon de thé et pâtisseries'
    },
    {
      id: 'food_truck',
      name: 'Food Truck',
      icon: '🚚',
      color: 'bg-cyan-500',
      description: 'Restauration mobile'
    }
  ]);

  const addBusinessType = (newType: Omit<BusinessType, 'id'>) => {
    const id = newType.name.toLowerCase().replace(/\s+/g, '_');
    const businessType: BusinessType = {
      ...newType,
      id
    };
    setBusinessTypes(prev => [...prev, businessType]);
    return businessType;
  };

  const updateBusinessType = (id: string, updatedType: Partial<BusinessType>) => {
    setBusinessTypes(prev => 
      prev.map(type => 
        type.id === id ? { ...type, ...updatedType } : type
      )
    );
  };

  const deleteBusinessType = (id: string) => {
    setBusinessTypes(prev => prev.filter(type => type.id !== id));
  };

  const getBusinessType = (id: string) => {
    return businessTypes.find(type => type.id === id) || businessTypes[0];
  };

  const getBusinessTypeIcon = (id: string) => {
    return getBusinessType(id).icon;
  };

  const getBusinessTypeColor = (id: string) => {
    return getBusinessType(id).color;
  };

  return {
    businessTypes,
    addBusinessType,
    updateBusinessType,
    deleteBusinessType,
    getBusinessType,
    getBusinessTypeIcon,
    getBusinessTypeColor
  };
};
