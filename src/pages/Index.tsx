import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { QrCode, Menu, Users, Smartphone, Zap, BarChart3, Shield, Palette, CreditCard } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Menu className="h-8 w-8 text-scanner-red" />,
      title: "Éditeur de menus intuitif", 
      description: "Créez et modifiez vos menus avec notre éditeur drag & drop révolutionnaire"
    },
    {
      icon: <QrCode className="h-8 w-8 text-scanner-red" />,
      title: "QR Codes intelligents",
      description: "Génération automatique avec statistiques de scan et personnalisation complète"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-scanner-red" />,
      title: "Experience mobile parfaite",
      description: "Interface responsive optimisée pour tous les appareils et mode hors-ligne"
    },
    {
      icon: <Users className="h-8 w-8 text-scanner-red" />,
      title: "Multi-restaurants",
      description: "Gérez plusieurs établissements depuis un seul tableau de bord centralisé"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-scanner-red" />,
      title: "Analytics avancées",
      description: "Suivez les performances avec heatmaps et statistiques de consultation"
    },
    {
      icon: <Zap className="h-8 w-8 text-scanner-red" />,
      title: "Mise à jour instantanée",
      description: "Vos modifications sont publiées automatiquement en temps réel"
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      restaurant: "Le Petit Bistro",
      text: "Scanner-Leen a révolutionné notre service. Nos clients adorent consulter le menu sur leur téléphone !",
      rating: 5
    },
    {
      name: "Jean Martin", 
      restaurant: "Brasserie Moderne",
      text: "Interface très intuitive, nous avons économisé des heures de travail et nos menus sont toujours à jour.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-scanner-light via-white to-gray-50">
      {/* Header avec effet glassmorphism */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-scanner-red to-scanner-blue rounded-xl">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-scanner-dark to-scanner-blue bg-clip-text text-transparent">
              Scanner-Leen
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={() => navigate('/menu/demo')}
              className="text-scanner-gray hover:text-scanner-dark transition-colors"
            >
              Voir une démo
            </Button>
            <Button 
              onClick={() => navigate('/paiement-public')}
              variant="outline"
              className="text-scanner-red border-scanner-red hover:bg-scanner-red hover:text-white transition-colors"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Faire un paiement
            </Button>
            <Button 
              onClick={() => navigate('/admin')}
              className="bg-gradient-to-r from-scanner-red to-pink-500 hover:from-scanner-red/90 hover:to-pink-500/90 text-white shadow-elegant transition-all duration-300 hover:scale-105"
            >
              Commencer gratuitement
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section avec animations */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-scanner-red/5 to-scanner-blue/5 blur-3xl"></div>
        <div className="container mx-auto text-center relative">
          <div className="animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-gray-200/50">
              <Zap className="h-4 w-4 text-scanner-red animate-bounce-gentle" />
              <span className="text-sm font-medium text-scanner-dark">Nouveau : Analytics en temps réel</span>
            </div>
            
            <h2 className="text-6xl font-bold text-scanner-dark mb-6 leading-tight">
              L'avenir des menus
              <span className="block text-transparent bg-gradient-to-r from-scanner-red via-pink-500 to-scanner-blue bg-clip-text">
                numériques
              </span>
            </h2>
            <p className="text-xl text-scanner-gray mb-12 max-w-3xl mx-auto leading-relaxed">
              Créez des expériences culinaires mémorables avec notre plateforme tout-en-un. 
              Menus intelligents, QR codes personnalisés et analytics puissantes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg"
                onClick={() => navigate('/admin')}
                className="bg-gradient-to-r from-scanner-red to-pink-500 hover:from-scanner-red/90 hover:to-pink-500/90 text-white text-lg px-8 py-4 shadow-elegant transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Zap className="h-5 w-5 mr-2" />
                Démarrer maintenant
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/menu/demo')}
                className="text-lg px-8 py-4 border-2 border-scanner-dark/20 text-scanner-dark hover:bg-scanner-dark hover:text-white transition-all duration-300"
              >
                <Menu className="h-5 w-5 mr-2" />
                Voir la démo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section avec grille moderne */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-4xl font-bold text-scanner-dark mb-6">
              Pourquoi choisir Scanner-Leen ?
            </h3>
            <p className="text-xl text-scanner-gray max-w-2xl mx-auto">
              Une suite complète d'outils conçus pour moderniser votre restaurant
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 border-0 shadow-soft bg-gradient-to-br from-white to-gray-50/50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-scanner-red/10 to-pink-50 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-scanner-dark">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base text-scanner-gray leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-scanner-light to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-scanner-dark mb-4">
              Ils nous font confiance
            </h3>
            <p className="text-xl text-scanner-gray">
              Découvrez ce que disent nos restaurateurs partenaires
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 shadow-elegant border-0 bg-white/80 backdrop-blur-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-400">⭐</div>
                  ))}
                </div>
                <p className="text-scanner-gray mb-6 text-lg italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-scanner-dark">{testimonial.name}</p>
                  <p className="text-scanner-red font-medium">{testimonial.restaurant}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section finale */}
      <section className="py-24 px-4 bg-gradient-to-r from-scanner-dark via-scanner-blue to-scanner-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-scanner-red/20 to-transparent"></div>
        <div className="container mx-auto text-center relative">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">
              Prêt à révolutionner votre restaurant ?
            </h3>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed">
              Rejoignez les centaines de restaurants qui ont déjà transformé leur expérience client avec Scanner-Leen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/admin')}
                className="bg-white text-scanner-dark hover:bg-gray-100 text-lg px-8 py-4 shadow-elegant transition-all duration-300 hover:scale-105"
              >
                <Shield className="h-5 w-5 mr-2" />
                Essai gratuit 30 jours
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-scanner-dark text-lg px-8 py-4 transition-all duration-300"
              >
                <Palette className="h-5 w-5 mr-2" />
                Personnaliser mon menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer moderne */}
      <footer className="py-16 px-4 bg-scanner-dark">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="p-2 bg-gradient-to-br from-scanner-red to-pink-500 rounded-xl">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Scanner-Leen</span>
            </div>
            <div className="flex space-x-8 text-gray-300">
              <a href="#" className="hover:text-white transition-colors">À propos</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">CGU</a>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Scanner-Leen. Tous droits réservés. Fait avec ❤️ en France.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
