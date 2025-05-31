
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar, { SearchFilters } from '@/components/SearchBar';
import HostCard from '@/components/HostCard';
import HostDetailsModal from '@/components/HostDetailsModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useQuery } from '@tanstack/react-query';
import { getHosts } from '@/services/hostService';
import { petTypes, cities } from '@/data/mockData';
import { Filter, Grid, List, MapPin, Star } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHost, setSelectedHost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filters state
  const [selectedPetTypes, setSelectedPetTypes] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedHostTypes, setSelectedHostTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minRating, setMinRating] = useState(0);

  // Get search parameters
  const locationParam = searchParams.get('location') || '';
  const petTypeParam = searchParams.get('petType') || '';
  const startDateParam = searchParams.get('startDate') || '';
  const endDateParam = searchParams.get('endDate') || '';

  // Fetch hosts from Supabase
  const { data: hosts = [], isLoading, error } = useQuery({
    queryKey: ['hosts', locationParam, petTypeParam],
    queryFn: () => getHosts({
      location: locationParam,
      petType: petTypeParam
    }),
  });

  const handleSearch = (filters: SearchFilters) => {
    console.log('Nueva búsqueda:', filters);
    // Here you would update the search results based on new filters
  };

  const handleToggleFavorite = (hostId: string) => {
    setFavorites(prev => 
      prev.includes(hostId) 
        ? prev.filter(id => id !== hostId)
        : [...prev, hostId]
    );
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

  // Filter and sort hosts
  const filteredAndSortedHosts = hosts
    .filter(host => {
      // Location filter
      if (locationParam && host.city && !host.city.toLowerCase().includes(locationParam.toLowerCase())) {
        return false;
      }
      
      // Pet type filter
      if (petTypeParam && host.accepted_pets && Array.isArray(host.accepted_pets) && 
          !host.accepted_pets.some(pet => 
            pet.toLowerCase().includes(petTypeParam.toLowerCase())
          )) {
        return false;
      }

      // Pet types filter
      if (selectedPetTypes.length > 0 && host.accepted_pets && Array.isArray(host.accepted_pets) &&
          !selectedPetTypes.some(petType =>
            host.accepted_pets.includes(petType)
          )) {
        return false;
      }

      // Services filter
      if (selectedServices.length > 0 && host.services && Array.isArray(host.services) &&
          !selectedServices.some(service =>
            host.services.includes(service)
          )) {
        return false;
      }

      // Host type filter
      if (selectedHostTypes.length > 0 && !selectedHostTypes.includes(host.type)) {
        return false;
      }

      // Price filter
      if (host.price_per_night < priceRange[0] || host.price_per_night > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (host.rating < minRating) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price_per_night - b.price_per_night;
        case 'price-high':
          return b.price_per_night - a.price_per_night;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.review_count - a.review_count;
        default:
          return 0;
      }
    });

  const services = ['Paseos', 'Alimentación', 'Medicación', 'Juegos', 'Cuidado nocturno', 'Baño'];
  const hostTypes = ['family', 'individual', 'veterinary'];

  const getHostTypeLabel = (type: string) => {
    switch (type) {
      case 'family': return 'Familia';
      case 'individual': return 'Cuidador individual';
      case 'veterinary': return 'Veterinaria';
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando cuidadores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error al cargar los cuidadores</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Intentar de nuevo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <SearchBar onSearch={handleSearch} variant="compact" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {locationParam ? `Cuidadores en ${locationParam}` : 'Resultados de búsqueda'}
            </h1>
            <p className="text-gray-600">
              {filteredAndSortedHosts.length} cuidadores encontrados
              {petTypeParam && ` para ${petTypeParam.toLowerCase()}`}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white rounded-lg border border-gray-300 p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                <SelectItem value="rating">Mejor calificación</SelectItem>
                <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                <SelectItem value="reviews">Más reseñas</SelectItem>
              </SelectContent>
            </Select>

            {/* Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white border-gray-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-80">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>

                  {/* Pet Types */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Tipo de mascota</h4>
                    <div className="space-y-2">
                      {petTypes.map((petType) => (
                        <div key={petType} className="flex items-center space-x-2">
                          <Checkbox
                            id={`pet-${petType}`}
                            checked={selectedPetTypes.includes(petType)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedPetTypes([...selectedPetTypes, petType]);
                              } else {
                                setSelectedPetTypes(selectedPetTypes.filter(p => p !== petType));
                              }
                            }}
                          />
                          <label htmlFor={`pet-${petType}`} className="text-sm text-gray-700">
                            {petType}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Servicios</h4>
                    <div className="space-y-2">
                      {services.map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={`service-${service}`}
                            checked={selectedServices.includes(service)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedServices([...selectedServices, service]);
                              } else {
                                setSelectedServices(selectedServices.filter(s => s !== service));
                              }
                            }}
                          />
                          <label htmlFor={`service-${service}`} className="text-sm text-gray-700">
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Host Type */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Tipo de cuidador</h4>
                    <div className="space-y-2">
                      {hostTypes.map((hostType) => (
                        <div key={hostType} className="flex items-center space-x-2">
                          <Checkbox
                            id={`host-${hostType}`}
                            checked={selectedHostTypes.includes(hostType)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedHostTypes([...selectedHostTypes, hostType]);
                              } else {
                                setSelectedHostTypes(selectedHostTypes.filter(h => h !== hostType));
                              }
                            }}
                          />
                          <label htmlFor={`host-${hostType}`} className="text-sm text-gray-700">
                            {getHostTypeLabel(hostType)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Precio por noche</h4>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={2000}
                        min={0}
                        step={50}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Calificación mínima</h4>
                    <div className="space-y-2">
                      {[4, 3, 2, 1, 0].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`rating-${rating}`}
                            name="rating"
                            checked={minRating === rating}
                            onChange={() => setMinRating(rating)}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor={`rating-${rating}`} className="flex items-center text-sm text-gray-700">
                            <div className="flex items-center mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.max(rating, 1) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            {rating > 0 ? `${rating}+ estrellas` : 'Cualquier calificación'}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedPetTypes([]);
                      setSelectedServices([]);
                      setSelectedHostTypes([]);
                      setPriceRange([0, 2000]);
                      setMinRating(0);
                    }}
                    className="w-full"
                  >
                    Limpiar filtros
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results Grid/List */}
          <div className="flex-1">
            {filteredAndSortedHosts.length === 0 ? (
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <MapPin className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron cuidadores
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Intenta ajustar tus filtros o buscar en otra ubicación
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedPetTypes([]);
                      setSelectedServices([]);
                      setSelectedHostTypes([]);
                      setPriceRange([0, 2000]);
                      setMinRating(0);
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-4'
                }>
                  {filteredAndSortedHosts.map((host) => (
                    <HostCard
                      key={host.id}
                      host={host}
                      onViewDetails={handleViewDetails}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.includes(host.id)}
                    />
                  ))}
                </div>

                {/* Load More Button - Only show if there are results */}
                {filteredAndSortedHosts.length > 0 && (
                  <div className="text-center mt-12">
                    <Button variant="outline" className="px-8">
                      Cargar más resultados
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
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

export default SearchResults;
