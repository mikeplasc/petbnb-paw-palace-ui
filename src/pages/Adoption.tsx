import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, MapPin, Calendar, Shield, AlertTriangle, Clock } from "lucide-react";
import AdoptionModal from "@/components/AdoptionModal";
import {
  getPets,
  createAdoptionRequest,
  type Pet,
} from "@/services/adoptionService";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import { useFavorites } from "@/hooks/useFavorites";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Link } from 'react-router-dom';
import logo from "@/assets/logo.jpeg";

const Adoption = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [petTypeFilter, setPetTypeFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { formatPrice } = useCurrency();
  // Debounce the search location to avoid searching on every keystroke
  const debouncedSearchLocation = useDebounce(searchLocation, 2000);

  const queryClient = useQueryClient();
  const { toggleFavorite, isFavorite } = useFavorites("pet");

  const {
    data: pets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pets", debouncedSearchLocation, petTypeFilter, sizeFilter],
    queryFn: () =>
      getPets({
        location: debouncedSearchLocation || undefined,
        type: petTypeFilter === "all" ? undefined : petTypeFilter,
        size: sizeFilter === "all" ? undefined : sizeFilter,
      }),
  });

  const adoptionMutation = useMutation({
    mutationFn: async ({ pet, userInfo }: { pet: Pet; userInfo: any }) => {
      return await createAdoptionRequest(pet, userInfo);
    },
    onSuccess: () => {
      toast.success("Solicitud de adopción enviada exitosamente");
      setIsModalOpen(false);
      setSelectedPet(null);
      queryClient.invalidateQueries({ queryKey: ["adoption-requests"] });
    },
    onError: (error) => {
      console.error("Error submitting adoption request:", error);
      toast.error("Error al enviar la solicitud de adopción");
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
      userInfo,
    });
  };

  const handleToggleFavorite = (petId: string) => {
    toggleFavorite(petId, "pet");
  };

  const currentUser = {
    name: "Usuario",
    email: "usuario@email.com",
    phone: "+34 123 456 789",
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
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Adopta una mascota
          </h1>
          <p className="text-gray-600">
            Dale un hogar a una mascota que lo necesita
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <Link
            to="/adoption/my-requests"
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Clock className="h-5 w-5 mr-2" />
            Mis solicitudes
          </Link>
          <Link
            to="/adoption/stories"
            className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Heart className="h-5 w-5 mr-2" />
            Historias de adopción
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div className="flex items-end">
            <Button
              onClick={() => {
                setSearchLocation("");
                setPetTypeFilter("all");
                setSizeFilter("all");
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
          const characteristics = Array.isArray(pet.characteristics)
            ? (pet.characteristics as string[])
            : [];
          const isCurrentlyFavorite = isFavorite(pet.id, "pet");

          return (
            <Card
              key={pet.id}
              className="group hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative">
                <img
                  src={
                    pet.image ||
                    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop"
                  }
                  alt={pet.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = logo;
                  }}
                />
                <button
                  onClick={() => handleToggleFavorite(pet.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isCurrentlyFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
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

              <CardContent className="flex-1">
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

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(pet.created_at || "").toLocaleDateString()}
                  </span>
                </div>
              </CardContent>

              <div className="border-t mt-auto">
                <div className="p-4 flex items-center justify-end">
                  <Button onClick={() => handleAdopt(pet)} size="sm">
                    Adoptar
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {pets.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            No se encontraron mascotas con los filtros aplicados.
          </p>
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
          isFavorite={isFavorite(selectedPet.id, "pet")}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default Adoption;
