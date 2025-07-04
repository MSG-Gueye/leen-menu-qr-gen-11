
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit, QrCode, PowerOff, Power, Mail, Trash2, CreditCard } from 'lucide-react';
import { Business } from '@/hooks/useBusinesses';

interface RestaurantActionsProps {
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
}

const RestaurantActions: React.FC<RestaurantActionsProps> = ({
  business,
  onEdit,
  onGenerateQR,
  onGeneratePaymentQR,
  onToggleStatus,
  onSuspendForNonPayment,
  onReactivateAfterPayment,
  onSendNotification,
  onSendPaymentReminder,
  onDelete
}) => {
  return (
    <div className="flex flex-col gap-2 ml-4">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEdit(business)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onGenerateQR(business.id)}
          className="text-blue-600 hover:text-blue-700 hover:border-blue-300"
        >
          <QrCode className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onGeneratePaymentQR(business.id)}
          className="text-green-600 hover:text-green-700 hover:border-green-300"
        >
          <CreditCard className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onToggleStatus(business.id)}
          className={business.status === 'Actif' ? "text-orange-600 hover:text-orange-700 hover:border-orange-300" : "text-green-600 hover:text-green-700 hover:border-green-300"}
        >
          {business.status === 'Actif' ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex gap-2">
        {business.status === 'Suspendu' ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onReactivateAfterPayment(business.id)}
              className="text-green-600 hover:text-green-700 hover:border-green-300"
            >
              <Power className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSendPaymentReminder(business)}
              className="text-yellow-600 hover:text-yellow-700 hover:border-yellow-300"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSendNotification(business)}
              className="text-purple-600 hover:text-purple-700 hover:border-purple-300"
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSuspendForNonPayment(business.id)}
              className="text-orange-600 hover:text-orange-700 hover:border-orange-300"
            >
              <PowerOff className="h-4 w-4" />
            </Button>
          </>
        )}
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onDelete(business.id)}
          className="text-red-600 hover:text-red-700 hover:border-red-300"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RestaurantActions;
