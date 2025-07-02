
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download, Copy, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeGeneratorProps {
  restaurantId: number;
  restaurantName: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ restaurantId, restaurantName }) => {
  const [qrSettings, setQrSettings] = useState({
    size: '256',
    format: 'png',
    backgroundColor: '#ffffff',
    foregroundColor: '#000000'
  });

  const menuUrl = `${window.location.origin}/menu/${restaurantId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSettings.size}x${qrSettings.size}&data=${encodeURIComponent(menuUrl)}&bgcolor=${qrSettings.backgroundColor.replace('#', '')}&color=${qrSettings.foregroundColor.replace('#', '')}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qr-code-${restaurantName.toLowerCase().replace(/\s+/g, '-')}.${qrSettings.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR Code téléchargé avec succès !');
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(menuUrl);
    toast.success('URL copiée dans le presse-papiers');
  };

  const handlePreview = () => {
    window.open(menuUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres du QR Code</CardTitle>
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

            <div>
              <Label htmlFor="menu-url">URL du menu</Label>
              <div className="flex gap-2">
                <Input
                  id="menu-url"
                  value={menuUrl}
                  readOnly
                  className="bg-gray-50"
                />
                <Button variant="outline" size="icon" onClick={handleCopyUrl}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-white p-4 rounded-lg border inline-block">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="mx-auto"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button onClick={handlePreview} variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Tester
              </Button>
              <Button onClick={handleDownload} className="bg-scanner-green-600 hover:bg-scanner-green-700">
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
