
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Star, Clock, Phone, Heart } from 'lucide-react';
import VeterinaryProfileModal from '@/components/VeterinaryProfileModal';
import VeterinaryBookingModal from '@/components/VeterinaryBookingModal';
import { mockHosts } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const Veterinaries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');
  const [selectedVeterinary, setSelectedVeterinary] = useState<any>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Add favorites state
  const [veterinaryFavorites, setVeterinaryFavorites] = useState<string[]>([]);

  // Filter only veterinary hosts
  const veterinaries = mockHosts.filter(host => host.type === 'veterinary');

  // Add useEffect to load favorites from localStorage
  useEffect(() => {
    const savedVetFavorites = JSON.parse(localStorage.getItem('veterinaryFavorites') || '[]');
    setVeterinaryFavorites(savedVetFavorites);
  }, []);

  // Add function to toggle veterinary favorites
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

  // Get unique cities for filter
  const cities = [...new Set(veterinaries.map(vet => vet.location.split(',')[0].trim()))];

  // Filter and sort veterinaries
  const filteredVeterinaries = veterinaries
    .filter(vet => {
      const matchesSearch = vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vet.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity === 'all' || vet.location.includes(selectedCity);
      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.pricePerNight - b.pricePerNight;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

  const handleViewProfile = (vet: any) => {
    setSelectedVeterinary(vet);
    setIsProfileModalOpen(true);
  };

  const handleBookingFromProfile = () => {
    setIsProfileModalOpen(false);
    setIsBookingModalOpen(true);
  };

  const handleDirectBooking = (vet: any) => {
    setSelectedVeterinary(vet);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="bg-gradient-to-br from-petbnb-50 to-warm-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Veterinarias certificadas
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Encuentra la mejor atención médica para tu mascota con nuestras veterinarias verificadas
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Disponibles 24/7</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Profesionales certificados</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Emergencias atendidas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-white border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por nombre o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Todas las ciudades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ciudades</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Mejor calificación</SelectItem>
                <SelectItem value="price">Menor precio</SelectItem>
                <SelectItem value="reviews">Más reseñas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Veterinarias disponibles ({filteredVeterinaries.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredVeterinaries.map((vet) => (
              <Card key={vet.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <img
                      src={vet.images[0]}
                      alt={vet.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    <button
                      onClick={() => toggleVeterinaryFavorite(vet.id)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          veterinaryFavorites.includes(vet.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <CardContent className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{vet.name}</h3>
                      <Badge className="bg-green-100 text-green-800">
                        24/7 Disponible
                      </Badge>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(vet.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {vet.rating} ({vet.reviewCount} reseñas)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {vet.location}
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {vet.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Tiempo de respuesta: 2-4 horas</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        <span>Emergencias</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-petbnb-600">
                          ${vet.pricePerNight}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">por consulta</span>
                      </div>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProfile(vet)}
                        >
                          Ver perfil
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDirectBooking(vet)}
                          className="bg-petbnb-500 hover:bg-petbnb-600"
                        >
                          Agendar cita
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {filteredVeterinaries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron veterinarias
              </h3>
              <p className="text-gray-600">
                Intenta ajustar tus filtros de búsqueda
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Veterinaries */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir nuestras veterinarias?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Todas nuestras veterinarias están certificadas y ofrecen servicios de calidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">🩺</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Profesionales certificados</h3>
              <p className="text-gray-600">
                Médicos veterinarios con experiencia y certificaciones actualizadas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">⏰</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Disponibilidad 24/7</h3>
              <p className="text-gray-600">
                Atención de emergencias las 24 horas del día, los 7 días de la semana
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">📱</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fácil agendamiento</h3>
              <p className="text-gray-600">
                Sistema simple para agendar citas y consultas médicas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <VeterinaryProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        veterinary={selectedVeterinary}
        onBooking={handleBookingFromProfile}
        isFavorite={selectedVeterinary ? veterinaryFavorites.includes(selectedVeterinary.id) : false}
        onToggleFavorite={toggleVeterinaryFavorite}
      />

      <VeterinaryBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        veterinary={selectedVeterinary}
      />
    </div>
  );
};

export default Veterinaries;
