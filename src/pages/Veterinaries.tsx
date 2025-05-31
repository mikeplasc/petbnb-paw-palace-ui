
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, MapPin, Clock, Shield, Stethoscope, Search } from 'lucide-react';
import { mockHosts, cities } from '@/data/mockData';

const Veterinaries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Filter only veterinary hosts
  const veterinaries = mockHosts.filter(host => host.type === 'veterinary');

  const filteredVeterinaries = veterinaries
    .filter(vet => {
      const matchesSearch = vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vet.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity === 'all' || vet.city === selectedCity;
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

  const handleViewDetails = (vetId: string) => {
    console.log('Ver detalles de veterinaria:', vetId);
  };

  const handleBooking = (vetId: string) => {
    console.log('Reservar en veterinaria:', vetId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-petbnb-50 to-warm-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-petbnb-600 to-primary-600">
        <div className="container mx-auto text-center text-white">
          <div className="max-w-3xl mx-auto">
            <Stethoscope className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">
              Veterinarias certificadas
            </h1>
            <p className="text-xl mb-8 text-petbnb-100">
              Cuidado médico profesional 24/7 para tu mascota cuando más lo necesita
            </p>
            
            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold">{veterinaries.length}+</div>
                <div className="text-petbnb-100">Clínicas certificadas</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-petbnb-100">Atención de emergencia</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-petbnb-100">Personal certificado</div>
              </div>
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
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredVeterinaries.length} veterinarias encontradas
            </h2>
            <p className="text-gray-600">
              Clínicas y hospitales veterinarios certificados para el cuidado de tu mascota
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredVeterinaries.map((vet) => (
              <Card key={vet.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={vet.images[0]}
                      alt={vet.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:w-2/3">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-bold text-gray-900 mb-1">
                            {vet.name}
                          </CardTitle>
                          <div className="flex items-center text-gray-600 text-sm mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {vet.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="font-semibold">{vet.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">
                              ({vet.reviewCount})
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-petbnb-600">
                            ${vet.pricePerNight}
                            <span className="text-sm font-normal text-gray-500">/noche</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                        {vet.description}
                      </p>

                      {/* Services */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {vet.services.slice(0, 3).map((service, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {vet.services.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{vet.services.length - 3} más
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Certifications */}
                      {vet.certifications && (
                        <div className="mb-3">
                          <div className="flex items-center text-green-600 text-sm">
                            <Shield className="w-4 h-4 mr-1" />
                            <span className="font-medium">Certificaciones:</span>
                            <span className="ml-1">{vet.certifications.join(', ')}</span>
                          </div>
                        </div>
                      )}

                      {/* Footer info */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Responde en {vet.responseTime}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(vet.id)}
                          >
                            Ver perfil
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleBooking(vet.id)}
                            className="bg-petbnb-600 hover:bg-petbnb-700"
                          >
                            Reservar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredVeterinaries.length === 0 && (
            <div className="text-center py-12">
              <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron veterinarias
              </h3>
              <p className="text-gray-500">
                Intenta ajustar tus filtros de búsqueda
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Certified Vets Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir veterinarias certificadas?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestras clínicas veterinarias ofrecen el más alto nivel de cuidado médico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal certificado</h3>
                <p className="text-gray-600 text-sm">
                  Todos nuestros veterinarios cuentan con cédulas profesionales y certificaciones vigentes
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Atención 24/7</h3>
                <p className="text-gray-600 text-sm">
                  Servicio de emergencia disponible las 24 horas, los 7 días de la semana
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Equipamiento moderno</h3>
                <p className="text-gray-600 text-sm">
                  Instalaciones con tecnología de vanguardia para diagnóstico y tratamiento
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Veterinaries;
