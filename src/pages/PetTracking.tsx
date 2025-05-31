
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, Smartphone } from 'lucide-react';
import { getMyPets } from '@/services/petService';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const PetTracking = () => {
  const { toast } = useToast();
  const [realTimeConnections, setRealTimeConnections] = useState<Set<string>>(new Set());

  const { data: myPets = [], isLoading: isLoadingPets } = useQuery({
    queryKey: ['myPets'],
    queryFn: getMyPets,
  });

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

  // Generar coordenadas aleatorias para cada mascota
  const generateRandomCoordinates = () => {
    // Coordenadas aproximadas de Ciudad de México
    const baseLat = 19.4326;
    const baseLng = -99.1332;
    const randomLat = baseLat + (Math.random() - 0.5) * 0.1;
    const randomLng = baseLng + (Math.random() - 0.5) * 0.1;
    return { lat: randomLat, lng: randomLng };
  };

  const openGoogleMaps = (petName: string) => {
    const coords = generateRandomCoordinates();
    const url = `https://www.google.com/maps?q=${coords.lat},${coords.lng}&zoom=15&marker=${coords.lat},${coords.lng}`;
    window.open(url, '_blank');
    
    toast({
      title: "Ubicación de " + petName,
      description: `Coordenadas: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`,
    });
  };

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
                      onClick={() => openGoogleMaps(pet.name)}
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
      )}
    </div>
  );
};

export default PetTracking;
