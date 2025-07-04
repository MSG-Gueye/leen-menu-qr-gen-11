
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Users } from 'lucide-react';
import { Business, subscriptionPackages } from '@/hooks/useBusinesses';
import { useBusinessTypes } from '@/hooks/useBusinessTypes';
import RestaurantActions from './RestaurantActions';
import PaymentStatus from './PaymentStatus';

interface RestaurantCardProps {
  business: Business;
  onEdit: (business: Business) => void;
  onGenerateQR: (id: number) => void;
  onGeneratePaymentQR: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onSuspendForNonPayment: (id: number) => void;
  onReactivateAfterPayment: (id: number) => void;
  onSendNotification: (business: Business) => void;
  onSendPaymentReminder: (business: Business) => void;
  onDelete: (id: number) => void;
  onPaymentClick: (businessId: number) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  business,
  onEdit,
  onGenerateQR,
  onGeneratePaymentQR,
  onToggleStatus,
  onSuspendForNonPayment,
  onReactivateAfterPayment,
  onSendNotification,
  onSendPaymentReminder,
  onDelete,
  onPaymentClick
}) => {
  const { getBusinessType } = useBusinessTypes();
  const businessType = getBusinessType(business.businessType);
  const subscriptionPackage = subscriptionPackages[business.subscriptionPackage];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{businessType.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold">{business.name}</h3>
                  <p className="text-sm text-gray-500">{businessType.name}</p>
                </div>
              </div>
              <Badge variant={business.status === "Actif" ? "default" : business.status === "Suspendu" ? "destructive" : "secondary"}>
                {business.status}
              </Badge>
              {business.status === "Suspendu" && (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Non-paiement
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{business.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{business.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{business.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Propriétaire: {business.owner}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span>{business.menuItems} plats au menu</span>
              <span>{business.totalScans || 0} scans QR</span>
              <span>Mis à jour: {business.lastUpdate}</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {subscriptionPackage.name} - {subscriptionPackage.price.toLocaleString()} FCFA/mois
              </Badge>
            </div>

            <div className="mb-3">
              <PaymentStatus business={business} onPaymentClick={onPaymentClick} />
            </div>
            
            {business.description && (
              <p className="text-sm text-gray-600 mb-3">{business.description}</p>
            )}
          </div>
          
          <RestaurantActions
            business={business}
            onEdit={onEdit}
            onGenerateQR={onGenerateQR}
            onGeneratePaymentQR={onGeneratePaymentQR}
            onToggleStatus={onToggleStatus}
            onSuspendForNonPayment={onSuspendForNonPayment}
            onReactivateAfterPayment={onReactivateAfterPayment}
            onSendNotification={onSendNotification}
            onSendPaymentReminder={onSendPaymentReminder}
            onDelete={onDelete}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
