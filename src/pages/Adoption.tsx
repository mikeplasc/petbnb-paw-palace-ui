
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MapPin, Search, Calendar, Shield } from 'lucide-react';
import { AdoptionModal } from '@/components/AdoptionModal';
import { AdoptionConfirmModal } from '@/components/AdoptionConfirmModal';
import { mockPets } from '@/data/mockPets';
import { Pet } from '@/types/adoption';
import { toast } from '@/hooks/use-toast';

const Adoption = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  // Add favorites state
  const [petFavorites, setPetFavorites] = useState<string[]>([]);

  useEffect(() => {
    setPets(mockPets);
  }, []);

  // Add useEffect to load favorites from localStorage
  useEffect(() => {
    const savedPetFavorites = JSON.parse(localStorage.getItem('petFavorites') || '[]');
    setPetFavorites(savedPetFavorites);
  }, []);

  // Add function to toggle pet favorites
  const togglePetFavorite = (petId: string) => {
    const updatedFavorites = petFavorites.includes(petId)
      ? petFavorites.filter(id => id !== petId)
      : [...petFavorites, petId];
    
    setPetFavorites(updatedFavorites);
    localStorage.setItem('petFavorites', JSON.stringify(updatedFavorites));
    
    toast({
      title: petFavorites.includes(petId) ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: petFavorites.includes(petId) 
        ? "La mascota se eliminó de tus favoritos" 
        : "La mascota se añadió a tus favoritos",
    });
  };

  // Filter pets based on search criteria
  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = selectedSpecies === 'all' || pet.species === selectedSpecies;
    const matchesAge = selectedAge === 'all' || pet.ageCategory === selectedAge;
    const matchesCity = selectedCity === 'all' || pet.location.includes(selectedCity);
    
    return matchesSearch && matchesSpecies && matchesAge && matchesCity;
  });

  const handleAdoptClick = (pet: Pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleAdoptConfirm = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const cities = [...new Set(pets.map(pet => pet.location.split(',')[0].trim()))];
  const species = [...new Set(pets.map(pet => pet.species))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-warm-100 to-sage-100">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Encuentra tu nuevo mejor amigo
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Miles de mascotas esperan encontrar un hogar lleno de amor. 
            Descubre tu compañero perfecto hoy mismo.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Mascotas verificadas</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span>Proceso seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span>Seguimiento post-adopción</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-white border-b border-gray-200">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por nombre o raza..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las especies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las especies</SelectItem>
                {species.map((species) => (
                  <SelectItem key={species} value={species}>
                    {species === 'dog' ? 'Perros' : species === 'cat' ? 'Gatos' : 'Otros'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAge} onValueChange={setSelectedAge}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las edades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las edades</SelectItem>
                <SelectItem value="puppy">Cachorro</SelectItem>
                <SelectItem value="young">Joven</SelectItem>
                <SelectItem value="adult">Adulto</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
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

            <Button className="bg-petbnb-500 hover:bg-petbnb-600">
              Buscar mascotas
            </Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Mascotas disponibles ({filteredPets.length})
            </h2>
            <Select defaultValue="newest">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Más recientes</SelectItem>
                <SelectItem value="oldest">Más antiguos</SelectItem>
                <SelectItem value="youngest">Más jóvenes</SelectItem>
                <SelectItem value="name">Por nombre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative">
                  <img
                    src={pet.images[0]}
                    alt={pet.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => togglePetFavorite(pet.id)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        petFavorites.includes(pet.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
                      }`}
                    />
                  </button>
                  <Badge className="absolute top-2 left-2 bg-blue-500/90 text-white">
                    {pet.ageInMonths < 12 ? `${pet.ageInMonths}m` : `${Math.floor(pet.ageInMonths / 12)}a`}
                  </Badge>
                  {pet.isUrgent && (
                    <Badge className="absolute top-10 left-2 bg-red-500/90 text-white">
                      Urgente
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {pet.gender === 'male' ? 'Macho' : 'Hembra'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{pet.breed}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-3 h-3 mr-1" />
                    {pet.location}
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {pet.description}
                  </p>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button 
                    onClick={() => handleAdoptClick(pet)}
                    className="w-full bg-warm-500 hover:bg-warm-600 text-white"
                  >
                    Conocer más
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredPets.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🐾</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron mascotas
              </h3>
              <p className="text-gray-600">
                Intenta ajustar tus filtros de búsqueda
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <AdoptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pet={selectedPet}
        onAdopt={handleAdoptConfirm}
      />

      <AdoptionConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        pet={selectedPet}
      />
    </div>
  );
};

export default Adoption;
