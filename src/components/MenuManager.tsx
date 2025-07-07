import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search, ChefHat, Clock, Euro } from 'lucide-react';
import { toast } from 'sonner';
import { useNotifications } from '@/hooks/useNotifications';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  preparationTime: number;
  allergens: string[];
  businessId: number;
  businessName: string;
  createdAt: Date;
}

const MenuManager = () => {
  const { addNotification } = useNotifications();
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: 1,
      name: "Pizza Margherita",
      description: "Tomate, mozzarella, basilic frais",
      price: 2500,
      category: "Plats principaux",
      available: true,
      preparationTime: 15,
      allergens: ["Gluten", "Lactose"],
      businessId: 1,
      businessName: "Le Petit Bistro",
      createdAt: new Date()
    },
    {
      id: 2,
      name: "Sushi Saumon",
      description: "Sushi frais au saumon",
      price: 3000,
      category: "Sushis",
      available: true,
      preparationTime: 5,
      allergens: ["Poisson"],
      businessId: 2,
      businessName: "Sushi Zen",
      createdAt: new Date()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBusiness, setSelectedBusiness] = useState('all');
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [isEditDishOpen, setIsEditDishOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  const [dishForm, setDishForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    preparationTime: '',
    allergens: '',
    available: true,
    businessId: '',
    businessName: ''
  });

  const categories = ["Entrées", "Plats principaux", "Desserts", "Boissons", "Sushis"];
  const businesses = [
    { id: 1, name: "Le Petit Bistro" },
    { id: 2, name: "Sushi Zen" },
    { id: 3, name: "Pizza Corner" }
  ];

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dish.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
    const matchesBusiness = selectedBusiness === 'all' || dish.businessId.toString() === selectedBusiness;
    
    return matchesSearch && matchesCategory && matchesBusiness;
  });

  const resetForm = () => {
    setDishForm({
      name: '',
      description: '',
      price: '',
      category: '',
      preparationTime: '',
      allergens: '',
      available: true,
      businessId: '',
      businessName: ''
    });
  };

  const handleAddDish = () => {
    if (!dishForm.name || !dishForm.price || !dishForm.category || !dishForm.businessId) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const selectedBiz = businesses.find(b => b.id.toString() === dishForm.businessId);
    const newDish: Dish = {
      id: Date.now(),
      name: dishForm.name,
      description: dishForm.description,
      price: parseInt(dishForm.price),
      category: dishForm.category,
      available: dishForm.available,
      preparationTime: parseInt(dishForm.preparationTime) || 10,
      allergens: dishForm.allergens.split(',').map(a => a.trim()).filter(a => a),
      businessId: parseInt(dishForm.businessId),
      businessName: selectedBiz?.name || '',
      createdAt: new Date()
    };

    setDishes([...dishes, newDish]);
    
    addNotification({
      title: 'Nouveau plat ajouté',
      message: `${newDish.name} ajouté au menu de ${newDish.businessName}`,
      type: 'success',
      businessId: newDish.businessId,
      businessName: newDish.businessName
    });

    toast.success(`Plat "${newDish.name}" ajouté avec succès`);
    resetForm();
    setIsAddDishOpen(false);
  };

  const handleEditDish = (dish: Dish) => {
    setEditingDish(dish);
    setDishForm({
      name: dish.name,
      description: dish.description,
      price: dish.price.toString(),
      category: dish.category,
      preparationTime: dish.preparationTime.toString(),
      allergens: dish.allergens.join(', '),
      available: dish.available,
      businessId: dish.businessId.toString(),
      businessName: dish.businessName
    });
    setIsEditDishOpen(true);
  };

  const handleUpdateDish = () => {
    if (!editingDish || !dishForm.name || !dishForm.price || !dishForm.category) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const updatedDish: Dish = {
      ...editingDish,
      name: dishForm.name,
      description: dishForm.description,
      price: parseInt(dishForm.price),
      category: dishForm.category,
      available: dishForm.available,
      preparationTime: parseInt(dishForm.preparationTime) || 10,
      allergens: dishForm.allergens.split(',').map(a => a.trim()).filter(a => a)
    };

    setDishes(dishes.map(d => d.id === editingDish.id ? updatedDish : d));
    
    addNotification({
      title: 'Plat modifié',
      message: `${updatedDish.name} mis à jour dans le menu de ${updatedDish.businessName}`,
      type: 'info',
      businessId: updatedDish.businessId,
      businessName: updatedDish.businessName
    });

    toast.success(`Plat "${updatedDish.name}" modifié avec succès`);
    resetForm();
    setIsEditDishOpen(false);
    setEditingDish(null);
  };

  const handleDeleteDish = (dishId: number) => {
    const dish = dishes.find(d => d.id === dishId);
    if (dish && confirm(`Êtes-vous sûr de vouloir supprimer "${dish.name}" ?`)) {
      setDishes(dishes.filter(d => d.id !== dishId));
      
      addNotification({
        title: 'Plat supprimé',
        message: `${dish.name} retiré du menu de ${dish.businessName}`,
        type: 'warning',
        businessId: dish.businessId,
        businessName: dish.businessName
      });

      toast.success('Plat supprimé avec succès');
    }
  };

  const stats = {
    total: dishes.length,
    available: dishes.filter(d => d.available).length,
    avgPrice: dishes.length > 0 ? Math.round(dishes.reduce((acc, d) => acc + d.price, 0) / dishes.length) : 0,
    categories: new Set(dishes.map(d => d.category)).size
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Menus</h2>
          <p className="text-gray-600">Gérez les plats de toutes les entreprises</p>
        </div>
        
        <Dialog open={isAddDishOpen} onOpenChange={setIsAddDishOpen}>
          <DialogTrigger asChild>
            <Button className="bg-scanner-green-600 hover:bg-scanner-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau plat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau plat</DialogTitle>
              <DialogDescription>
                Ajoutez un plat au menu d'une entreprise
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="business">Entreprise *</Label>
                  <Select value={dishForm.businessId} onValueChange={(value) => {
                    const biz = businesses.find(b => b.id.toString() === value);
                    setDishForm({...dishForm, businessId: value, businessName: biz?.name || ''});
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une entreprise" />
                    </SelectTrigger>
                    <SelectContent>
                      {businesses.map((business) => (
                        <SelectItem key={business.id} value={business.id.toString()}>
                          {business.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select value={dishForm.category} onValueChange={(value) => setDishForm({...dishForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom du plat *</Label>
                  <Input
                    id="name"
                    value={dishForm.name}
                    onChange={(e) => setDishForm({...dishForm, name: e.target.value})}
                    placeholder="Ex: Pizza Margherita"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Prix (FCFA) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={dishForm.price}
                    onChange={(e) => setDishForm({...dishForm, price: e.target.value})}
                    placeholder="2500"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={dishForm.description}
                  onChange={(e) => setDishForm({...dishForm, description: e.target.value})}
                  placeholder="Description du plat..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prep-time">Temps de préparation (min)</Label>
                  <Input
                    id="prep-time"
                    type="number"
                    value={dishForm.preparationTime}
                    onChange={(e) => setDishForm({...dishForm, preparationTime: e.target.value})}
                    placeholder="15"
                  />
                </div>
                <div>
                  <Label htmlFor="allergens">Allergènes (séparés par des virgules)</Label>
                  <Input
                    id="allergens"
                    value={dishForm.allergens}
                    onChange={(e) => setDishForm({...dishForm, allergens: e.target.value})}
                    placeholder="Gluten, Lactose"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddDish} className="bg-scanner-green-600 hover:bg-scanner-green-700">
                  Ajouter le plat
                </Button>
                <Button variant="outline" onClick={() => setIsAddDishOpen(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plats</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.available}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prix Moyen</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgPrice} FCFA</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Catégories</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom de plat ou entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-scanner-green-500"
              >
                <option value="all">Toutes les catégories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={selectedBusiness}
                onChange={(e) => setSelectedBusiness(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-scanner-green-500"
              >
                <option value="all">Toutes les entreprises</option>
                {businesses.map(biz => (
                  <option key={biz.id} value={biz.id.toString()}>{biz.name}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dishes List */}
      <Card>
        <CardHeader>
          <CardTitle>Plats ({filteredDishes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDishes.map((dish) => (
              <div key={dish.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{dish.name}</h4>
                      <Badge variant="outline">{dish.category}</Badge>
                      <Badge variant={dish.available ? "default" : "secondary"}>
                        {dish.available ? "Disponible" : "Indisponible"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{dish.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-semibold text-scanner-green-600">{dish.price} FCFA</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {dish.preparationTime}min
                      </span>
                      <span>{dish.businessName}</span>
                      {dish.allergens.length > 0 && (
                        <span className="text-xs">Allergènes: {dish.allergens.join(', ')}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditDish(dish)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteDish(dish.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredDishes.length === 0 && (
              <div className="text-center py-12">
                <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun plat trouvé</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDishOpen} onOpenChange={setIsEditDishOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le plat</DialogTitle>
            <DialogDescription>Modifiez les informations du plat</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Nom du plat *</Label>
                <Input
                  id="edit-name"
                  value={dishForm.name}
                  onChange={(e) => setDishForm({...dishForm, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-price">Prix (FCFA) *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={dishForm.price}
                  onChange={(e) => setDishForm({...dishForm, price: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={dishForm.description}
                onChange={(e) => setDishForm({...dishForm, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">Catégorie *</Label>
                <Select value={dishForm.category} onValueChange={(value) => setDishForm({...dishForm, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-prep-time">Temps de préparation (min)</Label>
                <Input
                  id="edit-prep-time"
                  type="number"
                  value={dishForm.preparationTime}
                  onChange={(e) => setDishForm({...dishForm, preparationTime: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-allergens">Allergènes (séparés par des virgules)</Label>
              <Input
                id="edit-allergens"
                value={dishForm.allergens}
                onChange={(e) => setDishForm({...dishForm, allergens: e.target.value})}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleUpdateDish} className="bg-scanner-green-600 hover:bg-scanner-green-700">
                Sauvegarder
              </Button>
              <Button variant="outline" onClick={() => setIsEditDishOpen(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuManager;