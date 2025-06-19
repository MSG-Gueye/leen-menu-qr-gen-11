
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, Clock, MapPin, Phone, Mail, Star, Search, Filter, Heart, Share2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const MenuPage = () => {
  const { restaurantId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  // Mock data avec des images placeholder fonctionnelles
  const restaurant = {
    name: "Le Petit Bistro Parisien",
    description: "Cuisine française authentique dans un cadre chaleureux et convivial depuis 1985",
    address: "123 Rue de la Paix, 75001 Paris",
    phone: "+33 1 42 33 44 55",
    email: "contact@petitbistro.fr",
    website: "www.petitbistro.fr",
    logo: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=120&h=120&fit=crop&crop=center",
    cover: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=300&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 247,
    priceRange: "€€€",
    hours: {
      lunch: "12h00 - 14h30",
      dinner: "19h00 - 22h30",
      closed: "Fermé le dimanche"
    },
    ambiance: ["Romantique", "Familial", "Business"]
  };

  const menuCategories = [
    {
      id: 1,
      name: "Entrées",
      icon: "🥗",
      description: "Délicieuses entrées pour commencer votre repas",
      items: [
        {
          id: 1,
          name: "Foie gras de canard maison",
          description: "Foie gras de canard mi-cuit, confiture de figues, pain brioché toasté",
          price: "24.50",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop&crop=center",
          allergens: ["Gluten"],
          isPopular: true,
          isVegetarian: false,
          prepTime: "5 min"
        },
        {
          id: 2,
          name: "Salade de chèvre chaud aux noix",
          description: "Salade de mesclun, crottin de chèvre grillé, noix fraîches, miel d'acacia",
          price: "16.80",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop&crop=center",
          allergens: ["Fruits à coque", "Lait"],
          isPopular: false,
          isVegetarian: true,
          prepTime: "8 min"
        }
      ]
    },
    {
      id: 2,
      name: "Plats principaux",
      icon: "🍽️",
      description: "Nos spécialités concoctées avec amour",
      items: [
        {
          id: 3,
          name: "Bœuf bourguignon traditionnel",
          description: "Mijoté de bœuf aux carottes et champignons de Paris, accompagné de pommes de terre grenaille",
          price: "28.90",
          image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop&crop=center",
          allergens: ["Sulfites"],
          isPopular: true,
          isVegetarian: false,
          prepTime: "25 min"
        },
        {
          id: 4,
          name: "Saumon grillé à l'aneth",
          description: "Filet de saumon grillé, sauce à l'aneth, légumes de saison et riz basmati",
          price: "26.50",
          image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop&crop=center",
          allergens: ["Poisson"],
          isPopular: false,
          isVegetarian: false,
          prepTime: "20 min"
        }
      ]
    },
    {
      id: 3,
      name: "Desserts",
      icon: "🍰",
      description: "Pour finir en beauté",
      items: [
        {
          id: 5,
          name: "Tarte Tatin maison",
          description: "Tarte aux pommes caramélisées, servie tiède avec une boule de glace vanille bourbon",
          price: "12.50",
          image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop&crop=center",
          allergens: ["Gluten", "Lait", "Œufs"],
          isPopular: true,
          isVegetarian: true,
          prepTime: "10 min"
        }
      ]
    },
    {
      id: 4,
      name: "Boissons",
      icon: "🍷",
      description: "Sélection de vins et boissons",
      items: [
        {
          id: 6,
          name: "Côtes du Rhône Rouge 2020",
          description: "Vin rouge fruité aux arômes de fruits rouges, parfait avec nos viandes",
          price: "28.00",
          image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=300&h=200&fit=crop&crop=center",
          allergens: ["Sulfites"],
          isPopular: false,
          isVegetarian: true,
          prepTime: "Immédiat"
        }
      ]
    }
  ];

  const filteredItems = menuCategories.flatMap(category => 
    category.items.filter(item => 
      (selectedCategory === 'all' || category.id.toString() === selectedCategory) &&
      (searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ).map(item => ({ ...item, categoryName: category.name, categoryIcon: category.icon }))
  );

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
    toast.success(favorites.includes(itemId) ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  const shareMenu = () => {
    if (navigator.share) {
      navigator.share({
        title: restaurant.name,
        text: `Découvrez le menu de ${restaurant.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papiers");
    }
  };

  const submitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportDialogOpen(false);
    toast.success("Signalement envoyé, merci pour votre retour !");
  };

  useEffect(() => {
    // Animation d'apparition au scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.menu-item').forEach(item => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [filteredItems]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
      {/* Header avec image de couverture */}
      <header className="relative overflow-hidden">
        <div 
          className="h-64 bg-gradient-to-r from-scanner-dark to-scanner-blue relative bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.cover})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="outline" 
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
            <Button
              variant="outline"
              size="sm" 
              onClick={shareMenu}
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-elegant p-8 border border-gray-200/50`}>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <img
                src={restaurant.logo}
                alt={`Logo ${restaurant.name}`}
                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {restaurant.name}
                  </h1>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{restaurant.rating}</span>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>({restaurant.reviewCount} avis)</span>
                  </div>
                </div>
                
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 text-lg`}>
                  {restaurant.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <MapPin className="h-4 w-4 text-scanner-red" />
                    <span>{restaurant.address}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Phone className="h-4 w-4 text-scanner-red" />
                    <span>{restaurant.phone}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Clock className="h-4 w-4 text-scanner-red" />
                    <span>{restaurant.hours.lunch} • {restaurant.hours.dinner}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Mail className="h-4 w-4 text-scanner-red" />
                    <span>{restaurant.email}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {restaurant.ambiance.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-scanner-red/10 text-scanner-red">
                      {tag}
                    </Badge>
                  ))}
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {restaurant.priceRange}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Barre de recherche et filtres */}
      <div className="container mx-auto px-4 py-8">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-soft p-6 mb-8`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Rechercher un plat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="whitespace-nowrap"
              >
                <Filter className="h-4 w-4 mr-2" />
                Tout voir
              </Button>
              {menuCategories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id.toString() ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id.toString())}
                  className="whitespace-nowrap"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items avec design moderne */}
        <div className="space-y-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-500">Aucun plat trouvé pour votre recherche</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredItems.map((item, index) => (
                <Card 
                  key={item.id} 
                  className={`menu-item opacity-0 hover:shadow-elegant transition-all duration-300 overflow-hidden border-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-soft`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative">
                      <div className="h-48 md:h-full relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop&crop=center`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        {item.isPopular && (
                          <Badge className="absolute top-3 left-3 bg-scanner-red text-white">
                            ⭐ Populaire
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(item.id)}
                          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                        >
                          <Heart className={`h-4 w-4 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                        </Button>
                      </div>
                    </div>
                    
                    <CardContent className="md:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <CardTitle className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                              {item.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {item.categoryIcon} {item.categoryName}
                              </Badge>
                              {item.isVegetarian && (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                  🌱 Végétarien
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-scanner-red mb-1">
                              {item.price}€
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.prepTime}
                            </div>
                          </div>
                        </div>
                        
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed`}>
                          {item.description}
                        </p>
                        
                        {item.allergens.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            <span className="text-xs text-gray-500 mr-2">Allergènes:</span>
                            {item.allergens.map(allergen => (
                              <Badge key={allergen} variant="outline" className="text-xs text-orange-600 border-orange-200">
                                ⚠️ {allergen}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer avec signalement */}
        <div className={`text-center mt-16 py-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="mb-4">
            <p className="text-gray-500 mb-2">Menu généré par</p>
            <div className="flex justify-center items-center space-x-2">
              <QrCode className="h-6 w-6 text-scanner-red" />
              <span className="font-bold text-scanner-red text-lg">Scanner-Leen</span>
            </div>
          </div>
          
          <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-gray-500 hover:text-gray-700">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Signaler une erreur
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Signaler un problème</DialogTitle>
                <DialogDescription>
                  Aidez-nous à améliorer ce menu en nous signalant toute erreur ou problème
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={submitReport} className="space-y-4">
                <Input placeholder="Votre email (optionnel)" type="email" />
                <Textarea 
                  placeholder="Décrivez le problème rencontré..."
                  className="min-h-[100px]"
                />
                <Button type="submit" className="w-full">
                  Envoyer le signalement
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
