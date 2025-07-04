
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useBusinesses } from '@/hooks/useBusinesses';

const PaymentPage = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { businesses, updateBusiness } = useBusinesses();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed' | null>(null);

  const business = businesses.find(b => b.id === Number(businessId));
  const monthlyFee = 15000; // 15,000 FCFA par mois

  useEffect(() => {
    if (!business) {
      toast.error("Entreprise non trouvée");
      navigate('/admin');
    }
  }, [business, navigate]);

  const initializePaydunya = () => {
    // Configuration Paydunya
    const paydunyaConfig = {
      master_key: "YOUR_PAYDUNYA_MASTER_KEY", // À remplacer par la vraie clé
      private_key: "YOUR_PAYDUNYA_PRIVATE_KEY", // À remplacer par la vraie clé
      public_key: "YOUR_PAYDUNYA_PUBLIC_KEY", // À remplacer par la vraie clé
      token: "YOUR_PAYDUNYA_TOKEN", // À remplacer par le vrai token
      mode: "test" // "live" pour la production
    };

    return paydunyaConfig;
  };

  const handlePayment = async () => {
    if (!business) return;

    setLoading(true);
    setPaymentStatus('pending');

    try {
      // Simulation de l'intégration Paydunya
      const paydunyaConfig = initializePaydunya();
      
      // Données de la facture
      const invoiceData = {
        invoice: {
          total_amount: monthlyFee,
          description: `Abonnement mensuel - ${business.name}`,
          return_url: `${window.location.origin}/payment/${businessId}/success`,
          cancel_url: `${window.location.origin}/payment/${businessId}/cancel`
        },
        store: {
          name: "QR Menu Manager",
          tagline: "Gestion de menus numériques"
        },
        actions: {
          cancel_url: `${window.location.origin}/payment/${businessId}/cancel`,
          return_url: `${window.location.origin}/payment/${businessId}/success`
        }
      };

      // Simulation de l'appel API Paydunya
      console.log("Configuration Paydunya:", paydunyaConfig);
      console.log("Données de paiement:", invoiceData);

      // Simulation d'une réponse de paiement
      setTimeout(() => {
        const isSuccess = Math.random() > 0.3; // 70% de chance de succès pour la démo
        
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

  const handleReturnToAdmin = () => {
    navigate('/admin');
  };

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={handleReturnToAdmin}>
            ← Retour à l'administration
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-6 w-6" />
              Paiement de l'abonnement mensuel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Détails de l'entreprise</h3>
              <p><strong>Nom:</strong> {business.name}</p>
              <p><strong>Email:</strong> {business.email}</p>
              <p><strong>Statut actuel:</strong> 
                <Badge 
                  variant={business.status === 'Actif' ? 'default' : 'destructive'}
                  className="ml-2"
                >
                  {business.status}
                </Badge>
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Détails du paiement</h3>
              <div className="flex justify-between items-center">
                <span>Abonnement mensuel</span>
                <span className="font-bold text-lg">{monthlyFee.toLocaleString()} FCFA</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Période: {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </p>
            </div>

            {paymentStatus === null && (
              <Button 
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
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
                    Payer {monthlyFee.toLocaleString()} FCFA
                  </>
                )}
              </Button>
            )}

            {paymentStatus === 'pending' && (
              <div className="text-center py-8">
                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-lg font-medium">Traitement du paiement...</p>
                <p className="text-gray-600">Veuillez patienter, ne fermez pas cette page.</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <p className="text-lg font-medium text-green-600">Paiement réussi !</p>
                <p className="text-gray-600 mb-4">Votre abonnement a été renouvelé avec succès.</p>
                <Button onClick={handleReturnToAdmin} className="bg-green-600 hover:bg-green-700">
                  Retour à l'administration
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
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Réessayer le paiement
                  </Button>
                  <Button variant="outline" onClick={handleReturnToAdmin} className="w-full">
                    Retour à l'administration
                  </Button>
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Le paiement est sécurisé par Paydunya. 
                Vos informations de paiement sont protégées et cryptées.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
