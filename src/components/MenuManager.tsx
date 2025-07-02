import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ArrowDown, ArrowUp, Image as ImageIcon, Copy, Eye } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

const MenuManager = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Entrées",
      items: [
        { 
          id: 1, 
          name: "Salade de chèvre chaud", 
          description: "Salade verte, crottin de chèvre grillé, noix et miel", 
          price: "12.50",
          image: "/api/placeholder/300/200",
          allergens: ["Lait", "Fruits à coque"],
          isVegetarian: true,
          isPopular: false
        },
        { 
          id: 2, 
          name: "Soupe à l'oignon", 
          description: "Soupe traditionnelle gratinée au fromage", 
          price: "9.80",
          image: "/api/placeholder/300/200",
          allergens: ["Lait", "Gluten"],
          isVegetarian: true,
          isPopular: true
        }
      ]
    },
    {
      id: 2,
      name: "Plats principaux",
      items: [
        { 
          id: 3, 
          name: "Bœuf bourguignon", 
          description: "Mijoté de bœuf aux carottes et champignons", 
          price: "18.90",
          image: "/api/placeholder/300/200",
          allergens: ["Sulfites"],
          isVegetarian: false,
          isPopular: true
        },
        { 
          id: 4, 
          name: "Saumon grillé", 
          description: "Filet de saumon grillé, légumes de saison", 
          price: "16.50",
          image: "/api/placeholder/300/200",
          allergens: ["Poisson"],
          isVegetarian: false,
          isPopular: false
        }
      ]
    }
  ]);

  const [newCategory, setNewCategory] = useState({ name: '' });
  const [newItem, setNewItem] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    categoryId: null,
    image: null,
    allergens: '',
    isVegetarian: false,
    isPopular: false
  });
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState(false);

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
    toast.success('Catégorie ajoutée avec succès');
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory({ ...category });
    setIsEditCategoryDialogOpen(true);
  };

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name.trim()) return;

    setCategories(categories.map(cat => 
      cat.id === editingCategory.id 
        ? { ...cat, name: editingCategory.name }
        : cat
    ));

    setEditingCategory(null);
    setIsEditCategoryDialogOpen(false);
    toast.success('Catégorie mise à jour avec succès');
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim() || !newItem.categoryId) return;

    const item = {
      id: Date.now(),
      name: newItem.name,
      description: newItem.description,
      price: newItem.price,
      image: newItem.image || "/api/placeholder/300/200",
      allergens: newItem.allergens.split(',').map(a => a.trim()).filter(a => a),
      isVegetarian: newItem.isVegetarian,
      isPopular: newItem.isPopular
    };

    setCategories(categories.map(cat => 
      cat.id === newItem.categoryId 
        ? { ...cat, items: [...cat.items, item] }
        : cat
    ));

    setNewItem({ 
      name: '', 
      description: '', 
      price: '', 
      categoryId: null,
      image: null,
      allergens: '',
      isVegetarian: false,
      isPopular: false
    });
    setIsItemDialogOpen(false);
    toast.success('Plat ajouté avec succès');
  };

  const handleEditItem = (item: any, categoryId: number) => {
    setEditingItem({
      ...item,
      categoryId,
      allergens: item.allergens.join(', ')
    });
    setIsItemDialogOpen(true);
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name.trim() || !editingItem.categoryId) return;

    const updatedItem = {
      ...editingItem,
      allergens: editingItem.allergens.split(',').map((a: string) => a.trim()).filter((a: string) => a)
    };

    setCategories(categories.map(cat => 
      cat.id === editingItem.categoryId 
        ? { 
            ...cat, 
            items: cat.items.map(item => 
              item.id === editingItem.id ? updatedItem : item
            )
          }
        : cat
    ));

    setEditingItem(null);
    setIsItemDialogOpen(false);
    toast.success('Plat mis à jour avec succès');
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    if (editingItem) {
      setEditingItem({ ...editingItem, image: imageUrl });
    } else {
      setNewItem({ ...newItem, image: imageUrl });
    }
  };

  const resetItemForm = () => {
    setEditingItem(null);
    setNewItem({ 
      name: '', 
      description: '', 
      price: '', 
      categoryId: null,
      image: null,
      allergens: '',
      isVegetarian: false,
      isPopular: false
    });
  };

  const handleDeleteCategory = (categoryId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;
    
    setCategories(categories.filter(cat => cat.id !== categoryId));
    toast.success('Catégorie supprimée');
  };

  const handleDeleteItem = (categoryId: number, itemId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) return;
    
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
        : cat
    ));
    toast.success('Plat supprimé');
  };

  const handleDuplicateItem = (item: any, categoryId: number) => {
    const duplicatedItem = {
      ...item,
      id: Date.now(),
      name: `${item.name} (Copie)`
    };

    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, items: [...cat.items, duplicatedItem] }
        : cat
    ));
    toast.success('Plat dupliqué');
  };

  const moveItem = (categoryId: number, itemId: number, direction: 'up' | 'down') => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        const items = [...cat.items];
        const index = items.findIndex(item => item.id === itemId);
        
        if ((direction === 'up' && index > 0) || (direction === 'down' && index < items.length - 1)) {
          const newIndex = direction === 'up' ? index - 1 : index + 1;
          [items[index], items[newIndex]] = [items[newIndex], items[index]];
        }
        
        return { ...cat, items };
      }
      return cat;
    }));
    toast.success('Ordre modifié');
  };

  const previewMenu = () => {
    window.open('/menu/preview', '_blank');
  };

  const currentItem = editingItem || newItem;
  const isEditing = !!editingItem;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des menus</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={previewMenu}>
            <Eye className="h-4 w-4 mr-2" />
            Aperçu
          </Button>
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

          <Dialog open={isItemDialogOpen} onOpenChange={(open) => {
            setIsItemDialogOpen(open);
            if (!open) resetItemForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-scanner-green-600 hover:bg-scanner-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau plat
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{isEditing ? 'Modifier le plat' : 'Nouveau plat'}</DialogTitle>
                <DialogDescription>
                  {isEditing ? 'Modifiez les informations de ce plat' : 'Ajoutez un nouveau plat à votre menu'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={isEditing ? handleUpdateItem : handleAddItem} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="itemCategory">Catégorie</Label>
                      <select
                        id="itemCategory"
                        value={currentItem.categoryId || ''}
                        onChange={(e) => {
                          const categoryId = parseInt(e.target.value);
                          if (isEditing) {
                            setEditingItem({ ...editingItem, categoryId });
                          } else {
                            setNewItem({ ...newItem, categoryId });
                          }
                        }}
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
                        value={currentItem.name}
                        onChange={(e) => {
                          if (isEditing) {
                            setEditingItem({ ...editingItem, name: e.target.value });
                          } else {
                            setNewItem({ ...newItem, name: e.target.value });
                          }
                        }}
                        placeholder="Nom du plat"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemDescription">Description</Label>
                      <Textarea
                        id="itemDescription"
                        value={currentItem.description}
                        onChange={(e) => {
                          if (isEditing) {
                            setEditingItem({ ...editingItem, description: e.target.value });
                          } else {
                            setNewItem({ ...newItem, description: e.target.value });
                          }
                        }}
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
                        value={currentItem.price}
                        onChange={(e) => {
                          if (isEditing) {
                            setEditingItem({ ...editingItem, price: e.target.value });
                          } else {
                            setNewItem({ ...newItem, price: e.target.value });
                          }
                        }}
                        placeholder="12.50"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="allergens">Allergènes (séparés par des virgules)</Label>
                      <Input
                        id="allergens"
                        value={currentItem.allergens}
                        onChange={(e) => {
                          if (isEditing) {
                            setEditingItem({ ...editingItem, allergens: e.target.value });
                          } else {
                            setNewItem({ ...newItem, allergens: e.target.value });
                          }
                        }}
                        placeholder="Gluten, Lait, Œufs..."
                      />
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={currentItem.isVegetarian}
                          onChange={(e) => {
                            if (isEditing) {
                              setEditingItem({ ...editingItem, isVegetarian: e.target.checked });
                            } else {
                              setNewItem({ ...newItem, isVegetarian: e.target.checked });
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">Végétarien</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={currentItem.isPopular}
                          onChange={(e) => {
                            if (isEditing) {
                              setEditingItem({ ...editingItem, isPopular: e.target.checked });
                            } else {
                              setNewItem({ ...newItem, isPopular: e.target.checked });
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">Populaire</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Image du plat</Label>
                    <ImageUpload
                      onImageUpload={handleImageUpload}
                      currentImage={currentItem.image}
                      className="mt-2"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-scanner-green-600 hover:bg-scanner-green-700">
                  {isEditing ? 'Mettre à jour le plat' : 'Ajouter le plat'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Edit Category Dialog */}
      <Dialog open={isEditCategoryDialogOpen} onOpenChange={setIsEditCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la catégorie</DialogTitle>
            <DialogDescription>Modifiez le nom de cette catégorie</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateCategory} className="space-y-4">
            <div>
              <Label htmlFor="editCategoryName">Nom de la catégorie</Label>
              <Input
                id="editCategoryName"
                value={editingCategory?.name || ''}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                placeholder="Entrées, Plats, Desserts..."
                required
              />
            </div>
            <Button type="submit" className="w-full bg-scanner-green-600 hover:bg-scanner-green-700">
              Modifier la catégorie
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="bg-scanner-green-50 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-scanner-green-800">{category.name}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
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
                  {category.items.map((item, index) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                {item.name}
                                {item.isPopular && (
                                  <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                                    ⭐ Populaire
                                  </Badge>
                                )}
                                {item.isVegetarian && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                    🌱 Végétarien
                                  </Badge>
                                )}
                              </h4>
                              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                              {item.allergens && item.allergens.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {item.allergens.map(allergen => (
                                    <Badge key={allergen} variant="outline" className="text-xs text-orange-600 border-orange-200">
                                      ⚠️ {allergen}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                              <Badge variant="secondary" className="text-lg font-bold">
                                {item.price}€
                              </Badge>
                              <div className="flex gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => moveItem(category.id, item.id, 'up')}
                                  disabled={index === 0}
                                >
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => moveItem(category.id, item.id, 'down')}
                                  disabled={index === category.items.length - 1}
                                >
                                  <ArrowDown className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDuplicateItem(item, category.id)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditItem(item, category.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleDeleteItem(category.id, item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
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
