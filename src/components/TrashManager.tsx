
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArchiveRestore, Trash2, AlertTriangle } from 'lucide-react';
import { Business } from '@/hooks/useBusinesses';
import { useBusinessTypes } from '@/hooks/useBusinessTypes';

interface TrashManagerProps {
  deletedBusinesses: Business[];
  onRestore: (id: number) => void;
  onPermanentDelete: (id: number) => void;
  onEmptyTrash: () => void;
}

const TrashManager: React.FC<TrashManagerProps> = ({
  deletedBusinesses,
  onRestore,
  onPermanentDelete,
  onEmptyTrash
}) => {
  const { getBusinessType } = useBusinessTypes();

  const handlePermanentDelete = (business: Business) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer définitivement ${business.name} ? Cette action est irréversible.`)) {
      onPermanentDelete(business.id);
    }
  };

  const handleEmptyTrash = () => {
    if (confirm('Êtes-vous sûr de vouloir vider complètement la corbeille ? Cette action est irréversible.')) {
      onEmptyTrash();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Corbeille</h2>
          <p className="text-gray-600">{deletedBusinesses.length} entreprise(s) supprimée(s)</p>
        </div>
        {deletedBusinesses.length > 0 && (
          <Button 
            variant="destructive" 
            onClick={handleEmptyTrash}
            className="bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Vider la corbeille
          </Button>
        )}
      </div>

      {deletedBusinesses.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Trash2 className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Corbeille vide</h3>
            <p className="text-gray-500">Aucune entreprise supprimée</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {deletedBusinesses.map((business) => {
            const businessType = getBusinessType(business.businessType);
            return (
              <Card key={business.id} className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl opacity-50">{businessType.icon}</span>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-700">{business.name}</h3>
                          <p className="text-sm text-gray-500">{businessType.name}</p>
                        </div>
                        <Badge variant="destructive" className="bg-red-100 text-red-700">
                          Supprimé
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        <p><strong>Adresse:</strong> {business.address}</p>
                        <p><strong>Propriétaire:</strong> {business.owner}</p>
                        <p><strong>Email:</strong> {business.email}</p>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span className="text-orange-600">
                          Les données seront définitivement perdues si supprimées
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onRestore(business.id)}
                        className="text-green-600 hover:text-green-700 hover:border-green-300"
                      >
                        <ArchiveRestore className="h-4 w-4 mr-2" />
                        Restaurer
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePermanentDelete(business)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrashManager;
