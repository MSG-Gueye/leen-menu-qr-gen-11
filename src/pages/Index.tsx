
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { QrCode, Menu, Users, Smartphone, ArrowDown, ArrowUp } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Menu className="h-8 w-8 text-scanner-green-600" />,
      title: "Gestion de menus",
      description: "Créez et modifiez vos menus numériques facilement avec notre interface intuitive"
    },
    {
      icon: <QrCode className="h-8 w-8 text-scanner-green-600" />,
      title: "QR Codes automatiques",
      description: "Générez automatiquement vos QR codes et téléchargez-les aux formats PNG/SVG"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-scanner-green-600" />,
      title: "Expérience mobile",
      description: "Vos menus s'adaptent parfaitement à tous les écrans pour une expérience optimale"
    },
    {
      icon: <Users className="h-8 w-8 text-scanner-green-600" />,
      title: "Multi-restaurants",
      description: "Gérez plusieurs établissements depuis une seule interface centralisée"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-scanner-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <QrCode className="h-8 w-8 text-scanner-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Scanner-Leen</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={() => navigate('/menu/demo')}
            >
              Voir une démo
            </Button>
            <Button 
              onClick={() => navigate('/admin')}
              className="bg-scanner-green-600 hover:bg-scanner-green-700"
            >
              Espace restaurateur
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Digitalisez vos menus,
              <span className="text-scanner-green-600 block">simplifiez votre service</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Scanner-Leen vous permet de créer des menus numériques professionnels, 
              de générer vos QR codes et d'offrir une expérience moderne à vos clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/admin')}
                className="bg-scanner-green-600 hover:bg-scanner-green-700 text-lg px-8 py-4"
              >
                Commencer gratuitement
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/menu/demo')}
                className="text-lg px-8 py-4 border-scanner-green-600 text-scanner-green-600 hover:bg-scanner-green-50"
              >
                Voir une démo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une solution complète pour moderniser votre restaurant et améliorer l'expérience client
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-scanner-green-50 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-scanner-green-600">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Prêt à moderniser votre restaurant ?
          </h3>
          <p className="text-xl text-scanner-green-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les centaines de restaurants qui ont déjà adopté Scanner-Leen
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/admin')}
            className="bg-white text-scanner-green-600 hover:bg-gray-100 text-lg px-8 py-4"
          >
            Créer mon premier menu
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <QrCode className="h-6 w-6 text-scanner-green-400" />
              <span className="text-xl font-bold text-white">Scanner-Leen</span>
            </div>
            <div className="text-gray-400">
              © 2024 Scanner-Leen. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
