import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Heart, MapPin, Shield, Search, Filter, Edit } from 'lucide-react';
import { getPets, Pet, createAdoptionRequest } from '@/services/adoptionService';
import { toast } from '@/hooks/use-toast';
import { useCurrency } from '@/contexts/CurrencyContext';
import AdoptionModal from '@/components/AdoptionModal';
import AdoptionConfirmModal from '@/components/AdoptionConfirmModal';
import AddPetForm from '@/components/AddPetForm';
import EditPetForm from '@/components/EditPetForm';
import CurrencySelector from '@/components/CurrencySelector';

const PETS_PER_PAGE = 12;
const CURRENT_USER_EMAIL = 'juan.perez@email.com'; // Simular usuario actual

const Adoption = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [petToAdopt, setPetToAdopt] = useState<Pet | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    type: '',
    size: '',
    location: '',
    urgent: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const { formatPrice } = useCurrency();

  // Mock user data - in real app this would come from authentication
  const currentUser = {
    name: 'Juan Pérez',
    email: CURRENT_USER_EMAIL,
    phone: '+34 612 345 678'
  };

  useEffect(() => {
    const allPets = getPets();
    setPets(allPets);
    setFilteredPets(allPets);
    
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('petFavorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    let filtered = [...pets];

    // Apply search term filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(pet => 
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filters.type && filters.type !== '') {
      filtered = filtered.filter(pet => pet.type === filters.type);
    }

    // Apply size filter
    if (filters.size && filters.size !== '') {
      filtered = filtered.filter(pet => pet.size === filters.size);
    }

    // Apply location filter
    if (filters.location && filters.location.trim() !== '') {
      filtered = filtered.filter(pet => 
        pet.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply urgent filter
    if (filters.urgent) {
      filtered = filtered.filter(pet => pet.urgent === true);
    }

    console.log('Applying filters:', { searchTerm, filters });
    console.log('Filtered pets count:', filtered.length);
    
    setFilteredPets(filtered);
    setCurrentPage(1);
  }, [pets, filters, searchTerm]);

  const toggleFavorite = (petId: string) => {
    const updatedFavorites = favorites.includes(petId) 
      ? favorites.filter(id => id !== petId)
      : [...favorites, petId];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('petFavorites', JSON.stringify(updatedFavorites));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('favoritesUpdated', { 
      detail: { type: 'pet', favorites: updatedFavorites } 
    }));
    
    toast({
      title: favorites.includes(petId) ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: favorites.includes(petId) 
        ? "La mascota se eliminó de tu lista de favoritos" 
        : "La mascota se añadió a tu lista de favoritos",
    });
  };

  const handleQuickAdopt = (pet: Pet) => {
    setPetToAdopt(pet);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAdoption = () => {
    if (petToAdopt) {
      try {
        createAdoptionRequest(petToAdopt.id, {
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          message: `Solicitud rápida de adopción para ${petToAdopt.name}`
        });
        
        toast({
          title: "¡Solicitud enviada!",
          description: "Tu solicitud de adopción ha sido enviada al refugio. Te contactarán pronto.",
        });
        
        setIsConfirmModalOpen(false);
        setPetToAdopt(null);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo enviar la solicitud. Intenta nuevamente.",
          variant: "destructive",
        });
      }
    }
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

  const handleAddPet = (newPetData: any) => {
    const updatedPets = [...pets, newPetData];
    setPets(updatedPets);
    setFilteredPets(updatedPets);
    
    console.log('New pet added:', newPetData);
  };

  const handleUpdatePet = (updatedPet: Pet) => {
    const updatedPets = pets.map(pet => 
      pet.id === updatedPet.id ? updatedPet : pet
    );
    setPets(updatedPets);
    setFilteredPets(updatedPets);
    
    console.log('Pet updated:', updatedPet);
  };

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setIsEditModalOpen(true);
  };

  const canEditPet = (pet: Pet) => {
    // Solo puede editar si es el mismo email del refugio que el usuario actual
    return pet.shelterContact === currentUser.email;
  };

  // Paginación
  const totalPages = Math.ceil(filteredPets.length / PETS_PER_PAGE);
  const startIndex = (currentPage - 1) * PETS_PER_PAGE;
  const endIndex = startIndex + PETS_PER_PAGE;
  const currentPets = filteredPets.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        {/* Add Pet Form and Currency Selector */}
        <div className="mb-6 flex justify-between items-center">
          <CurrencySelector />
          <AddPetForm onAddPet={handleAddPet} />
        </div>

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
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredPets.length)} de {filteredPets.length} mascotas
          </p>
          <p className="text-sm text-gray-500">
            Página {currentPage} de {totalPages}
          </p>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentPets.map((pet) => (
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
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(pet.id)}
                    className="bg-white/80 hover:bg-white"
                  >
                    <Heart className={`w-4 h-4 ${
                      favorites.includes(pet.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`} />
                  </Button>
                  {canEditPet(pet) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPet(pet)}
                      className="bg-white/80 hover:bg-white"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </Button>
                  )}
                </div>
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
                  {formatPrice(pet.adoptionFee)} cuota de adopción
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleQuickAdopt(pet)}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

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

      {/* Details Modal */}
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
          currentUser={currentUser}
        />
      )}

      {/* Edit Modal */}
      {editingPet && (
        <EditPetForm
          pet={editingPet}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingPet(null);
          }}
          onUpdatePet={handleUpdatePet}
        />
      )}

      {/* Confirmation Modal */}
      <AdoptionConfirmModal
        pet={petToAdopt}
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setPetToAdopt(null);
        }}
        onConfirm={handleConfirmAdoption}
      />
    </div>
  );
};

export default Adoption;
