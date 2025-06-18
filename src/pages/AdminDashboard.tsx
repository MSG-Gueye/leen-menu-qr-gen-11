
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Plus, Settings, Menu, Users, ArrowDown, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RestaurantManager from '@/components/RestaurantManager';
import MenuManager from '@/components/MenuManager';
import QRGenerator from '@/components/QRGenerator';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('restaurants');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <QrCode className="h-6 w-6 text-scanner-green-600" />
              <span className="text-xl font-bold">Scanner-Leen</span>
            </Button>
            <span className="text-gray-400">|</span>
            <span className="text-lg font-medium text-gray-700">Dashboard</span>
          </div>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-600">
            Gérez vos restaurants, menus et QR codes depuis une interface centralisée
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="restaurants" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Restaurants</span>
            </TabsTrigger>
            <TabsTrigger value="menus" className="flex items-center space-x-2">
              <Menu className="h-4 w-4" />
              <span>Menus</span>
            </TabsTrigger>
            <TabsTrigger value="qrcodes" className="flex items-center space-x-2">
              <QrCode className="h-4 w-4" />
              <span>QR Codes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants">
            <RestaurantManager />
          </TabsContent>

          <TabsContent value="menus">
            <MenuManager />
          </TabsContent>

          <TabsContent value="qrcodes">
            <QRGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
