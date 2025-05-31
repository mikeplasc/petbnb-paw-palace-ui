
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MapPin, Calendar, Shield, Star, Search, Filter } from 'lucide-react';
import { getPets, Pet, createAdoptionRequest } from '@/services/adoptionService';
import { toast } from '@/hooks/use-toast';
import AdoptionModal from '@/components/AdoptionModal';

const Adoption = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    size: '',
    location: '',
    urgent: false
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const allPets = getPets();
    setPets(allPets);
    setFilteredPets(allPets);
  }, []);

  useEffect(() => {
    let filtered = pets;

    // Aplicar filtros
    if (filters.type) {
      filtered = filtered.filter(pet => pet.type === filters.type);
    }

    if (filters.size) {
      filtered = filtered.filter(pet => pet.size === filters.size);
    }

    if (filters.location) {
      filtered = filtered.filter(pet => 
        pet.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.urgent) {
      filtered = filtered.filter(pet => pet.urgent);
    }

    // Aplicar búsqueda por nombre o raza
    if (searchTerm) {
      filtered = filtered.filter(pet => 
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPets(filtered);
  }, [pets, filters, searchTerm]);

  const toggleFavorite = (petId: string) => {
    setFavorites(prev => 
      prev.includes(petId) 
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    );
    
    toast({
      title: favorites.includes(petId) ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: favorites.includes(petId) 
        ? "La mascota se eliminó de tu lista de favoritos" 
        : "La mascota se añadió a tu lista de favoritos",
    });
  };

  const handleAdoptionRequest = (petId: string, userInfo: any) => {
    try {
      createAdoptionRequest(petId, userInfo);
      toast({
        title: "¡Solicitud enviada!",
        description: "Tu solicitud de adopción ha sido enviada al refugio. Te contactarán pronto.",
      });
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar la solicitud. Intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      size: '',
      location: '',
      urgent: false
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Adopta una Mascota
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Dale una segunda oportunidad a un amigo que te necesita
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar por nombre o raza..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-gray-900"
                />
              </div>
              <Button
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        {showFilters && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de mascota" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="Perro">Perros</SelectItem>
                    <SelectItem value="Gato">Gatos</SelectItem>
                    <SelectItem value="Ave">Aves</SelectItem>
                    <SelectItem value="Conejo">Conejos</SelectItem>
                    <SelectItem value="Hámster">Hámsters</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.size} onValueChange={(value) => setFilters(prev => ({ ...prev, size: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="Pequeño">Pequeño</SelectItem>
                    <SelectItem value="Mediano">Mediano</SelectItem>
                    <SelectItem value="Grande">Grande</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Ubicación"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                />

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="urgent"
                    checked={filters.urgent}
                    onChange={(e) => setFilters(prev => ({ ...prev, urgent: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="urgent" className="text-sm font-medium">Solo urgentes</label>
                </div>
              </div>
              
              <Button onClick={resetFilters} variant="outline" size="sm">
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredPets.length} de {pets.length} mascotas disponibles
          </p>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                {pet.urgent && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    URGENTE
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(pet.id)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                >
                  <Heart className={`w-4 h-4 ${
                    favorites.includes(pet.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`} />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{pet.name}</h3>
                  <Badge variant="outline">{pet.type}</Badge>
                </div>

                <p className="text-sm text-gray-600 mb-2">{pet.breed} • {pet.age}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {pet.location}
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {pet.vaccinated && (
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      Vacunado
                    </Badge>
                  )}
                  {pet.sterilized && (
                    <Badge variant="secondary" className="text-xs">
                      Esterilizado
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  {pet.description}
                </p>

                <div className="text-lg font-bold text-green-600 mb-3">
                  €{pet.adoptionFee} cuota de adopción
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setSelectedPet(pet);
                      setIsModalOpen(true);
                    }}
                  >
                    Adoptar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedPet(pet);
                      setIsModalOpen(true);
                    }}
                  >
                    Ver detalles
                  </Button>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  Por {pet.shelterName}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron mascotas con los filtros seleccionados.
            </p>
            <Button onClick={resetFilters} className="mt-4">
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>

      {/* Adoption Modal */}
      {selectedPet && (
        <AdoptionModal
          pet={selectedPet}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPet(null);
          }}
          onSubmitAdoption={handleAdoptionRequest}
          isFavorite={favorites.includes(selectedPet.id)}
          onToggleFavorite={() => toggleFavorite(selectedPet.id)}
        />
      )}
    </div>
  );
};

export default Adoption;
