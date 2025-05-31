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
import type { Host as SupabaseHost } from '@/services/hostService';

// Define the Component Host type to match what HostCard expects
interface ComponentHost {
  id: string;
  name: string;
  type: "veterinary" | "individual";
  location: string;
  city: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  image: string;
  images: string[];
  services: string[];
  acceptedPets: string[];
  availability: boolean;
  responseTime: string;
  experience: string;
  description: string;
  certifications: string[];
  specialties: string[];
}

// Define the Modal Host type to match what HostDetailsModal expects
interface ModalHost {
  id: string;
  name: string;
  type: "veterinary" | "individual";
  location: string;
  city: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  image: string;
  images: string[];
  services: string[];
  acceptedPets: string[];
  availability: string; // Modal expects string
  responseTime: string;
  experience: string;
  description: string;
  certifications: string[];
  specialties: string[];
}

// Helper function to convert Supabase host to ComponentHost format
const convertSupabaseHostToComponentHost = (supabaseHost: SupabaseHost): ComponentHost => {
  const acceptedPets = Array.isArray(supabaseHost.accepted_pets) 
    ? supabaseHost.accepted_pets as string[]
    : [];
  
  const services = Array.isArray(supabaseHost.services)
    ? supabaseHost.services as string[]
    : [];

  const images = Array.isArray(supabaseHost.images)
    ? supabaseHost.images as string[]
    : [];

  const certifications = Array.isArray(supabaseHost.certifications)
    ? supabaseHost.certifications as string[]
    : [];

  const specialties = Array.isArray(supabaseHost.specialties)
    ? supabaseHost.specialties as string[]
    : [];

  // Map database type values to expected ComponentHost type values
  const mapHostType = (dbType: string): "veterinary" | "individual" => {
    switch (dbType) {
      case 'veterinary':
        return 'veterinary';
      case 'family':
      case 'individual':
      case 'sitter':
      default:
        return 'individual'; // Map all non-veterinary types to individual
    }
  };

  return {
    id: supabaseHost.id,
    name: supabaseHost.name,
    type: mapHostType(supabaseHost.type),
    location: supabaseHost.location,
    city: supabaseHost.city,
    rating: Number(supabaseHost.rating),
    reviewCount: supabaseHost.review_count,
    pricePerNight: supabaseHost.price_per_night,
    image: images[0] || 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    images: images,
    services: services,
    acceptedPets: acceptedPets,
    availability: supabaseHost.availability,
    responseTime: supabaseHost.response_time,
    experience: supabaseHost.experience || '',
    description: supabaseHost.description,
    certifications: certifications,
    specialties: specialties
  };
};

