
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Users } from 'lucide-react';

interface EmptyRestaurantStateProps {
  onAddBusiness: () => void;
}

const EmptyRestaurantState: React.FC<EmptyRestaurantStateProps> = ({ onAddBusiness }) => {
  return (
    <div className="text-center py-12">
      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-500 mb-4">Aucune entreprise enregistrée</p>
      <Button onClick={onAddBusiness} className="bg-scanner-green-600 hover:bg-scanner-green-700">
        <Plus className="h-4 w-4 mr-2" />
        Ajouter votre première entreprise
      </Button>
    </div>
  );
};

export default EmptyRestaurantState;
