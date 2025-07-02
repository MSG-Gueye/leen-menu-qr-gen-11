
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface Restaurant {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  plan: string;
  status: string;
  owner: string;
  description?: string;
  hours?: string;
  category?: string;
}

interface RestaurantEditFormProps {
  restaurant: Restaurant;
  onSave: (updatedRestaurant: Restaurant) => void;
  onCancel: () => void;
}

const RestaurantEditForm: React.FC<RestaurantEditFormProps> = ({ restaurant, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: restaurant.name,
    email: restaurant.email,
    phone: restaurant.phone,
    address: restaurant.address,
    owner: restaurant.owner,
    description: restaurant.description || '',
    hours: restaurant.hours || 'Lun-Dim: 12h-22h',
    category: restaurant.category || 'Restaurant',
    plan: restaurant.plan,
    status: restaurant.status
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedRestaurant = {
      ...restaurant,
      ...formData
    };
    
    onSave(updatedRestaurant);
    toast.success('Restaurant mis à jour avec succès !');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nom du restaurant</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Restaurant">Restaurant</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Café">Café</option>
                <option value="Bar">Bar</option>
                <option value="Pizzeria">Pizzeria</option>
                <option value="Boulangerie">Boulangerie</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="owner">Propriétaire</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => handleChange('owner', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="hours">Horaires</Label>
              <Input
                id="hours"
                value={formData.hours}
                onChange={(e) => handleChange('hours', e.target.value)}
                placeholder="Ex: Lun-Dim: 12h-22h"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact & Localisation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="address">Adresse</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Description du restaurant..."
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="plan">Plan d'abonnement</Label>
              <select
                id="plan"
                value={formData.plan}
                onChange={(e) => handleChange('plan', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Gratuit">Gratuit</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="status">Statut</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
                <option value="Suspendu">Suspendu</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Annuler
        </Button>
        <Button type="submit" className="bg-scanner-green-600 hover:bg-scanner-green-700">
          <Save className="h-4 w-4 mr-2" />
          Sauvegarder
        </Button>
      </div>
    </form>
  );
};

export default RestaurantEditForm;
