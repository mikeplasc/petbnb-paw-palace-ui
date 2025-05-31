
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import HostCard from '@/components/HostCard';
import SearchBar from '@/components/SearchBar';
import { mockHosts, petTypes, Host } from '@/data/mockData';
import { Filter, Grid, List, MapPin } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [hosts] = useState<Host[]>(mockHosts);
  const [filteredHosts, setFilteredHosts] = useState<Host[]>(mockHosts);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Get search filters from URL
  const locationParam = searchParams.get('location') || '';
  const petTypeParam = searchParams.get('petType') || '';
  
  // Filters
  const [sortBy, setSortBy] = useState('rating');
  const [selectedHostTypes, setSelectedHostTypes] = useState<string[]>([]);
  const [selectedPetTypes, setSelectedPetTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);

  const hostTypes = [
    { value: 'family', label: 'Familia' },
    { value: 'individual', label: 'Cuidador individual' },
    { value: 'veterinary', label: 'Veterinaria' }
  ];

  useEffect(() => {
    let filtered = [...hosts];

    // Apply URL search filters
    if (locationParam) {
      filtered = filtered.filter(host =>
        host.city.toLowerCase().includes(locationParam.toLowerCase()) ||
        host.location.toLowerCase().includes(locationParam.toLowerCase())
      );
    }
    if (petTypeParam) {
      filtered = filtered.filter(host =>
        host.acceptedPets.includes(petTypeParam)
      );
    }

    // Apply additional filters
    if (selectedHostTypes.length > 0) {
      filtered = filtered.filter(host => selectedHostTypes.includes(host.type));
    }

    if (selectedPetTypes.length > 0) {
      filtered = filtered.filter(host =>
        selectedPetTypes.some(petType => host.acceptedPets.includes(petType))
      );
    }

    if (priceRange.min > 0 || priceRange.max < 1000) {
      filtered = filtered.filter(host =>
        host.pricePerNight >= priceRange.min && host.pricePerNight <= priceRange.max
      );
    }

    if (minRating > 0) {
      filtered = filtered.filter(host => host.rating >= minRating);
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price_low':
          return a.pricePerNight - b.pricePerNight;
        case 'price_high':
          return b.pricePerNight - a.pricePerNight;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

    setFilteredHosts(filtered);
  }, [hosts, locationParam, petTypeParam, selectedHostTypes, selectedPetTypes, priceRange, minRating, sortBy]);

  const handleToggleFavorite = (hostId: string) => {
    setFavorites(prev =>
      prev.includes(hostId)
        ? prev.filter(id => id !== hostId)
        : [...prev, hostId]
    );
  };

  const handleViewDetails = (hostId: string) => {
    console.log('Ver detalles del host:', hostId);
  };

  const handleHostTypeChange = (hostType: string, checked: boolean) => {
    if (checked) {
      setSelectedHostTypes(prev => [...prev, hostType]);
    } else {
      setSelectedHostTypes(prev => prev.filter(type => type !== hostType));
    }
  };

  const handlePetTypeChange = (petType: string, checked: boolean) => {
    if (checked) {
      setSelectedPetTypes(prev => [...prev, petType]);
    } else {
      setSelectedPetTypes(prev => prev.filter(type => type !== petType));
    }
  };

  const clearFilters = () => {
    setSelectedHostTypes([]);
    setSelectedPetTypes([]);
    setPriceRange({ min: 0, max: 1000 });
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="container mx-auto">
          <SearchBar variant="compact" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-petbnb-600 hover:text-petbnb-700"
                  >
                    Limpiar
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Host Type Filter */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Tipo de cuidador</Label>
                    <div className="space-y-2">
                      {hostTypes.map((type) => (
                        <div key={type.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={type.value}
                            checked={selectedHostTypes.includes(type.value)}
                            onCheckedChange={(checked) => handleHostTypeChange(type.value, checked as boolean)}
                          />
                          <Label htmlFor={type.value} className="text-sm cursor-pointer">
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pet Type Filter */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Mascotas aceptadas</Label>
                    <div className="space-y-2">
                      {petTypes.map((petType) => (
                        <div key={petType} className="flex items-center space-x-2">
                          <Checkbox
                            id={`pet-${petType}`}
                            checked={selectedPetTypes.includes(petType)}
                            onCheckedChange={(checked) => handlePetTypeChange(petType, checked as boolean)}
                          />
                          <Label htmlFor={`pet-${petType}`} className="text-sm cursor-pointer">
                            {petType}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Calificación mínima</Label>
                    <Select value={minRating.toString()} onValueChange={(value) => setMinRating(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Cualquier calificación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Cualquier calificación</SelectItem>
                        <SelectItem value="3">3+ estrellas</SelectItem>
                        <SelectItem value="4">4+ estrellas</SelectItem>
                        <SelectItem value="4.5">4.5+ estrellas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {filteredHosts.length} cuidadores encontrados
                </h2>
                {locationParam && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>en {locationParam}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Mejor calificación</SelectItem>
                    <SelectItem value="price_low">Precio: menor a mayor</SelectItem>
                    <SelectItem value="price_high">Precio: mayor a menor</SelectItem>
                    <SelectItem value="reviews">Más reseñas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedHostTypes.length > 0 || selectedPetTypes.length > 0 || minRating > 0 || locationParam || petTypeParam) && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {locationParam && (
                    <Badge variant="outline" className="bg-petbnb-50 text-petbnb-700 border-petbnb-300">
                      📍 {locationParam}
                    </Badge>
                  )}
                  {petTypeParam && (
                    <Badge variant="outline" className="bg-petbnb-50 text-petbnb-700 border-petbnb-300">
                      🐾 {petTypeParam}
                    </Badge>
                  )}
                  {selectedHostTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="cursor-pointer">
                      {hostTypes.find(t => t.value === type)?.label}
                      <button
                        onClick={() => handleHostTypeChange(type, false)}
                        className="ml-2 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {selectedPetTypes.map((petType) => (
                    <Badge key={petType} variant="secondary" className="cursor-pointer">
                      {petType}
                      <button
                        onClick={() => handlePetTypeChange(petType, false)}
                        className="ml-2 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {minRating > 0 && (
                    <Badge variant="secondary" className="cursor-pointer">
                      {minRating}+ estrellas
                      <button
                        onClick={() => setMinRating(0)}
                        className="ml-2 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Results Grid/List */}
            {filteredHosts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredHosts.map((host) => (
                  <HostCard
                    key={host.id}
                    host={host}
                    onViewDetails={handleViewDetails}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.includes(host.id)}
                    variant={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No se encontraron cuidadores
                </h3>
                <p className="text-gray-500 mb-4">
                  Intenta ajustar tus filtros de búsqueda o ampliar el área de búsqueda
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