// Helper function to convert ComponentHost to ModalHost format
const convertComponentHostToModalHost = (componentHost: ComponentHost): ModalHost => {
  return {
    ...componentHost,
    availability: componentHost.availability ? 'available' : 'unavailable'
  };
};

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('rating');
  const [selectedHost, setSelectedHost] = useState<ModalHost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filters state - these will be applied to the database query
  const [appliedFilters, setAppliedFilters] = useState({
    location: searchParams.get('location') || '',
    petType: searchParams.get('petType') || '',
    hostType: '',
    minPrice: 0,
    maxPrice: 2000,
    minRating: 0,
    services: [] as string[]
  });

  // Local filters state for the filter form
  const [localFilters, setLocalFilters] = useState(appliedFilters);

  // Get search parameters
  const locationParam = searchParams.get('location') || '';
  const petTypeParam = searchParams.get('petType') || '';
  const startDateParam = searchParams.get('startDate') || '';
  const endDateParam = searchParams.get('endDate') || '';

  console.log('Search params:', { locationParam, petTypeParam, startDateParam, endDateParam });

  // Build filters for the database query
  const dbFilters: { 
    location?: string; 
    petType?: string; 
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  } = {};
  
  if (appliedFilters.location && appliedFilters.location !== 'all') {
    dbFilters.location = appliedFilters.location;
  }
  
  if (appliedFilters.petType && appliedFilters.petType !== 'all') {
    dbFilters.petType = appliedFilters.petType;
  }

  if (appliedFilters.hostType && appliedFilters.hostType !== 'all') {
    dbFilters.type = appliedFilters.hostType;
  }

  if (appliedFilters.minPrice > 0) {
    dbFilters.minPrice = appliedFilters.minPrice;
  }

  if (appliedFilters.maxPrice < 2000) {
    dbFilters.maxPrice = appliedFilters.maxPrice;
  }

  if (appliedFilters.minRating > 0) {
    dbFilters.minRating = appliedFilters.minRating;
  }

  // Fetch hosts from Supabase with applied filters
  const { data: supabaseHosts = [], isLoading, error, refetch } = useQuery({
    queryKey: ['hosts', appliedFilters],
    queryFn: () => {
      console.log('Fetching hosts with filters:', dbFilters);
      return getHosts(dbFilters);
    },
  });

  console.log('Fetched hosts:', supabaseHosts);

  // Convert Supabase hosts to ComponentHost format
  const hosts = supabaseHosts.map(convertSupabaseHostToComponentHost);

  console.log('Converted hosts:', hosts);

  // Initialize filters from URL params on mount
  useEffect(() => {
    const initialFilters = {
      location: locationParam,
      petType: petTypeParam,
      hostType: '',
      minPrice: 0,
      maxPrice: 2000,
      minRating: 0,
      services: [] as string[]
    };
    setAppliedFilters(initialFilters);
    setLocalFilters(initialFilters);
  }, [locationParam, petTypeParam]);

  const handleSearch = (filters: SearchFilters) => {
    console.log('Nueva búsqueda:', filters);
    
    // Update URL parameters
    const newParams = new URLSearchParams();
    if (filters.location) newParams.set('location', filters.location);
    if (filters.petType) newParams.set('petType', filters.petType);
    if (filters.startDate) newParams.set('startDate', filters.startDate.toISOString());
    if (filters.endDate) newParams.set('endDate', filters.endDate.toISOString());
    
    setSearchParams(newParams);

    // Update applied filters
    setAppliedFilters(prev => ({
      ...prev,
      location: filters.location,
      petType: filters.petType
    }));

    setLocalFilters(prev => ({
      ...prev,
      location: filters.location,
      petType: filters.petType
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(localFilters);
    
    // Update URL with new filters
    const newParams = new URLSearchParams(searchParams);
    if (localFilters.location && localFilters.location !== 'all') newParams.set('location', localFilters.location);
    if (localFilters.petType && localFilters.petType !== 'all') newParams.set('petType', localFilters.petType);
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      location: 'all',
      petType: 'all',
      hostType: 'all',
      minPrice: 0,
      maxPrice: 2000,
      minRating: 0,
      services: [] as string[]
    };
    setLocalFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
    
    // Clear URL params
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
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
      const modalHost = convertComponentHostToModalHost(host);
      setSelectedHost(modalHost);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHost(null);
  };

  // Filter hosts based on services (this is applied after database query)
  const filteredHosts = hosts.filter(host => {
    // Services filter (applied locally since it's not in database query yet)
    if (appliedFilters.services.length > 0 && host.services && Array.isArray(host.services) &&
        !appliedFilters.services.some(service =>
          host.services.some(hostService =>
            hostService.toLowerCase().includes(service.toLowerCase())
          )
        )) {
      return false;
    }

    return true;
  });

  // Sort hosts
  const sortedHosts = [...filteredHosts].sort((a, b) => {
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

  const services = ['Paseos', 'Alimentación', 'Medicación', 'Juegos', 'Cuidado nocturno', 'Baño'];
  const hostTypes = ['individual', 'veterinary'];

  const getHostTypeLabel = (type: string) => {
    switch (type) {
      case 'individual': return 'Cuidadores';
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
              {appliedFilters.location && appliedFilters.location !== 'all' ? `Cuidadores en ${appliedFilters.location}` : 'Resultados de búsqueda'}
            </h1>
            <p className="text-gray-600">
              {sortedHosts.length} cuidadores encontrados
              {appliedFilters.petType && appliedFilters.petType !== 'all' && ` para ${appliedFilters.petType.toLowerCase()}`}
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
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Always Visible */}
          <div className="lg:w-80">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                  <Filter className="w-5 h-5 text-gray-500" />
                </div>

                {/* Location */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Ubicación</h4>
                  <Select value={localFilters.location} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una ciudad" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                      <SelectItem value="all">Todas las ubicaciones</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pet Types */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Tipo de mascota</h4>
                  <Select value={localFilters.petType} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, petType: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona tipo de mascota" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                      <SelectItem value="all">Todos los tipos</SelectItem>
                      {petTypes.map((petType) => (
                        <SelectItem key={petType} value={petType}>
                          {petType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Host Type */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Tipo de cuidador</h4>
                  <Select value={localFilters.hostType} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, hostType: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona tipo de cuidador" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                      <SelectItem value="all">Todos los tipos</SelectItem>
                      {hostTypes.map((hostType) => (
                        <SelectItem key={hostType} value={hostType}>
                          {getHostTypeLabel(hostType)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Services */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Servicios</h4>
                  <div className="space-y-2">
                    {services.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service}`}
                          checked={localFilters.services.includes(service)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setLocalFilters(prev => ({
                                ...prev,
                                services: [...prev.services, service]
                              }));
                            } else {
                              setLocalFilters(prev => ({
                                ...prev,
                                services: prev.services.filter(s => s !== service)
                              }));
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

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Precio por noche</h4>
                  <div className="px-2">
                    <Slider
                      value={[localFilters.minPrice, localFilters.maxPrice]}
                      onValueChange={([min, max]) => setLocalFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }))}
                      max={2000}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>${localFilters.minPrice}</span>
                      <span>${localFilters.maxPrice}</span>
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
                          checked={localFilters.minRating === rating}
                          onChange={() => setLocalFilters(prev => ({ ...prev, minRating: rating }))}
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

                {/* Filter Actions */}
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button
                    onClick={handleApplyFilters}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Aplicar filtros
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="w-full"
                  >
                    Limpiar filtros
                  </Button>
                </div>

                {/* Active Filters Display */}
                {(appliedFilters.location && appliedFilters.location !== 'all' || 
                  appliedFilters.petType && appliedFilters.petType !== 'all' || 
                  appliedFilters.hostType && appliedFilters.hostType !== 'all' || 
                  appliedFilters.minPrice > 0 || 
                  appliedFilters.maxPrice < 2000 || 
                  appliedFilters.minRating > 0 || 
                  appliedFilters.services.length > 0) && (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-2">Filtros aplicados:</h4>
                    <div className="flex flex-wrap gap-2">
                      {appliedFilters.location && appliedFilters.location !== 'all' && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {appliedFilters.location}
                        </Badge>
                      )}
                      {appliedFilters.petType && appliedFilters.petType !== 'all' && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {appliedFilters.petType}
                        </Badge>
                      )}
                      {appliedFilters.hostType && appliedFilters.hostType !== 'all' && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          {getHostTypeLabel(appliedFilters.hostType)}
                        </Badge>
                      )}
                      {appliedFilters.services.map(service => (
                        <Badge key={service} variant="secondary" className="bg-orange-100 text-orange-800">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Grid/List */}
          <div className="flex-1">
            {sortedHosts.length === 0 ? (
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
                    onClick={handleClearFilters}
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
                  {sortedHosts.map((host) => (
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
                {sortedHosts.length > 0 && (
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
