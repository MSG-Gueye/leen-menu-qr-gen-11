import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { subscriptionPackages } from "@/hooks/useBusinesses";

const Pricing = () => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const packages = [
    {
      ...subscriptionPackages.basic,
      recommended: false,
      description: "Parfait pour débuter avec les menus numériques"
    },
    {
      ...subscriptionPackages.premium,
      recommended: true,
      description: "Le choix optimal pour la plupart des restaurants"
    },
    {
      ...subscriptionPackages.enterprise,
      recommended: false,
      description: "Solution complète pour les grandes chaînes"
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
              <li><a href="/features" className="text-gray-600 hover:text-scanner-green-600">Fonctionnalités</a></li>
              <li><a href="/pricing" className="text-scanner-green-600 font-semibold">Tarifs</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-scanner-green-600">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Tarifs
            <span className="text-scanner-green-600 block">Transparents</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choisissez le package qui correspond à vos besoins. 
            Tous nos plans incluent un support client dédié et une garantie satisfait ou remboursé.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <Card key={index} className={`relative shadow-lg hover:shadow-xl transition-all duration-300 ${pkg.recommended ? 'border-2 border-scanner-green-600 scale-105' : 'border-0'}`}>
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-scanner-green-600 text-white px-4 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Recommandé
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {pkg.name}
                </CardTitle>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Frais d'installation: {formatPrice(pkg.setupFee)}</div>
                  <span className="text-4xl font-bold text-scanner-green-600">
                    {formatPrice(pkg.price)}
                  </span>
                  <span className="text-gray-600 ml-2">/mois</span>
                </div>
                <CardDescription className="text-gray-600">
                  {pkg.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <Check className="h-4 w-4 text-scanner-green-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 ${pkg.recommended 
                    ? 'bg-scanner-green-600 hover:bg-scanner-green-700 text-white' 
                    : 'border border-scanner-green-600 text-scanner-green-600 hover:bg-scanner-green-600 hover:text-white'
                  }`}
                  variant={pkg.recommended ? "default" : "outline"}
                  onClick={() => navigate('/subscription-request', { state: { selectedPackage: pkg } })}
                >
                  Choisir ce plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Questions Fréquentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Puis-je changer de plan à tout moment ?</h3>
              <p className="text-gray-600">Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Y a-t-il une période d'engagement ?</h3>
              <p className="text-gray-600">Non, tous nos plans sont sans engagement. Vous pouvez annuler à tout moment.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Le support est-il inclus ?</h3>
              <p className="text-gray-600">Oui, tous nos plans incluent un support client. Les plans Premium et Enterprise bénéficient d'un support prioritaire.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Puis-je tester avant de m'abonner ?</h3>
              <p className="text-gray-600">Oui, nous offrons une démonstration gratuite de 14 jours sans engagement.</p>
            </div>
          </div>
        </section>

        <section className="bg-scanner-green-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Besoin d'un plan personnalisé ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contactez-nous pour discuter de vos besoins spécifiques
          </p>
          <Button 
            size="lg" 
            className="bg-white text-scanner-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            onClick={() => navigate('/contact')}
          >
            Nous contacter
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Pricing;