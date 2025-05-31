
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Phone, Mail, DollarSign, Heart, Edit, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LostPet, deleteLostPet } from '@/services/lostPetService';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import EditLostPetModal from './EditLostPetModal';

interface LostPetCardProps {
  lostPet: LostPet & {
    pets: {
      id: string;
      name: string;
      type: string;
      breed: string;
      age: string;
      size: string;
      gender: string;
      image: string | null;
      characteristics: string[] | null;
    } | null;
  };
  onContactOwner?: () => void;
}

const LostPetCard: React.FC<LostPetCardProps> = ({ lostPet, onContactOwner }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const pet = lostPet.pets;

  // Obtener el usuario actual
  React.useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  const deleteMutation = useMutation({
    mutationFn: () => deleteLostPet(lostPet.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lostPets'] });
      toast({
        title: "Mascota eliminada",
        description: "El reporte de mascota perdida ha sido eliminado",
      });
    },
    onError: (error) => {
      console.error('Error deleting lost pet:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el reporte",
        variant: "destructive",
      });
    },
  });

  if (!pet) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getGenderColor = (gender: string) => {
    return gender.toLowerCase() === 'macho' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800';
  };

  const getSizeColor = (size: string) => {
    switch (size.toLowerCase()) {
      case 'pequeño':
        return 'bg-green-100 text-green-800';
      case 'mediano':
        return 'bg-yellow-100 text-yellow-800';
      case 'grande':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOwner = currentUserId === lostPet.owner_id;

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={pet.image || '/placeholder-pet.jpg'}
            alt={pet.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-600 text-white">
              <Heart className="h-3 w-3 mr-1" />
              PERDIDO
            </Badge>
          </div>
          {lostPet.reward_amount && lostPet.reward_amount > 0 && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-green-600 text-white">
                <DollarSign className="h-3 w-3 mr-1" />
                Recompensa: ${lostPet.reward_amount}
              </Badge>
            </div>
          )}
          
          {/* Botones de acción para el dueño */}
          {isOwner && (
            <div className="absolute bottom-2 right-2 flex gap-2">
              <Button
                onClick={() => setIsEditModalOpen(true)}
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white"
              >
                <Edit className="h-3 w-3" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-600/90 hover:bg-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar reporte?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. El reporte de {pet.name} será eliminado permanentemente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteMutation.mutate()}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Información básica */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pet.name}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline">{pet.type}</Badge>
                <Badge variant="outline">{pet.breed}</Badge>
                <Badge className={getGenderColor(pet.gender)}>{pet.gender}</Badge>
                <Badge className={getSizeColor(pet.size)}>{pet.size}</Badge>
                <Badge variant="outline">{pet.age}</Badge>
              </div>
            </div>

            {/* Características */}
            {pet.characteristics && pet.characteristics.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Características:</p>
                <div className="flex flex-wrap gap-1">
                  {pet.characteristics.map((char, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {char}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Información de pérdida */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Perdido el: {formatDate(lostPet.last_seen_date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Última ubicación: {lostPet.last_seen_location}</span>
              </div>
            </div>

            {/* Descripción */}
            {lostPet.description && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Descripción:</p>
                <p className="text-sm text-gray-600">{lostPet.description}</p>
              </div>
            )}

            {/* Información de contacto */}
            <div className="flex flex-col gap-2 pt-2 border-t">
              {lostPet.contact_phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span className="text-gray-600">Teléfono:</span>
                  <span className="font-medium">{lostPet.contact_phone}</span>
                </div>
              )}
              {lostPet.contact_email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{lostPet.contact_email}</span>
                </div>
              )}
            </div>

            {/* Botón de contacto */}
            {!isOwner && (lostPet.contact_phone || lostPet.contact_email) && (
              <Button 
                onClick={onContactOwner}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Contactar al dueño
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <EditLostPetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        lostPet={lostPet}
      />
    </>
  );
};

export default LostPetCard;
