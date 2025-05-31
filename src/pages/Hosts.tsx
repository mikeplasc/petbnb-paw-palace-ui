
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, Star, Heart } from 'lucide-react';
import HostCard from '@/components/HostCard';
import HostDetailsModal from '@/components/HostDetailsModal';
import { mockHosts } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const Hosts = () => {
  const [hosts] = useState(mockHosts);
  const [filteredHosts, setFilteredHosts] = useState(mockHosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedHost, setSelectedHost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('hostFavorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Filter and sort hosts
  useEffect(() => {
    let filtered = hosts.filter(host => {
      const matchesSearch = host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           host.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || host.type === selectedType;
      const matchesLocation = selectedLocation === 'all' || host.location.includes(selectedLocation);
      
      return matchesSearch && matchesType && matchesLocation;
    });

    // Sort hosts
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricePerNight - b.pricePerNight;
        case 'price-high':
          return b.pricePerNight - a.pricePerNight;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

    setFilteredHosts(filtered);
  }, [hosts, searchTerm, selectedType, selectedLocation, sortBy]);

  const handleToggleFavorite = (hostId: string) => {
    const updatedFavorites = favorites.includes(hostId)
      ? favorites.filter(id => id !== hostId)
      : [...favorites, hostId];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('hostFavorites', JSON.stringify(updatedFavorites));
    
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('favoritesUpdated', { 
      detail: { type: 'host', favorites: updatedFavorites } 
    }));
    
    toast({
      title: favorites.includes(hostId) ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: favorites.includes(hostId) 
        ? "El cuidador se eliminó de tus favoritos" 
        : "El cuidador se añadió a tus favoritos",
    });
  };

  const handleViewDetails = (hostId: string) => {
    const host = hosts.find(h => h.id === hostId);
    if (host) {
      setSelectedHost(host);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHost(null);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'family': return 'Familia';
      case 'individual': return 'Cuidador individual';
      case 'veterinary': return 'Veterinaria';
      default: return type;
    }
  };

  const uniqueLocations = [...new Set(hosts.map(host => host.location.split(',')[0].trim()))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-petbnb-500 to-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Encuentra el Cuidador Perfecto
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Conecta con cuidadores de confianza para tu mascota
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar por nombre o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tipo de cuidador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="family">Familia</SelectItem>
                    <SelectItem value="individual">Cuidador individual</SelectItem>
                    <SelectItem value="veterinary">Veterinaria</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las ubicaciones</SelectItem>
                    {uniqueLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Mejor calificación</SelectItem>
                    <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                    <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                    <SelectItem value="reviews">Más reseñas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Cuidadores Disponibles
            </h2>
            <p className="text-gray-600">
              {filteredHosts.length} cuidadores encontrados
            </p>
          </div>
        </div>

        {/* Hosts Grid */}
        {filteredHosts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Heart className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron cuidadores
              </h3>
              <p className="text-gray-600 mb-4">
                Intenta ajustar tus filtros de búsqueda
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                  setSelectedLocation('all');
                }}
              >
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHosts.map((host) => (
              <HostCard
                key={host.id}
                host={host}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(host.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Host Details Modal */}
      <HostDetailsModal
        host={selectedHost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedHost ? favorites.includes(selectedHost.id) : false}
      />
    </div>
  );
};

export default Hosts;
