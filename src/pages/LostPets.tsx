
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Plus, AlertTriangle } from 'lucide-react';
import { getLostPets } from '@/services/lostPetService';
import LostPetCard from '@/components/LostPetCard';
import ReportLostPetModal from '@/components/ReportLostPetModal';
import { useToast } from '@/hooks/use-toast';

const LostPets = () => {
  const { toast } = useToast();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const { data: lostPets = [], isLoading } = useQuery({
    queryKey: ['lostPets'],
    queryFn: getLostPets,
    refetchInterval: 30000, // Actualizar cada 30 segundos
  });

  const handleContactOwner = (lostPet: any) => {
    const message = `Hola, he visto tu publicación sobre ${lostPet.pets?.name}. Creo que puedo ayudarte a encontrar a tu mascota.`;
    
    if (lostPet.contact_phone) {
      const whatsappUrl = `https://wa.me/${lostPet.contact_phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else if (lostPet.contact_email) {
      const emailUrl = `mailto:${lostPet.contact_email}?subject=Información sobre ${lostPet.pets?.name}&body=${encodeURIComponent(message)}`;
      window.open(emailUrl, '_blank');
    } else {
      toast({
        title: "Información de contacto no disponible",
        description: "No se encontró información de contacto para este caso.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin h-8 w-8 border-b-2 border-purple-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mascotas Perdidas</h1>
          <p className="text-gray-600 mt-2">
            Ayuda a reunir mascotas perdidas con sus familias
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsReportModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Reportar mascota perdida
          </Button>
          <Badge variant="outline" className="flex items-center gap-1">
            <Heart className="h-3 w-3 text-red-500" />
            {lostPets.length} mascotas necesitan ayuda
          </Badge>
        </div>
      </div>

      {/* Información importante */}
      <Card className="mb-8 border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">¿Encontraste una mascota?</h3>
              <p className="text-sm text-yellow-800 mb-3">
                Si encontraste una mascota que coincide con alguna de estas descripciones, 
                contacta inmediatamente al dueño usando la información proporcionada.
              </p>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Toma una foto si es posible</li>
                <li>• Mantén a la mascota en un lugar seguro</li>
                <li>• No intentes alimentar sin conocer sus necesidades especiales</li>
                <li>• Contacta también a refugios locales</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de mascotas perdidas */}
      {lostPets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ¡Buenas noticias!
            </h3>
            <p className="text-gray-600 text-center">
              No hay mascotas perdidas reportadas en este momento
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lostPets.map((lostPet) => (
            <LostPetCard
              key={lostPet.id}
              lostPet={lostPet}
              onContactOwner={() => handleContactOwner(lostPet)}
            />
          ))}
        </div>
      )}

      {/* Estadísticas */}
      {lostPets.length > 0 && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{lostPets.length}</div>
                <div className="text-sm text-gray-600">Mascotas perdidas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {lostPets.filter(p => p.reward_amount && p.reward_amount > 0).length}
                </div>
                <div className="text-sm text-gray-600">Con recompensa</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {new Set(lostPets.map(p => p.last_seen_location.split(',')[0])).size}
                </div>
                <div className="text-sm text-gray-600">Ubicaciones diferentes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <ReportLostPetModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};

export default LostPets;
