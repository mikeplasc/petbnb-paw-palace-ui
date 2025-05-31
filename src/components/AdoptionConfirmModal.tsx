
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Heart, Info } from 'lucide-react';
import { Pet } from '@/services/petService';

interface AdoptionConfirmModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AdoptionConfirmModal = ({ pet, isOpen, onClose, onConfirm }: AdoptionConfirmModalProps) => {
  if (!pet) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            ¿Adoptar a {pet.name}?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">{pet.name}</h3>
            <p className="text-gray-600">{pet.breed} • {pet.age}</p>
            <div className="flex justify-center">
              <Badge variant="outline">{pet.type}</Badge>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-900">Recomendación importante</h4>
                <p className="text-sm text-blue-800">
                  Te recomendamos leer toda la información detallada de {pet.name} antes de proceder con la adopción. 
                  Puedes hacerlo haciendo clic en "Ver detalles" en la tarjeta de la mascota.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              Al confirmar, enviaremos tu solicitud de adopción al refugio <strong>{pet.shelter_name}</strong> 
              con tu información de perfil.
            </p>
            <p className="text-sm text-gray-600">
              Cuota de adopción: <span className="font-semibold text-green-600">€{pet.adoption_fee}</span>
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              <Heart className="w-4 h-4 mr-2" />
              Confirmar adopción
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdoptionConfirmModal;
