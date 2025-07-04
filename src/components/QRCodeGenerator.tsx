
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download, Copy, Eye, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useBusinesses } from '@/hooks/useBusinesses';

interface QRCodeGeneratorProps {
  restaurantId: number;
  restaurantName: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ restaurantId, restaurantName }) => {
  const { generatePaymentQRCode } = useBusinesses();
  const [qrSettings, setQrSettings] = useState({
    size: '256',
    format: 'png',
    backgroundColor: '#ffffff',
    foregroundColor: '#000000'
  });

  const menuUrl = `${window.location.origin}/menu/${restaurantId}`;
  const paymentUrl = `${window.location.origin}/paiement-public?business=${restaurantId}`;
  
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSettings.size}x${qrSettings.size}&data=${encodeURIComponent(menuUrl)}&bgcolor=${qrSettings.backgroundColor.replace('#', '')}&color=${qrSettings.foregroundColor.replace('#', '')}`;
  const paymentQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSettings.size}x${qrSettings.size}&data=${encodeURIComponent(paymentUrl)}&bgcolor=${qrSettings.backgroundColor.replace('#', '')}&color=${qrSettings.foregroundColor.replace('#', '')}`;

  const handleDownload = (url: string, type: 'menu' | 'payment') => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `qr-code-${type}-${restaurantName.toLowerCase().replace(/\s+/g, '-')}.${qrSettings.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`QR Code ${type === 'menu' ? 'menu' : 'paiement'} téléchargé avec succès !`);
  };

  const handleCopyUrl = (url: string, type: 'menu' | 'payment') => {
    navigator.clipboard.writeText(url);
    toast.success(`URL ${type === 'menu' ? 'du menu' : 'de paiement'} copiée dans le presse-papiers`);
  };

  const handlePreview = (url: string) => {
    window.open(url, '_blank');
  };

  const handleGeneratePaymentQR = () => {
    generatePaymentQRCode(restaurantId);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres des QR Codes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="size">Taille</Label>
              <select
                id="size"
                value={qrSettings.size}
                onChange={(e) => setQrSettings({ ...qrSettings, size: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="128">128x128</option>
                <option value="256">256x256</option>
                <option value="512">512x512</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="bg-color">Couleur de fond</Label>
              <Input
                id="bg-color"
                type="color"
                value={qrSettings.backgroundColor}
                onChange={(e) => setQrSettings({ ...qrSettings, backgroundColor: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="fg-color">Couleur du code</Label>
              <Input
                id="fg-color"
                type="color"
                value={qrSettings.foregroundColor}
                onChange={(e) => setQrSettings({ ...qrSettings, foregroundColor: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* QR Code Menu */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code Menu
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-white p-4 rounded-lg border inline-block">
                <img
                  src={qrCodeUrl}
                  alt="QR Code Menu"
                  className="mx-auto"
                  style={{ maxWidth: '150px', maxHeight: '150px' }}
                />
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button onClick={() => handlePreview(menuUrl)} variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Tester
                </Button>
                <Button onClick={() => handleCopyUrl(menuUrl, 'menu')} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" />
                  Copier
                </Button>
                <Button onClick={() => handleDownload(qrCodeUrl, 'menu')} size="sm" className="bg-scanner-green-600 hover:bg-scanner-green-700">
                  <Download className="h-4 w-4 mr-1" />
                  Télécharger
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Paiement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                QR Code Paiement
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-white p-4 rounded-lg border inline-block">
                <img
                  src={paymentQrCodeUrl}
                  alt="QR Code Paiement"
                  className="mx-auto"
                  style={{ maxWidth: '150px', maxHeight: '150px' }}
                />
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button onClick={() => handlePreview(paymentUrl)} variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Tester
                </Button>
                <Button onClick={() => handleCopyUrl(paymentUrl, 'payment')} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" />
                  Copier
                </Button>
                <Button onClick={() => handleDownload(paymentQrCodeUrl, 'payment')} size="sm" className="bg-scanner-red hover:bg-scanner-red/90">
                  <Download className="h-4 w-4 mr-1" />
                  Télécharger
                </Button>
              </div>
              
              <Button onClick={handleGeneratePaymentQR} variant="outline" className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Générer QR Code de paiement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
