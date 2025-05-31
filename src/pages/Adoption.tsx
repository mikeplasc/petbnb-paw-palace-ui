
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MapPin, Calendar, Shield, AlertTriangle } from 'lucide-react';
import AdoptionModal from '@/components/AdoptionModal';
import { getPets, Pet } from '@/services/petService';
import { createAdoptionRequest } from '@/services/adoptionService';
import { toast } from 'sonner';

const Adoption = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [petTypeFilter, setPetTypeFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { data: pets = [], isLoading, error } = useQuery({
    queryKey: ['pets', searchLocation, petTypeFilter, sizeFilter, ageFilter],
    queryFn: () => getPets({
      location: searchLocation || undefined,
      type: petTypeFilter === 'all' ? undefined : petTypeFilter,
      size: sizeFilter === 'all' ? undefined : sizeFilter,
      age: ageFilter === 'all' ? undefined : ageFilter,
    }),
  });

  const adoptionMutation = useMutation({
    mutationFn: async ({ pet, userInfo }: {
      pet: Pet;
      userInfo: any;
    }) => {
      return await createAdoptionRequest(pet, userInfo);
    },
    onSuccess: () => {
      toast.success('Solicitud de adopción enviada exitosamente');
      setIsModalOpen(false);
      setSelectedPet(null);
      queryClient.invalidateQueries({ queryKey: ['adoption-requests'] });
    },
    onError: (error) => {
      console.error('Error submitting adoption request:', error);
      toast.error('Error al enviar la solicitud de adopción');
    },
  });

  const handleAdopt = (pet: Pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleSubmitAdoption = async (petId: string, userInfo: any) => {
    if (!selectedPet) return;
    
    adoptionMutation.mutate({
      pet: selectedPet,
      userInfo
    });
  };

  const handleToggleFavorite = (petId: string) => {
    setFavorites(prev => 
      prev.includes(petId) 
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    );
  };

  const currentUser = {
    name: 'Usuario',
    email: 'usuario@email.com',
    phone: '+34 123 456 789'
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
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-8 w-8 text-pink-600" />
        <h1 className="text-3xl font-bold text-gray-900">Adopción de Mascotas</h1>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
              Tipo
            </label>
            <Select value={petTypeFilter} onValueChange={setPetTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Perro">Perros</SelectItem>
                <SelectItem value="Gato">Gatos</SelectItem>
                <SelectItem value="Ave">Aves</SelectItem>
                <SelectItem value="Conejo">Conejos</SelectItem>
                <SelectItem value="Hámster">Hámsters</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tamaño
            </label>
            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Pequeño">Pequeño</SelectItem>
                <SelectItem value="Mediano">Mediano</SelectItem>
                <SelectItem value="Grande">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Edad
            </label>
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Cachorro">Cachorro</SelectItem>
                <SelectItem value="Joven">Joven</SelectItem>
                <SelectItem value="Adulto">Adulto</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={() => {
                setSearchLocation('');
                setPetTypeFilter('all');
                setSizeFilter('all');
                setAgeFilter('all');
              }}
              variant="outline" 
              className="w-full"
            >
              Limpiar
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de mascotas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => {
          const characteristics = Array.isArray(pet.characteristics) ? pet.characteristics as string[] : [];
          const isFavorite = favorites.includes(pet.id);

          return (
            <Card key={pet.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <button
                  onClick={() => handleToggleFavorite(pet.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
                {pet.urgent && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Urgente
                  </Badge>
                )}
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{pet.name}</CardTitle>
                  <Badge variant="outline">{pet.type}</Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {pet.location}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <span className="font-medium">Raza:</span> {pet.breed}
                  </div>
                  <div>
                    <span className="font-medium">Edad:</span> {pet.age}
                  </div>
                  <div>
                    <span className="font-medium">Tamaño:</span> {pet.size}
                  </div>
                  <div>
                    <span className="font-medium">Género:</span> {pet.gender}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {pet.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {pet.vaccinated && (
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Vacunado
                    </Badge>
                  )}
                  {pet.sterilized && (
                    <Badge variant="secondary" className="text-xs">
                      Esterilizado
                    </Badge>
                  )}
                  {characteristics.slice(0, 2).map((char, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {char}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{pet.date_added}</span>
                  </div>
                  <div className="font-medium text-green-600">
                    €{pet.adoption_fee}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleAdopt(pet)}
                    className="flex-1"
                  >
                    Adoptar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAdopt(pet)}
                  >
                    Más info
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {pets.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No se encontraron mascotas con los filtros aplicados.</p>
        </div>
      )}

      {/* Modal de adopción */}
      {selectedPet && (
        <AdoptionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPet(null);
          }}
          pet={selectedPet}
          onSubmitAdoption={handleSubmitAdoption}
          onToggleFavorite={() => handleToggleFavorite(selectedPet.id)}
          isFavorite={favorites.includes(selectedPet.id)}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default Adoption;
