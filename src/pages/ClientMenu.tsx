import React from 'react';
import { useParams } from 'react-router-dom';
import ClientMenuManager from '@/components/ClientMenuManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClientMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulation des données entreprise (à remplacer par API)
  const businessData = {
    name: "Restaurant Le Petit Bistro",
    package: "Premium",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://menu.kaay-scanner.sn/1"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">{businessData.name}</h1>
                <p className="text-sm text-muted-foreground">
                  Package {businessData.package} - Gestion du menu
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <QrCode className="h-4 w-4 mr-2" />
                Voir QR Code
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <ClientMenuManager />
      </div>
    </div>
  );
};

export default ClientMenu;