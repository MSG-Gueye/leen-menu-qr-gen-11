
import { useState } from 'react';

export interface BusinessType {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const useBusinessTypes = () => {
  const [businessTypes] = useState<BusinessType[]>([
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
    }
  ]);

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
    getBusinessType,
    getBusinessTypeIcon,
    getBusinessTypeColor
  };
};
