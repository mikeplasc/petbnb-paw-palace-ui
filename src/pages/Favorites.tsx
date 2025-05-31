
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MapPin, Star, Calendar, Shield, Stethoscope } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import HostCard from '@/components/HostCard';
import { mockHosts } from '@/data/mockData';

const Favorites = () => {
  const [hostFavorites, setHostFavorites] = useState<string[]>([]);
  const [veterinaryFavorites, setVeterinaryFavorites] = useState<string[]>([]);
  const [petFavorites, setPetFavorites] = useState<string[]>([]);

  // Mock data for veterinaries - in real app this would come from a service
  const mockVeterinaries = [
    {
      id: 'vet1',
      name: 'Clínica Veterinaria San José',
      location: 'Madrid, España',
      rating: 4.8,
      reviewCount: 156,
      image: '/placeholder.svg',
      services: ['Consulta general', 'Cirugía', 'Vacunación'],
      pricePerNight: 45
    },
    {
      id: 'vet2',
      name: 'Hospital Veterinario Central',
      location: 'Barcelona, España',
      rating: 4.9,
      reviewCount: 203,
      image: '/placeholder.svg',
      services: ['Emergencias 24h', 'Radiografía', 'Análisis'],
      pricePerNight: 55
    }
  ];

  useEffect(() => {
    // Load favorites from localStorage
    const savedHostFavorites = JSON.parse(localStorage.getItem('hostFavorites') || '[]');
    const savedVetFavorites = JSON.parse(localStorage.getItem('veterinaryFavorites') || '[]');
    const savedPetFavorites = JSON.parse(localStorage.getItem('petFavorites') || '[]');
    
    setHostFavorites(savedHostFavorites);
    setVeterinaryFavorites(savedVetFavorites);
    setPetFavorites(savedPetFavorites);
  }, []);

  const toggleHostFavorite = (hostId: string) => {
    const updatedFavorites = hostFavorites.includes(hostId)
      ? hostFavorites.filter(id => id !== hostId)
      : [...hostFavorites, hostId];
    
    setHostFavorites(updatedFavorites);
    localStorage.setItem('hostFavorites', JSON.stringify(updatedFavorites));
    
    toast({
      title: hostFavorites.includes(hostId) ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: hostFavorites.includes(hostId) 
        ? "El cuidador se eliminó de tus favoritos" 
        : "El cuidador se añadió a tus favoritos",
    });
  };

  const toggleVeterinaryFavorite = (vetId: string) => {
    const updatedFavorites = veterinaryFavorites.includes(vetId)
      ? veterinaryFavorites.filter(id => id !== vetId)
      : [...veterinaryFavorites, vetId];
    
    setVeterinaryFavorites(updatedFavorites);
    localStorage.setItem('veterinaryFavorites', JSON.stringify(updatedFavorites));
    
    toast({
      title: veterinaryFavorites.includes(vetId) ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: veterinaryFavorites.includes(vetId) 
        ? "La veterinaria se eliminó de tus favoritos" 
        : "La veterinaria se añadió a tus favoritos",
    });
  };

  const favoriteHosts = mockHosts.filter(host => hostFavorites.includes(host.id));
  const favoriteVeterinaries = mockVeterinaries.filter(vet => veterinaryFavorites.includes(vet.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Mis Favoritos
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Todos tus lugares y servicios favoritos en un solo lugar
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hosts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hosts">
              Cuidadores ({favoriteHosts.length})
            </TabsTrigger>
            <TabsTrigger value="veterinaries">
              Veterinarias ({favoriteVeterinaries.length})
            </TabsTrigger>
            <TabsTrigger value="pets">
              Mascotas ({petFavorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hosts" className="mt-6">
            {favoriteHosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteHosts.map((host) => (
                  <HostCard
                    key={host.id}
                    host={host}
                    isFavorite={true}
                    onToggleFavorite={toggleHostFavorite}
                    onViewDetails={(hostId) => console.log('Ver detalles:', hostId)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg mb-4">
                  No tienes cuidadores favoritos aún
                </p>
                <Button onClick={() => window.location.href = '/'}>
                  Explorar cuidadores
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="veterinaries" className="mt-6">
            {favoriteVeterinaries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteVeterinaries.map((vet) => (
                  <Card key={vet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={vet.image}
                        alt={vet.name}
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleVeterinaryFavorite(vet.id)}
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      >
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{vet.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{vet.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {vet.location}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {vet.services.slice(0, 2).map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-green-600">
                          €{vet.pricePerNight}/consulta
                        </span>
                        <Button size="sm">
                          Ver detalles
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Stethoscope className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg mb-4">
                  No tienes veterinarias favoritas aún
                </p>
                <Button onClick={() => window.location.href = '/veterinaries'}>
                  Explorar veterinarias
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pets" className="mt-6">
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-4">
                No tienes mascotas favoritas para adopción aún
              </p>
              <Button onClick={() => window.location.href = '/adoption'}>
                Explorar mascotas
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Favorites;
