
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Clock, CheckCircle } from 'lucide-react';
import { Business } from '@/hooks/useBusinesses';

interface PaymentStatusProps {
  business: Business;
  onPaymentClick: (businessId: number) => void;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ business, onPaymentClick }) => {
  const getPaymentStatus = () => {
    if (business.paymentStatus === 'paid') {
      return {
        icon: <CheckCircle className="h-4 w-4" />,
        text: 'Payé',
        variant: 'default',
        color: 'text-green-600'
      };
    }
    return {
      icon: <Clock className="h-4 w-4" />,
      text: 'En attente',
      variant: 'secondary',
      color: 'text-orange-600'
    };
  };

  const status = getPaymentStatus();

  return (
    <div className="flex items-center gap-2">
      <Badge variant={status.variant as any} className="flex items-center gap-1">
        {status.icon}
        {status.text}
      </Badge>
      {business.paymentStatus !== 'paid' && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPaymentClick(business.id)}
          className="text-blue-600 hover:text-blue-700 hover:border-blue-300"
        >
          <CreditCard className="h-4 w-4 mr-1" />
          Payer
        </Button>
      )}
      {business.lastPayment && (
        <span className="text-xs text-gray-500">
          Dernier paiement: {business.lastPayment}
        </span>
      )}
    </div>
  );
};

export default PaymentStatus;
