
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Palette } from 'lucide-react';
import { toast } from 'sonner';
import { useBusinessTypes, BusinessType } from '@/hooks/useBusinessTypes';

const BusinessTypeManager = () => {
  const { businessTypes, addBusinessType, updateBusinessType, deleteBusinessType } = useBusinessTypes();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<BusinessType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    color: 'bg-gray-500',
    description: ''
  });

  const colorOptions = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
    'bg-orange-500', 'bg-cyan-500', 'bg-amber-500', 'bg-gray-500'
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '',
      color: 'bg-gray-500',
      description: ''
    });
  };

  const handleAdd = () => {
    if (!formData.name.trim() || !formData.icon.trim()) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    addBusinessType(formData);
    toast.success(`Type d'entreprise "${formData.name}" ajouté avec succès`);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (type: BusinessType) => {
    setEditingType(type);
    setFormData({
      name: type.name,
      icon: type.icon,
      color: type.color,
      description: type.description
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!editingType || !formData.name.trim() || !formData.icon.trim()) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    updateBusinessType(editingType.id, formData);
    toast.success(`Type d'entreprise "${formData.name}" mis à jour avec succès`);
    resetForm();
    setEditingType(null);
    setIsEditDialogOpen(false);
  };

  const handleDelete = (type: BusinessType) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le type "${type.name}" ?`)) {
      deleteBusinessType(type.id);
      toast.success(`Type d'entreprise "${type.name}" supprimé`);
    }
  };

  const BusinessTypeForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nom du type *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Restaurant, Pâtisserie..."
          required
        />
      </div>

      <div>
        <Label htmlFor="icon">Icône (emoji) *</Label>
        <Input
          id="icon"
          value={formData.icon}
          onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
          placeholder="🍽️, 🧁, 🍦..."
          required
        />
      </div>

      <div>
        <Label>Couleur</Label>
        <div className="grid grid-cols-6 gap-2 mt-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              className={`w-8 h-8 rounded-full ${color} ${
                formData.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
              }`}
              onClick={() => setFormData(prev => ({ ...prev, color }))}
            />
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Description du type d'entreprise..."
          rows={3}
        />
      </div>

      <Button 
        onClick={isEdit ? handleUpdate : handleAdd} 
        className="w-full bg-scanner-green-600 hover:bg-scanner-green-700"
      >
        {isEdit ? 'Mettre à jour' : 'Ajouter'} le type
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Types d'entreprise</h2>
          <p className="text-gray-600">Gérez les différents types d'entreprise disponibles</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-scanner-green-600 hover:bg-scanner-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouveau type d'entreprise</DialogTitle>
              <DialogDescription>
                Ajoutez un nouveau type d'entreprise à votre plateforme
              </DialogDescription>
            </DialogHeader>
            <BusinessTypeForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {businessTypes.map((type) => (
          <Card key={type.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${type.color}`}>
                    <span className="text-2xl">{type.icon}</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">
                      {type.id}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(type)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(type)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le type d'entreprise</DialogTitle>
            <DialogDescription>
              Modifiez les informations du type d'entreprise
            </DialogDescription>
          </DialogHeader>
          <BusinessTypeForm isEdit={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessTypeManager;
