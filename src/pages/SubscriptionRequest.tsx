import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Check, Building2, Users, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { subscriptionPackages } from "@/hooks/useBusinesses";
import { useBusinessTypes } from "@/hooks/useBusinessTypes";

const SubscriptionRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { businessTypes } = useBusinessTypes();
  
  const selectedPackage = location.state?.selectedPackage;
  
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    businessType: '',
    selectedPackage: selectedPackage?.name.toLowerCase().replace(' ', '') || 'basic',
    specialRequests: '',
    preferredStartDate: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi de la demande
    toast.success("Votre demande d'abonnement a été envoyée avec succès ! Nous vous contacterons sous 24h.");
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getSelectedPackageInfo = () => {
    switch(formData.selectedPackage) {
      case 'premium':
        return subscriptionPackages.premium;
      case 'enterprise':
        return subscriptionPackages.enterprise;
      default:
        return subscriptionPackages.basic;
    }
  };

  const packageInfo = getSelectedPackageInfo();

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
              <li><a href="/pricing" className="text-gray-600 hover:text-scanner-green-600">Tarifs</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-scanner-green-600">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Demande
            <span className="text-scanner-green-600 block">d'Abonnement</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Remplissez le formulaire ci-dessous pour commencer votre aventure avec Kaay-Scanner. 
            Notre équipe vous contactera pour finaliser votre abonnement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-scanner-green-600" />
                  Informations de votre établissement
                </CardTitle>
                <CardDescription>
                  Veuillez fournir les détails de votre restaurant ou établissement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="restaurantName">Nom du restaurant *</Label>
                      <Input
                        id="restaurantName"
                        name="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        required
                        className="mt-1"
                        placeholder="Ex: Le Petit Bistro"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessType">Type d'établissement *</Label>
                      <Select value={formData.businessType} onValueChange={(value) => handleSelectChange('businessType', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Sélectionnez le type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.icon} {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Adresse complète *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="Ex: 123 Avenue de la Paix, Dakar"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ownerName">Nom du propriétaire *</Label>
                      <Input
                        id="ownerName"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                        className="mt-1"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1"
                        placeholder="+221 77 123 45 67"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="selectedPackage">Package choisi *</Label>
                      <Select value={formData.selectedPackage} onValueChange={(value) => handleSelectChange('selectedPackage', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Package Basic</SelectItem>
                          <SelectItem value="premium">Package Premium</SelectItem>
                          <SelectItem value="enterprise">Package Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="preferredStartDate">Date de début souhaitée</Label>
                      <Input
                        id="preferredStartDate"
                        name="preferredStartDate"
                        type="date"
                        value={formData.preferredStartDate}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Demandes spéciales ou questions</Label>
                    <Textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1"
                      placeholder="Décrivez vos besoins spécifiques ou posez vos questions..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-scanner-green-600 hover:bg-scanner-green-700 py-3 text-lg"
                  >
                    Envoyer ma demande d'abonnement
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Résumé du package */}
          <div className="space-y-6">
            <Card className="shadow-lg border-2 border-scanner-green-600">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center justify-between">
                  {packageInfo.name}
                  <Badge className="bg-scanner-green-600">Sélectionné</Badge>
                </CardTitle>
                <div className="text-3xl font-bold text-scanner-green-600">
                  <div className="text-sm text-gray-500 mb-1">Frais d'installation: {formatPrice(packageInfo.setupFee)}</div>
                  {formatPrice(packageInfo.price)}
                  <span className="text-lg text-gray-600 font-normal">/mois</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {packageInfo.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className="h-4 w-4 text-scanner-green-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Prochaines étapes</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Réception de votre demande sous 1h</li>
                  <li>• Appel de notre équipe sous 24h</li>
                  <li>• Configuration de votre compte</li>
                  <li>• Formation personnalisée gratuite</li>
                  <li>• Lancement de vos QR codes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-green-50">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-scanner-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Questions ?</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Notre équipe est disponible pour vous aider
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-scanner-green-600 text-scanner-green-600 hover:bg-scanner-green-600 hover:text-white"
                  onClick={() => navigate('/contact')}
                >
                  Nous contacter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionRequest;