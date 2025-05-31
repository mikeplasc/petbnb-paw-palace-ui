import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Calendar } from "lucide-react"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DateRange } from "react-day-picker"
import { CalendarDateRangePicker } from "@/components/ui/calendar"
import { Heart, MapPin, Clock, Shield, Stethoscope, Search, LucideIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data for adoption pets - in real app this would come from a service
const mockPets = [
  {
    id: 'pet1',
    name: 'Buddy',
    age: '2 años',
    breed: 'Golden Retriever',
    location: 'Madrid, España',
    images: ['/placeholder.svg'],
    isUrgent: true,
    description: 'Amigable y juguetón, ideal para familias activas.',
  },
  {
    id: 'pet2',
    name: 'Luna',
    age: '1 año',
    breed: 'Siamese',
    location: 'Barcelona, España',
    images: ['/placeholder.svg'],
    isUrgent: false,
    description: 'Cariñosa y tranquila, perfecta para un hogar relajado.',
  },
  {
    id: 'pet3',
    name: 'Max',
    age: '3 años',
    breed: 'Labrador',
    location: 'Valencia, España',
    images: ['/placeholder.svg'],
    isUrgent: false,
    description: 'Muy enérgico y leal, necesita mucho ejercicio.',
  },
  {
    id: 'pet4',
    name: 'Bella',
    age: '6 meses',
    breed: 'Poodle',
    location: 'Sevilla, España',
    images: ['/placeholder.svg'],
    isUrgent: true,
    description: 'Inteligente y adorable, fácil de entrenar.',
  },
];

const Adoption = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Add favorites state
  const [petFavorites, setPetFavorites] = useState<string[]>([]);

  const [selectedPet, setSelectedPet] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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

  const filteredPets = mockPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pet.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || pet.location.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesBreed = selectedBreed === 'all' || pet.breed.toLowerCase() === selectedBreed.toLowerCase();
    const matchesUrgent = !isUrgent || pet.isUrgent === isUrgent;

    return matchesSearch && matchesCity && matchesBreed && matchesUrgent;
  });

  const handleViewDetails = (pet: any) => {
    console.log('Ver detalles de mascota:', pet.id);
    setSelectedPet(pet);
    setIsProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encuentra tu compañero ideal
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Adopta una mascota y cambia una vida
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <section className="bg-white py-6 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por nombre, raza o ubicación..."
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
                <SelectItem value="Madrid">Madrid</SelectItem>
                <SelectItem value="Barcelona">Barcelona</SelectItem>
                <SelectItem value="Valencia">Valencia</SelectItem>
                <SelectItem value="Sevilla">Sevilla</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedBreed} onValueChange={setSelectedBreed}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Todas las razas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las razas</SelectItem>
                <SelectItem value="Golden Retriever">Golden Retriever</SelectItem>
                <SelectItem value="Siamese">Siamese</SelectItem>
                <SelectItem value="Labrador">Labrador</SelectItem>
                <SelectItem value="Poodle">Poodle</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setIsUrgent(!isUrgent)}
              className={`w-full md:w-48 justify-center ${isUrgent ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
            >
              {isUrgent ? 'Urgentes (Activado)' : 'Mostrar solo urgentes'}
            </Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredPets.length} mascotas encontradas
            </h2>
            <p className="text-gray-600">
              Listado de mascotas disponibles para adopción
            </p>
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
                  {pet.isUrgent && (
                    <Badge className="absolute bottom-2 left-2 bg-red-500 text-white">
                      Urgente
                    </Badge>
                  )}
                  <Badge className="absolute bottom-2 right-2 bg-white text-gray-600">
                    {pet.age}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {pet.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {pet.breed} - {pet.location}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {pet.description}
                  </p>
                </CardContent>

                <div className="p-4 border-t border-gray-200">
                  <Button onClick={() => handleViewDetails(pet)} className="w-full">
                    Ver detalles
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredPets.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron mascotas
              </h3>
              <p className="text-gray-500">
                Intenta ajustar tus filtros de búsqueda
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {selectedPet?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedPet?.breed} - {selectedPet?.location}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Images Gallery */}
            <div className="grid grid-cols-2 gap-4">
              {selectedPet?.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedPet?.name} - Imagen ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Basic Info */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{selectedPet?.location}</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <span className="font-semibold mr-2">Edad:</span>
                  <span className="text-gray-500">{selectedPet?.age}</span>
                </div>

                <p className="text-gray-700 mb-4">{selectedPet?.description}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Adoption;
