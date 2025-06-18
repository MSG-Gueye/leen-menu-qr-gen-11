
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download, Eye, Copy, ArrowDown, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';

const QRGenerator = () => {
  const [qrData, setQrData] = useState({
    restaurantName: 'Le Petit Bistro',
    menuUrl: 'https://scanner-leen.com/menu/le-petit-bistro',
    size: '256'
  });

  const generateQRCode = () => {
    // Simulation de génération de QR code
    toast.success("QR Code généré avec succès !");
  };

  const downloadQR = (format: 'png' | 'svg') => {
    // Simulation de téléchargement
    toast.success(`QR Code téléchargé au format ${format.toUpperCase()}`);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(qrData.menuUrl);
    toast.success("URL copiée dans le presse-papiers");
  };

  const previewUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrData.size}x${qrData.size}&data=${encodeURIComponent(qrData.menuUrl)}`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Génération de QR Codes</h2>
        <p className="text-gray-600">Générez et téléchargez vos QR codes pour vos menus numériques</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration du QR Code</CardTitle>
            <CardDescription>
              Personnalisez les paramètres de votre QR code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="restaurantName">Nom du restaurant</Label>
              <Input
                id="restaurantName"
                value={qrData.restaurantName}
                onChange={(e) => setQrData({ ...qrData, restaurantName: e.target.value })}
                placeholder="Nom de votre restaurant"
              />
            </div>

            <div>
              <Label htmlFor="menuUrl">URL du menu</Label>
              <div className="flex gap-2">
                <Input
                  id="menuUrl"
                  value={qrData.menuUrl}
                  onChange={(e) => setQrData({ ...qrData, menuUrl: e.target.value })}
                  placeholder="https://..."
                />
                <Button variant="outline" size="icon" onClick={copyUrl}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="size">Taille (pixels)</Label>
              <select
                id="size"
                value={qrData.size}
                onChange={(e) => setQrData({ ...qrData, size: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-scanner-green-500"
              >
                <option value="128">128x128</option>
                <option value="256">256x256</option>
                <option value="512">512x512</option>
                <option value="1024">1024x1024</option>
              </select>
            </div>

            <Button 
              onClick={generateQRCode} 
              className="w-full bg-scanner-green-600 hover:bg-scanner-green-700"
            >
              <QrCode className="h-4 w-4 mr-2" />
              Générer le QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Prévisualisation */}
        <Card>
          <CardHeader>
            <CardTitle>Prévisualisation</CardTitle>
            <CardDescription>
              Aperçu de votre QR code
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 inline-block">
              <img
                src={previewUrl}
                alt="QR Code Preview"
                className="mx-auto"
                width={parseInt(qrData.size)}
                height={parseInt(qrData.size)}
                style={{ maxWidth: '200px', maxHeight: '200px', width: 'auto', height: 'auto' }}
              />
            </div>

            <div className="text-sm text-gray-600">
              <p><strong>Restaurant:</strong> {qrData.restaurantName}</p>
              <p><strong>Taille:</strong> {qrData.size}x{qrData.size} pixels</p>
            </div>

            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={() => window.open(qrData.menuUrl, '_blank')}>
                <Eye className="h-4 w-4 mr-2" />
                Tester
              </Button>
              <Button 
                variant="outline" 
                onClick={() => downloadQR('png')}
                className="bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                <Download className="h-4 w-4 mr-2" />
                PNG
              </Button>
              <Button 
                variant="outline" 
                onClick={() => downloadQR('svg')}
                className="bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100"
              >
                <Download className="h-4 w-4 mr-2" />
                SVG
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historique des QR codes */}
      <Card>
        <CardHeader>
          <CardTitle>QR Codes récents</CardTitle>
          <CardDescription>
            Vos derniers QR codes générés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Le Petit Bistro", url: "scanner-leen.com/menu/petit-bistro", date: "Aujourd'hui", downloads: 12 },
              { name: "La Brasserie", url: "scanner-leen.com/menu/brasserie", date: "Hier", downloads: 8 },
              { name: "Café du Coin", url: "scanner-leen.com/menu/cafe-coin", date: "2 jours", downloads: 15 }
            ].map((qr, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <QrCode className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{qr.name}</h4>
                    <p className="text-sm text-gray-600">{qr.url}</p>
                    <p className="text-xs text-gray-500">{qr.date} • {qr.downloads} téléchargements</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRGenerator;
