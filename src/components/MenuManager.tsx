
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ArrowDown, ArrowUp } from 'lucide-react';

const MenuManager = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Entrées",
      items: [
        { id: 1, name: "Salade de chèvre chaud", description: "Salade verte, crottin de chèvre grillé, noix et miel", price: "12.50" },
        { id: 2, name: "Soupe à l'oignon", description: "Soupe traditionnelle gratinée au fromage", price: "9.80" }
      ]
    },
    {
      id: 2,
      name: "Plats principaux",
      items: [
        { id: 3, name: "Bœuf bourguignon", description: "Mijoté de bœuf aux carottes et champignons", price: "18.90" },
        { id: 4, name: "Saumon grillé", description: "Filet de saumon grillé, légumes de saison", price: "16.50" }
      ]
    }
  ]);

  const [newCategory, setNewCategory] = useState({ name: '' });
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', categoryId: null });
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    const category = {
      id: Date.now(),
      name: newCategory.name,
      items: []
    };

    setCategories([...categories, category]);
    setNewCategory({ name: '' });
    setIsCategoryDialogOpen(false);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim() || !newItem.categoryId) return;

    const item = {
      id: Date.now(),
      name: newItem.name,
      description: newItem.description,
      price: newItem.price
    };

    setCategories(categories.map(cat => 
      cat.id === newItem.categoryId 
        ? { ...cat, items: [...cat.items, item] }
        : cat
    ));

    setNewItem({ name: '', description: '', price: '', categoryId: null });
    setIsItemDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des menus</h2>
        <div className="flex gap-2">
          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-scanner-green-600 text-scanner-green-600">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle catégorie
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nouvelle catégorie</DialogTitle>
                <DialogDescription>Ajoutez une nouvelle catégorie à votre menu</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <Label htmlFor="categoryName">Nom de la catégorie</Label>
                  <Input
                    id="categoryName"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ name: e.target.value })}
                    placeholder="Entrées, Plats, Desserts..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-scanner-green-600 hover:bg-scanner-green-700">
                  Créer la catégorie
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-scanner-green-600 hover:bg-scanner-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau plat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nouveau plat</DialogTitle>
                <DialogDescription>Ajoutez un nouveau plat à votre menu</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <Label htmlFor="itemCategory">Catégorie</Label>
                  <select
                    id="itemCategory"
                    value={newItem.categoryId || ''}
                    onChange={(e) => setNewItem({ ...newItem, categoryId: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-scanner-green-500"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="itemName">Nom du plat</Label>
                  <Input
                    id="itemName"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Nom du plat"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="itemDescription">Description</Label>
                  <Textarea
                    id="itemDescription"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Description du plat..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="itemPrice">Prix (€)</Label>
                  <Input
                    id="itemPrice"
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    placeholder="12.50"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-scanner-green-600 hover:bg-scanner-green-700">
                  Ajouter le plat
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="bg-scanner-green-50 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-scanner-green-800">{category.name}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {category.items.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  Aucun plat dans cette catégorie
                </div>
              ) : (
                <div className="divide-y">
                  {category.items.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <Badge variant="secondary" className="text-lg font-bold">
                            {item.price}€
                          </Badge>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Aucune catégorie créée</p>
          <Button onClick={() => setIsCategoryDialogOpen(true)} className="bg-scanner-green-600 hover:bg-scanner-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Créer votre première catégorie
          </Button>
        </div>
      )}
    </div>
  );
};

export default MenuManager;
