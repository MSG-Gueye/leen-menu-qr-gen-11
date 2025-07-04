
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, XCircle, CreditCard, QrCode, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useBusinesses, subscriptionPackages } from '@/hooks/useBusinesses';

const PublicPaymentPage = () => {
  const navigate = useNavigate();
  const { businesses, updateBusiness } = useBusinesses();
  const [selectedBusiness, setSelectedBusiness] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed' | null>(null);

  const business = businesses.find(b => b.id === Number(selectedBusiness));
  const packageInfo = business?.subscriptionPackage ? subscriptionPackages[business.subscriptionPackage] : null;

  const paymentMethods = [
    { id: 'wave', name: 'Wave', icon: '📱' },
    { id: 'orange-money', name: 'Orange Money', icon: '🟠' },
    { id: 'paydunya', name: 'Paydunya', icon: '💳' }
  ];

  const handlePayment = async () => {
    if (!business || !paymentMethod || !packageInfo) return;

    setLoading(true);
    setPaymentStatus('pending');

    try {
      // Simulation du paiement selon la méthode choisie
      console.log(`Paiement de ${packageInfo.price} FCFA via ${paymentMethod} pour ${business.name}`);
      
      // Simulation d'une réponse de paiement
      setTimeout(() => {
        const isSuccess = Math.random() > 0.2; // 80% de chance de succès
        
        if (isSuccess) {
          setPaymentStatus('success');
          updateBusiness(business.id, { 
            status: 'Actif',
            lastPayment: new Date().toISOString().split('T')[0],
            paymentStatus: 'paid'
          });
          toast.success("Paiement effectué avec succès !");
        } else {
          setPaymentStatus('failed');
          toast.error("Échec du paiement. Veuillez réessayer.");
        }
        setLoading(false);
      }, 3000);

    } catch (error) {
      console.error("Erreur de paiement:", error);
      setPaymentStatus('failed');
      toast.error("Erreur lors du traitement du paiement");
      setLoading(false);
    }
  };

  const canProceed = selectedBusiness && paymentMethod && business && packageInfo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-scanner-light via-white to-gray-50">
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
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-scanner-dark mb-4">
              Paiement d'abonnement
            </h2>
            <p className="text-scanner-gray">
              Effectuez le paiement de votre abonnement mensuel Scanner-Leen
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-6 w-6" />
                Détails du paiement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sélection du restaurant */}
              <div className="space-y-2">
                <Label htmlFor="restaurant">Nom du restaurant</Label>
                <Select value={selectedBusiness} onValueChange={setSelectedBusiness}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre restaurant" />
                  </SelectTrigger>
                  <SelectContent>
                    {businesses.map((business) => (
                      <SelectItem key={business.id} value={business.id.toString()}>
                        {business.name} - {business.businessType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Informations du package si restaurant sélectionné */}
              {business && packageInfo && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Package sélectionné</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{packageInfo.name}</span>
                    <Badge variant="secondary">{packageInfo.price.toLocaleString()} FCFA/mois</Badge>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {packageInfo.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sélection du mode de paiement */}
              <div className="space-y-2">
                <Label>Mode de paiement</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center gap-2">
                        <span className="text-lg">{method.icon}</span>
                        {method.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Bouton de paiement */}
              {paymentStatus === null && (
                <Button 
                  onClick={handlePayment}
                  disabled={loading || !canProceed}
                  className="w-full bg-scanner-red hover:bg-scanner-red/90"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payer {packageInfo?.price.toLocaleString() || '0'} FCFA
                    </>
                  )}
                </Button>
              )}

              {/* États du paiement */}
              {paymentStatus === 'pending' && (
                <div className="text-center py-8">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-scanner-red" />
                  <p className="text-lg font-medium">Traitement du paiement...</p>
                  <p className="text-gray-600">Veuillez patienter, ne fermez pas cette page.</p>
                </div>
              )}

              {paymentStatus === 'success' && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <p className="text-lg font-medium text-green-600">Paiement réussi !</p>
                  <p className="text-gray-600 mb-4">Votre abonnement a été renouvelé avec succès.</p>
                  <Button onClick={() => navigate('/')} className="bg-green-600 hover:bg-green-700">
                    Retour à l'accueil
                  </Button>
                </div>
              )}

              {paymentStatus === 'failed' && (
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <p className="text-lg font-medium text-red-600">Paiement échoué</p>
                  <p className="text-gray-600 mb-4">Une erreur s'est produite lors du traitement du paiement.</p>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => {setPaymentStatus(null); setLoading(false);}}
                      className="bg-scanner-red hover:bg-scanner-red/90 w-full"
                    >
                      Réessayer le paiement
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                      Retour à l'accueil
                    </Button>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Le paiement est sécurisé. 
                  Vos informations de paiement sont protégées et cryptées.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicPaymentPage;
