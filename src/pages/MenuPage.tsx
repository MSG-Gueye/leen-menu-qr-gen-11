
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode } from 'lucide-react';

const MenuPage = () => {
  const { restaurantId } = useParams();

  // Mock data pour la démo
  const restaurant = {
    name: "Le Petit Bistro",
    description: "Cuisine française traditionnelle dans un cadre chaleureux",
    address: "123 Rue de la Paix, 75001 Paris",
    phone: "01 42 33 44 55"
  };

  const menuCategories = [
    {
      id: 1,
      name: "Entrées",
      items: [
        {
          id: 1,
          name: "Salade de chèvre chaud",
          description: "Salade verte, crottin de chèvre grillé, noix et miel",
          price: "12.50"
        },
        {
          id: 2,
          name: "Soupe à l'oignon",
          description: "Soupe traditionnelle gratinée au fromage",
          price: "9.80"
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
          description: "Mijoté de bœuf aux carottes et champignons, accompagné de pommes de terre",
          price: "18.90"
        },
        {
          id: 4,
          name: "Saumon grillé",
          description: "Filet de saumon grillé, légumes de saison et riz pilaf",
          price: "16.50"
        }
      ]
    },
    {
      id: 3,
      name: "Desserts",
      items: [
        {
          id: 5,
          name: "Tarte Tatin",
          description: "Tarte aux pommes caramélisées, servie avec une boule de glace vanille",
          price: "8.50"
        },
        {
          id: 6,
          name: "Mousse au chocolat",
          description: "Mousse artisanale au chocolat noir 70%",
          price: "7.20"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-scanner-green-50 to-white">
      {/* Header du restaurant */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <QrCode className="h-8 w-8 text-scanner-green-600 mr-2" />
              <span className="text-sm text-gray-500">Menu numérique</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{restaurant.description}</p>
            <p className="text-sm text-gray-500">{restaurant.address}</p>
            <p className="text-sm text-gray-500">{restaurant.phone}</p>
          </div>
        </div>
      </header>

      {/* Menu */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {menuCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="bg-scanner-green-600 text-white">
                <CardTitle className="text-2xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {category.items.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`p-6 ${index !== category.items.length - 1 ? 'border-b' : ''} hover:bg-gray-50 transition-colors`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                      </div>
                      <div className="ml-4">
                        <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                          {item.price}€
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer du menu */}
        <div className="text-center mt-12 py-8 border-t">
          <p className="text-gray-500 mb-2">Menu généré par</p>
          <div className="flex justify-center items-center">
            <QrCode className="h-5 w-5 text-scanner-green-600 mr-2" />
            <span className="font-bold text-scanner-green-600">Scanner-Leen</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MenuPage;
