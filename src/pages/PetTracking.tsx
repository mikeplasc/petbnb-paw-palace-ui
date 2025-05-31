
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Plus, AlertTriangle, Smartphone } from 'lucide-react';
import { getMyPets } from '@/services/petService';
import { getPetLocations, getLatestPetLocation } from '@/services/petLocationService';
import { supabase } from '@/integrations/supabase/client';
import PetTrackingMap from '@/components/PetTrackingMap';
import { useToast } from '@/hooks/use-toast';

const PetTracking = () => {
  const { toast } = useToast();
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [realTimeConnections, setRealTimeConnections] = useState<Set<string>>(new Set());

  const { data: myPets = [], isLoading: isLoadingPets } = useQuery({
    queryKey: ['myPets'],
    queryFn: getMyPets,
  });

  const { data: petLocations = [], refetch: refetchLocations } = useQuery({
    queryKey: ['petLocations', selectedPetId],
    queryFn: () => selectedPetId ? getPetLocations(selectedPetId) : Promise.resolve([]),
    enabled: !!selectedPetId,
  });

  // Configurar tiempo real para ubicaciones
  useEffect(() => {
    if (!selectedPetId) return;

    const channel = supabase
      .channel('pet-locations-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'pet_locations',
          filter: `pet_id=eq.${selectedPetId}`
        },
        (payload) => {
          console.log('Nueva ubicación recibida:', payload);
          refetchLocations();
          toast({
            title: "Ubicación actualizada",
            description: "Se ha recibido una nueva ubicación de tu mascota",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedPetId, refetchLocations, toast]);

  // Simular estado de conexión en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeConnections(prev => {
        const newSet = new Set(prev);
        myPets.forEach(pet => {
          // Simular conexión aleatoria
          if (Math.random() > 0.7) {
            newSet.add(pet.id);
          } else {
            newSet.delete(pet.id);
          }
        });
        return newSet;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [myPets]);

  if (isLoadingPets) {
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
          <h1 className="text-3xl font-bold text-gray-900">Rastreo de Mascotas</h1>
          <p className="text-gray-600 mt-2">
            Monitorea la ubicación en tiempo real de tus mascotas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Smartphone className="h-3 w-3" />
            {realTimeConnections.size} dispositivos conectados
          </Badge>
        </div>
      </div>

      {myPets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <MapPin className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes mascotas registradas
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
              Para usar el rastreo en tiempo real, primero debes registrar tus mascotas
              en la sección "Mis Mascotas".
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Registrar mascota
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="tracking">Rastreo detallado</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPets.map((pet) => {
                const isConnected = realTimeConnections.has(pet.id);
                return (
                  <Card key={pet.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={pet.image || '/placeholder-pet.jpg'}
                          alt={pet.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{pet.name}</h3>
                          <p className="text-gray-600">{pet.type} • {pet.breed}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Estado del dispositivo:</span>
                          {isConnected ? (
                            <Badge className="bg-green-100 text-green-800">En línea</Badge>
                          ) : (
                            <Badge variant="secondary">Desconectado</Badge>
                          )}
                        </div>
                        
                        <Button
                          onClick={() => {
                            setSelectedPetId(pet.id);
                            // Cambiar a la pestaña de rastreo detallado
                            const tabsTrigger = document.querySelector('[value="tracking"]') as HTMLElement;
                            tabsTrigger?.click();
                          }}
                          className="w-full"
                          variant={isConnected ? "default" : "outline"}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Ver ubicación
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Información sobre dispositivos GPS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Información importante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Dispositivos GPS requeridos</h4>
                    <p className="text-sm text-gray-600">
                      Para el rastreo en tiempo real, cada mascota debe tener un dispositivo GPS compatible.
                      Los datos de ubicación se actualizan automáticamente cuando el dispositivo está conectado.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Precisión de ubicación</h4>
                    <p className="text-sm text-gray-600">
                      La precisión depende de la señal GPS y puede variar entre 3-10 metros en condiciones normales.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            {!selectedPetId ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <MapPin className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Selecciona una mascota
                  </h3>
                  <p className="text-gray-600 text-center">
                    Elige una mascota del resumen para ver su rastreo detallado
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPetId(null)}
                  >
                    ← Volver al resumen
                  </Button>
                  <h2 className="text-xl font-semibold">
                    Rastreo detallado
                  </h2>
                </div>
                
                <PetTrackingMap
                  petId={selectedPetId}
                  petName={myPets.find(p => p.id === selectedPetId)?.name || 'Mascota'}
                  locations={petLocations}
                  isRealTimeActive={realTimeConnections.has(selectedPetId)}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default PetTracking;
