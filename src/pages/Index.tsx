import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, BarChart3, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Building2 className="h-8 w-8 text-scanner-green-600" />,
      title: "Gestion d'entreprises",
      description: "Gérez facilement tous vos établissements clients depuis une interface centralisée"
    },
    {
      icon: <QrCode className="h-8 w-8 text-scanner-green-600" />,
      title: "QR Codes personnalisés",
      description: "Générez des QR codes pour les menus et les paiements de chaque établissement"
    },
    {
      icon: <Users className="h-8 w-8 text-scanner-green-600" />,
      title: "Suivi des clients",
      description: "Suivez l'activité et les statistiques de chaque établissement"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-scanner-green-600" />,
      title: "Analyses détaillées",
      description: "Accédez à des rapports complets sur les performances de vos clients"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-scanner-green-50 to-white">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-scanner-green-600">
            QR Menu Pro
          </a>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="/" className="text-gray-600 hover:text-scanner-green-600">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/features" className="text-gray-600 hover:text-scanner-green-600">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-600 hover:text-scanner-green-600">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-scanner-green-600">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Plateforme de Gestion
            <span className="text-scanner-green-600 block">QR Menu Pro</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            La solution complète pour gérer vos établissements clients, générer des QR codes 
            personnalisés et suivre leurs performances en temps réel.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-scanner-green-600 hover:bg-scanner-green-700 text-white px-8 py-3 text-lg"
              onClick={() => navigate('/admin')}
            >
              Accéder au tableau de bord
            </Button>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-3">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Prêt à digitaliser vos menus ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Rejoignez notre plateforme et offrez à vos clients une expérience unique avec des menus QR codes interactifs.
          </p>
          <Button 
            size="lg" 
            className="bg-scanner-green-600 hover:bg-scanner-green-700 text-white px-8 py-3 text-lg"
            onClick={() => navigate('/admin')}
          >
            Commencer dès maintenant
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Index;
