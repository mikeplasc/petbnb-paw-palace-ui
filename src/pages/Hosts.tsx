import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Heart, MapPin, Clock, Shield } from 'lucide-react';
import { getHosts, Host } from '@/services/hostService';
import { useFavorites } from '@/hooks/useFavorites';

const Hosts = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [petType, setPetType] = useState('all');

  const { toggleFavorite, isFavorite } = useFavorites('host');

  const { data: hosts = [], isLoading, error } = useQuery({
    queryKey: ['hosts', searchLocation, petType],
    queryFn: () => getHosts({
      location: searchLocation || undefined,
      petType: petType === 'all' ? undefined : petType,
      type: 'sitter'
    }),
  });

  const handleToggleFavorite = (hostId: string) => {
    toggleFavorite(hostId, 'host');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index}>
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cuidadores de Mascotas</h1>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            <Input
              placeholder="Ciudad o región"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de mascota
            </label>
            <Select value={petType} onValueChange={setPetType}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Perros">Perros</SelectItem>
                <SelectItem value="Gatos">Gatos</SelectItem>
                <SelectItem value="Aves">Aves</SelectItem>
                <SelectItem value="Conejos">Conejos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={() => {
                setSearchLocation('');
                setPetType('all');
              }}
              variant="outline" 
              className="w-full"
            >
              Limpiar filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de cuidadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hosts.map((host) => {
          const images = Array.isArray(host.images) ? host.images as string[] : [];
          const services = Array.isArray(host.services) ? host.services as string[] : [];
          const certifications = Array.isArray(host.certifications) ? host.certifications as string[] : [];
          const isCurrentlyFavorite = isFavorite(host.id, 'host');

          return (
            <Card key={host.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={images[0] || '/placeholder.svg'}
                  alt={host.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <button
                  onClick={() => handleToggleFavorite(host.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isCurrentlyFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
                {certifications.length > 0 && (
                  <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Certificado
                  </Badge>
                )}
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{host.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{Number(host.rating).toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({host.review_count})</span>
                  </div>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {host.city}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {host.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {services.slice(0, 3).map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {services.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{services.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Clock className="h-4 w-4" />
                  <span>Responde en {host.response_time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    €{host.price_per_night}<span className="text-sm font-normal text-gray-500">/noche</span>
                  </div>
                  <Button size="sm">Ver perfil</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {hosts.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600">No se encontraron cuidadores con los filtros aplicados.</p>
        </div>
      )}
    </div>
  );
};

export default Hosts;
