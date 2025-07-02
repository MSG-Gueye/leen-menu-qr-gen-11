
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Menu, ChefHat, Euro, Clock, Users } from 'lucide-react';
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

const MenuManager = () => {
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
    },
    {
      id: 2,
      name: "Salade César",
      description: "Salade romaine, parmesan, croûtons, sauce césar",
      price: 9.90,
      category: "Entrées",
      available: true,
      preparationTime: 10,
      allergens: ["Gluten", "Lactose", "Œuf"],
      isPopular: false
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Entrées", description: "Plats d'entrée", order: 1, isActive: true },
    { id: 2, name: "Plats principaux", description: "Plats de résistance", order: 2, isActive: true },
    { id: 3, name: "Desserts", description: "Desserts et pâtisseries", order: 3, isActive: true },
    { id: 4, name: "Boissons", description: "Boissons chaudes et froides", order: 4, isActive: true }
  ]);

  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [isEditDishOpen, setIsEditDishOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    order: '',
    isActive: true
  });

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

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      description: '',
      order: '',
      isActive: true
    });
  };

  const handleAddDish = () => {
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
    toast.success(`Plat "${newDish.name}" ajouté avec succès !`);
    resetDishForm();
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
    toast.success(`Plat "${updatedDish.name}" modifié avec succès !`);
    resetDishForm();
    setIsEditDishOpen(false);
    setEditingDish(null);
  };

  const handleDeleteDish = (dishId: number) => {
    const dish = dishes.find(d => d.id === dishId);
    if (confirm(`Êtes-vous sûr de vouloir supprimer le plat "${dish?.name}" ?`)) {
      setDishes(dishes.filter(d => d.id !== dishId));
      toast.success('Plat supprimé avec succès');
    }
  };

  const handleAddCategory = () => {
    if (!categoryForm.name) {
      toast.error('Veuillez saisir un nom de catégorie');
      return;
    }

    const newCategory: Category = {
      id: Date.now(),
      name: categoryForm.name,
      description: categoryForm.description,
      order: parseInt(categoryForm.order) || categories.length + 1,
      isActive: categoryForm.isActive
    };

    setCategories([...categories, newCategory]);
    toast.success(`Catégorie "${newCategory.name}" ajoutée avec succès !`);
    resetCategoryForm();
    setIsAddCategoryOpen(false);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description,
      order: category.order.toString(),
      isActive: category.isActive
    });
    setIsEditCategoryOpen(true);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !categoryForm.name) {
      toast.error('Veuillez saisir un nom de catégorie');
      return;
    }

    const updatedCategory: Category = {
      ...editingCategory,
      name: categoryForm.name,
      description: categoryForm.description,
      order: parseInt(categoryForm.order) || 1,
      isActive: categoryForm.isActive
    };

    setCategories(categories.map(c => c.id === editingCategory.id ? updatedCategory : c));
    toast.success(`Catégorie "${updatedCategory.name}" modifiée avec succès !`);
    resetCategoryForm();
    setIsEditCategoryOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    const dishesInCategory = dishes.filter(d => d.category === category?.name);
    
    if (dishesInCategory.length > 0) {
      toast.error(`Impossible de supprimer la catégorie "${category?.name}" car elle contient ${dishesInCategory.length} plat(s)`);
      return;
    }

    if (confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${category?.name}" ?`)) {
      setCategories(categories.filter(c => c.id !== categoryId));
      toast.success('Catégorie supprimée avec succès');
    }
  };

  const toggleDishAvailability = (dishId: number) => {
    setDishes(dishes.map(d => 
      d.id === dishId ? { ...d, available: !d.available } : d
    ));
    const dish = dishes.find(d => d.id === dishId);
    toast.success(`Plat "${dish?.name}" ${dish?.available ? 'désactivé' : 'activé'}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion du Menu</h2>
          <p className="text-gray-600">Gérez vos plats et catégories de menu</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <CardTitle className="text-sm font-medium">Plats Disponibles</CardTitle>
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
              {dishes.length > 0 ? (dishes.reduce((acc, d) => acc + d.price, 0) / dishes.length).toFixed(2) : '0.00'}€
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Catégories</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.filter(c => c.isActive).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <Dialog open={isAddDishOpen} onOpenChange={setIsAddDishOpen}>
          <DialogTrigger asChild>
            <Button className="bg-scanner-green-600 hover:bg-scanner-green-700">
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
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="dish-price">Prix (€) *</Label>
                  <Input
                    id="dish-price"
                    type="number"
                    step="0.01"
                    value={dishForm.price}
                    onChange={(e) => setDishForm({...dishForm, price: e.target.value})}
                    placeholder="12.50"
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

              <div className="grid grid-cols-2 gap-4">
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

              <div className="flex gap-4">
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

        <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une catégorie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
              <DialogDescription>
                Ajoutez une nouvelle catégorie à votre menu
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category-name">Nom de la catégorie *</Label>
                <Input
                  id="category-name"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                  placeholder="Ex: Entrées"
                />
              </div>
              
              <div>
                <Label htmlFor="category-description">Description</Label>
                <Textarea
                  id="category-description"
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                  placeholder="Description de la catégorie..."
                />
              </div>

              <div>
                <Label htmlFor="category-order">Ordre d'affichage</Label>
                <Input
                  id="category-order"
                  type="number"
                  value={categoryForm.order}
                  onChange={(e) => setCategoryForm({...categoryForm, order: e.target.value})}
                  placeholder="1"
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={handleAddCategory} className="bg-scanner-green-600 hover:bg-scanner-green-700">
                  Ajouter la catégorie
                </Button>
                <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Catégories de menu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.sort((a, b) => a.order - b.order).map((category) => (
              <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{category.name}</h4>
                    <Badge variant={category.isActive ? "default" : "secondary"}>
                      {category.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  <span className="text-xs text-gray-500">
                    {dishes.filter(d => d.category === category.name).length} plat(s)
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dishes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Plats du menu</h3>
        {categories.filter(c => c.isActive).sort((a, b) => a.order - b.order).map((category) => {
          const categoryDishes = dishes.filter(d => d.category === category.name);
          if (categoryDishes.length === 0) return null;

          return (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.name}
                  <Badge variant="outline">{categoryDishes.length} plat(s)</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {categoryDishes.map((dish) => (
                    <div key={dish.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
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
                        <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="font-semibold text-scanner-green-600">{dish.price.toFixed(2)}€</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {dish.preparationTime}min
                          </span>
                          {dish.allergens.length > 0 && (
                            <span>Allergènes: {dish.allergens.join(', ')}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleDishAvailability(dish.id)}
                          className={dish.available ? "text-orange-600 hover:text-orange-700" : "text-green-600 hover:text-green-700"}
                        >
                          {dish.available ? "Désactiver" : "Activer"}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditDish(dish)}>
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
            <DialogDescription>
              Modifiez les informations du plat
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-dish-name">Nom du plat *</Label>
                <Input
                  id="edit-dish-name"
                  value={dishForm.name}
                  onChange={(e) => setDishForm({...dishForm, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-dish-price">Prix (€) *</Label>
                <Input
                  id="edit-dish-price"
                  type="number"
                  step="0.01"
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

            <div className="grid grid-cols-2 gap-4">
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

            <div className="flex gap-4">
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

      {/* Edit Category Dialog */}
      <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la catégorie</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la catégorie
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-category-name">Nom de la catégorie *</Label>
              <Input
                id="edit-category-name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-category-description">Description</Label>
              <Textarea
                id="edit-category-description"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="edit-category-order">Ordre d'affichage</Label>
              <Input
                id="edit-category-order"
                type="number"
                value={categoryForm.order}
                onChange={(e) => setCategoryForm({...categoryForm, order: e.target.value})}
              />
            </div>

            <div className="flex gap-4">
              <Button onClick={handleUpdateCategory} className="bg-scanner-green-600 hover:bg-scanner-green-700">
                Sauvegarder
              </Button>
              <Button variant="outline" onClick={() => setIsEditCategoryOpen(false)}>
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
