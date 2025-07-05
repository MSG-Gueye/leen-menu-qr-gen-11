import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, QrCode, BarChart3, Smartphone, Globe, Shield, Zap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <QrCode className="h-12 w-12 text-scanner-green-600" />,
      title: "QR Codes Intelligents",
      description: "Générez des QR codes personnalisés pour vos menus et paiements. Mise à jour en temps réel.",
      benefits: ["QR codes haute résolution", "Personnalisation complète", "Mise à jour instantanée"]
    },
    {
      icon: <Smartphone className="h-12 w-12 text-scanner-green-600" />,
      title: "Interface Mobile Optimisée",
      description: "Une expérience utilisateur parfaite sur tous les appareils mobiles et tablettes.",
      benefits: ["Design responsive", "Navigation intuitive", "Chargement ultra-rapide"]
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-scanner-green-600" />,
      title: "Analytics Avancées",
      description: "Suivez les performances de vos menus avec des statistiques détaillées.",
      benefits: ["Statistiques en temps réel", "Rapports personnalisés", "Suivi des tendances"]
    },
    {
      icon: <Globe className="h-12 w-12 text-scanner-green-600" />,
      title: "Multi-langues",
      description: "Proposez vos menus dans plusieurs langues pour une clientèle internationale.",
      benefits: ["Support multilingue", "Traduction automatique", "Gestion centralisée"]
    },
    {
      icon: <Shield className="h-12 w-12 text-scanner-green-600" />,
      title: "Sécurité Maximale",
      description: "Vos données et celles de vos clients sont protégées par un chiffrement de niveau bancaire.",
      benefits: ["Chiffrement SSL", "Sauvegarde automatique", "Conformité RGPD"]
    },
    {
      icon: <Zap className="h-12 w-12 text-scanner-green-600" />,
      title: "Mise à jour Instantanée",
      description: "Modifiez vos menus et prix en temps réel, visibles immédiatement par vos clients.",
      benefits: ["Synchronisation temps réel", "Pas de délai", "Interface simple"]
    },
    {
      icon: <Users className="h-12 w-12 text-scanner-green-600" />,
      title: "Gestion Multi-établissements",
      description: "Gérez plusieurs restaurants depuis une seule interface centralisée.",
      benefits: ["Vue d'ensemble globale", "Gestion individualisée", "Statistiques comparatives"]
    },
    {
      icon: <Building2 className="h-12 w-12 text-scanner-green-600" />,
      title: "Personnalisation Complète",
      description: "Adaptez l'apparence de vos menus à l'identité visuelle de votre établissement.",
      benefits: ["Thèmes personnalisés", "Logo et couleurs", "Mise en page flexible"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-scanner-green-50 to-white">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-scanner-green-600">
            Kaay-Scanner
          </a>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="text-gray-600 hover:text-scanner-green-600">Accueil</a></li>
              <li><a href="/features" className="text-scanner-green-600 font-semibold">Fonctionnalités</a></li>
              <li><a href="/pricing" className="text-gray-600 hover:text-scanner-green-600">Tarifs</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-scanner-green-600">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Fonctionnalités
            <span className="text-scanner-green-600 block">Complètes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Découvrez toutes les fonctionnalités qui font de Kaay-Scanner la solution idéale 
            pour digitaliser vos menus et optimiser votre business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 text-center">
                  {feature.description}
                </CardDescription>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-scanner-green-600 rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="bg-scanner-green-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à transformer votre restaurant ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des centaines d'établissements qui font confiance à Kaay-Scanner
          </p>
          <Button 
            size="lg" 
            className="bg-white text-scanner-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            onClick={() => navigate('/subscription-request')}
          >
            Demander un devis gratuit
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Features;