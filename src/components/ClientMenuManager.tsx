import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Edit, Trash2, Menu, ChefHat, Euro, Clock, AlertTriangle, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  preparationTime: number;
  allergens: string[];
  isPopular: boolean;
}

interface Category {
  id: number;
  name: string;
  description: string;
  order: number;
  isActive: boolean;
}

interface MenuModification {
  date: string;
  type: 'add' | 'edit' | 'delete';
  description: string;
}

const ClientMenuManager = () => {
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: 1,
      name: "Pizza Margherita",
      description: "Tomate, mozzarella, basilic frais",
      price: 12.50,
      category: "Plats principaux",
      available: true,
      preparationTime: 15,
      allergens: ["Gluten", "Lactose"],
      isPopular: true
    }
  ]);

  const [categories] = useState<Category[]>([
    { id: 1, name: "Entrées", description: "Plats d'entrée", order: 1, isActive: true },
    { id: 2, name: "Plats principaux", description: "Plats de résistance", order: 2, isActive: true },
    { id: 3, name: "Desserts", description: "Desserts et pâtisseries", order: 3, isActive: true },
    { id: 4, name: "Boissons", description: "Boissons chaudes et froides", order: 4, isActive: true }
  ]);

  // Simulation des modifications du mois
  const [monthlyModifications, setMonthlyModifications] = useState<MenuModification[]>([
    { date: '2025-01-05', type: 'add', description: 'Ajout Pizza Napoletana' },
    { date: '2025-01-12', type: 'edit', description: 'Modification prix Salade César' }
  ]);

  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [isEditDishOpen, setIsEditDishOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const [dishForm, setDishForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    preparationTime: '',
    allergens: '',
    available: true,
    isPopular: false
  });

  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const getMonthlyModificationsCount = () => {
    const currentMonth = getCurrentMonth();
    return monthlyModifications.filter(mod => mod.date.startsWith(currentMonth)).length;
  };

  const canModifyMenu = () => getMonthlyModificationsCount() < 2;

  const addModification = (type: 'add' | 'edit' | 'delete', description: string) => {
    const newMod: MenuModification = {
      date: new Date().toISOString().split('T')[0],
      type,
      description
    };
    setMonthlyModifications(prev => [...prev, newMod]);
  };

  const resetDishForm = () => {
    setDishForm({
      name: '',
      description: '',
      price: '',
      category: '',
      preparationTime: '',
      allergens: '',
      available: true,
      isPopular: false
    });
  };

  const handleAddDish = () => {
    if (!canModifyMenu()) {
      toast.error('Limite de modifications atteinte pour ce mois');
      return;
    }

    if (!dishForm.name || !dishForm.price || !dishForm.category) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newDish: Dish = {
      id: Date.now(),
      name: dishForm.name,
      description: dishForm.description,
      price: parseFloat(dishForm.price),
      category: dishForm.category,
      available: dishForm.available,
      preparationTime: parseInt(dishForm.preparationTime) || 10,
      allergens: dishForm.allergens.split(',').map(a => a.trim()).filter(a => a),
      isPopular: dishForm.isPopular
    };

    setDishes([...dishes, newDish]);
    addModification('add', `Ajout "${newDish.name}"`);
    toast.success(`Plat "${newDish.name}" ajouté avec succès !`);
    resetDishForm();
    setIsAddDishOpen(false);
  };

  const handleEditDish = (dish: Dish) => {
    if (!canModifyMenu()) {
      toast.error('Limite de modifications atteinte pour ce mois');
      return;
    }

    setEditingDish(dish);
    setDishForm({
      name: dish.name,
      description: dish.description,
      price: dish.price.toString(),
      category: dish.category,
      preparationTime: dish.preparationTime.toString(),
      allergens: dish.allergens.join(', '),
      available: dish.available,
      isPopular: dish.isPopular
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
      price: parseFloat(dishForm.price),
      category: dishForm.category,
      available: dishForm.available,
      preparationTime: parseInt(dishForm.preparationTime) || 10,
      allergens: dishForm.allergens.split(',').map(a => a.trim()).filter(a => a),
      isPopular: dishForm.isPopular
    };

    setDishes(dishes.map(d => d.id === editingDish.id ? updatedDish : d));
    addModification('edit', `Modification "${updatedDish.name}"`);
    toast.success(`Plat "${updatedDish.name}" modifié avec succès !`);
    resetDishForm();
    setIsEditDishOpen(false);
    setEditingDish(null);
  };

  const handleDeleteDish = (dishId: number) => {
    if (!canModifyMenu()) {
      toast.error('Limite de modifications atteinte pour ce mois');
      return;
    }

    const dish = dishes.find(d => d.id === dishId);
    if (confirm(`Êtes-vous sûr de vouloir supprimer le plat "${dish?.name}" ?`)) {
      setDishes(dishes.filter(d => d.id !== dishId));
      addModification('delete', `Suppression "${dish?.name}"`);
      toast.success('Plat supprimé avec succès');
    }
  };

  const modificationsLeft = 2 - getMonthlyModificationsCount();

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gestion de votre Menu</h2>
          <p className="text-muted-foreground">Gérez vos plats et leur disponibilité</p>
        </div>
      </div>

      {/* Alerte limite modifications */}
      <Alert className={modificationsLeft === 0 ? "border-red-200 bg-red-50" : modificationsLeft === 1 ? "border-orange-200 bg-orange-50" : "border-blue-200 bg-blue-50"}>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span>
              {modificationsLeft > 0 
                ? `Il vous reste ${modificationsLeft} modification${modificationsLeft > 1 ? 's' : ''} ce mois`
                : 'Limite mensuelle atteinte (2 modifications maximum)'
              }
            </span>
            {modificationsLeft === 0 && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setIsContactModalOpen(true)}
                className="text-sm"
              >
                <Phone className="h-3 w-3 mr-1" />
                Nous contacter
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plats</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dishes.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            <Menu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dishes.filter(d => d.available).length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prix Moyen</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dishes.length > 0 ? (dishes.reduce((acc, d) => acc + d.price, 0) / dishes.length).toFixed(0) : '0'} FCFA
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modifications</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getMonthlyModificationsCount()}/2</div>
          </CardContent>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Dialog open={isAddDishOpen} onOpenChange={setIsAddDishOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-scanner-green-600 hover:bg-scanner-green-700"
              disabled={!canModifyMenu()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un plat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau plat</DialogTitle>
              <DialogDescription>
                Ajoutez un nouveau plat à votre menu
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dish-name">Nom du plat *</Label>
                  <Input
                    id="dish-name"
                    value={dishForm.name}
                    onChange={(e) => setDishForm({...dishForm, name: e.target.value})}
                    placeholder="Ex: Pizza Margherita"
                  />
                </div>
                <div>
                  <Label htmlFor="dish-price">Prix (FCFA) *</Label>
                  <Input
                    id="dish-price"
                    type="number"
                    value={dishForm.price}
                    onChange={(e) => setDishForm({...dishForm, price: e.target.value})}
                    placeholder="2500"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="dish-description">Description</Label>
                <Textarea
                  id="dish-description"
                  value={dishForm.description}
                  onChange={(e) => setDishForm({...dishForm, description: e.target.value})}
                  placeholder="Description du plat..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dish-category">Catégorie *</Label>
                  <Select value={dishForm.category} onValueChange={(value) => setDishForm({...dishForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c.isActive).map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dish-prep-time">Temps de préparation (min)</Label>
                  <Input
                    id="dish-prep-time"
                    type="number"
                    value={dishForm.preparationTime}
                    onChange={(e) => setDishForm({...dishForm, preparationTime: e.target.value})}
                    placeholder="15"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dish-allergens">Allergènes (séparés par des virgules)</Label>
                <Input
                  id="dish-allergens"
                  value={dishForm.allergens}
                  onChange={(e) => setDishForm({...dishForm, allergens: e.target.value})}
                  placeholder="Gluten, Lactose, Œuf"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
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

      {/* Liste des plats */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Vos plats</h3>
        {categories.filter(c => c.isActive).sort((a, b) => a.order - b.order).map((category) => {
          const categoryDishes = dishes.filter(d => d.category === category.name);
          if (categoryDishes.length === 0) return null;

          return (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {category.name}
                  <Badge variant="outline">{categoryDishes.length} plat(s)</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {categoryDishes.map((dish) => (
                    <div key={dish.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="font-medium">{dish.name}</h4>
                          <Badge variant={dish.available ? "default" : "secondary"}>
                            {dish.available ? "Disponible" : "Indisponible"}
                          </Badge>
                          {dish.isPopular && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              Populaire
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{dish.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-semibold text-scanner-green-600">{dish.price.toFixed(0)} FCFA</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {dish.preparationTime}min
                          </span>
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
                          disabled={!canModifyMenu()}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteDish(dish.id)}
                          className="text-red-600 hover:text-red-700"
                          disabled={!canModifyMenu()}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dish Dialog */}
      <Dialog open={isEditDishOpen} onOpenChange={setIsEditDishOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le plat</DialogTitle>
            <DialogDescription>Modifiez les informations du plat</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-dish-name">Nom du plat *</Label>
                <Input
                  id="edit-dish-name"
                  value={dishForm.name}
                  onChange={(e) => setDishForm({...dishForm, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-dish-price">Prix (FCFA) *</Label>
                <Input
                  id="edit-dish-price"
                  type="number"
                  value={dishForm.price}
                  onChange={(e) => setDishForm({...dishForm, price: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-dish-description">Description</Label>
              <Textarea
                id="edit-dish-description"
                value={dishForm.description}
                onChange={(e) => setDishForm({...dishForm, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-dish-category">Catégorie *</Label>
                <Select value={dishForm.category} onValueChange={(value) => setDishForm({...dishForm, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.isActive).map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-dish-prep-time">Temps de préparation (min)</Label>
                <Input
                  id="edit-dish-prep-time"
                  type="number"
                  value={dishForm.preparationTime}
                  onChange={(e) => setDishForm({...dishForm, preparationTime: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-dish-allergens">Allergènes (séparés par des virgules)</Label>
              <Input
                id="edit-dish-allergens"
                value={dishForm.allergens}
                onChange={(e) => setDishForm({...dishForm, allergens: e.target.value})}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
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

      {/* Contact Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Augmenter votre limite</DialogTitle>
            <DialogDescription>
              Contactez-nous pour augmenter votre limite de modifications mensuelles
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <p>Pour plus de modifications par mois, contactez notre équipe :</p>
              <div className="space-y-2">
                <p className="font-semibold">📞 +221 77 000 00 00</p>
                <p className="font-semibold">📧 contact@kaay-scanner.sn</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsContactModalOpen(false)} 
              className="w-full"
            >
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Historique des modifications */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des modifications ce mois</CardTitle>
        </CardHeader>
        <CardContent>
          {monthlyModifications.filter(mod => mod.date.startsWith(getCurrentMonth())).length === 0 ? (
            <p className="text-muted-foreground">Aucune modification ce mois</p>
          ) : (
            <div className="space-y-2">
              {monthlyModifications
                .filter(mod => mod.date.startsWith(getCurrentMonth()))
                .map((mod, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{mod.description}</span>
                    <Badge variant="outline" className="text-xs">
                      {new Date(mod.date).toLocaleDateString('fr-FR')}
                    </Badge>
                  </div>
                ))
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientMenuManager;