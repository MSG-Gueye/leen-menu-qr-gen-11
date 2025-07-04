
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBusinessTypes } from '@/hooks/useBusinessTypes';
import { Business, subscriptionPackages } from '@/hooks/useBusinesses';

interface BusinessFormProps {
  onSubmit: (business: Omit<Business, 'id' | 'menuItems' | 'lastUpdate' | 'totalScans'>) => void;
  initialData?: Partial<Business>;
  isEditing?: boolean;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onSubmit, initialData, isEditing = false }) => {
  const { businessTypes } = useBusinessTypes();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    address: initialData?.address || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    businessType: initialData?.businessType || 'restaurant',
    status: initialData?.status || 'Actif' as const,
    owner: initialData?.owner || '',
    description: initialData?.description || '',
    subscriptionPackage: initialData?.subscriptionPackage || 'basic' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nom de l'entreprise *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Le Petit Bistro"
          required
        />
      </div>

      <div>
        <Label htmlFor="businessType">Type d'entreprise *</Label>
        <Select value={formData.businessType} onValueChange={(value) => handleChange('businessType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un type" />
          </SelectTrigger>
          <SelectContent>
            {businessTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                <div className="flex items-center gap-2">
                  <span>{type.icon}</span>
                  <span>{type.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="subscriptionPackage">Package d'abonnement *</Label>
        <Select value={formData.subscriptionPackage} onValueChange={(value) => handleChange('subscriptionPackage', value as 'basic' | 'premium' | 'enterprise')}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir un package" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(subscriptionPackages).map(([key, pkg]) => (
              <SelectItem key={key} value={key}>
                <div className="flex flex-col">
                  <span className="font-medium">{pkg.name}</span>
                  <span className="text-sm text-gray-500">{pkg.price.toLocaleString()} FCFA/mois</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="owner">Propriétaire *</Label>
        <Input
          id="owner"
          value={formData.owner}
          onChange={(e) => handleChange('owner', e.target.value)}
          placeholder="Marie Dupont"
          required
        />
      </div>

      <div>
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="123 Rue de la Paix, 75001 Paris"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="01 42 33 44 55"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="contact@entreprise.fr"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Description de l'entreprise..."
          rows={3}
        />
      </div>

      {isEditing && (
        <div>
          <Label htmlFor="status">Statut</Label>
          <Select value={formData.status} onValueChange={(value) => handleChange('status', value as 'Actif' | 'Inactif' | 'Suspendu')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Actif">Actif</SelectItem>
              <SelectItem value="Inactif">Inactif</SelectItem>
              <SelectItem value="Suspendu">Suspendu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Button type="submit" className="w-full bg-scanner-green-600 hover:bg-scanner-green-700">
        {isEditing ? 'Mettre à jour l\'entreprise' : 'Créer l\'entreprise'}
      </Button>
    </form>
  );
};

export default BusinessForm;
