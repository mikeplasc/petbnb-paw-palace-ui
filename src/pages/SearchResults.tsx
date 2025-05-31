import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Heart, MapPin, Shield, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getHosts } from "@/services/hostService";
import { useDebounce } from "@/hooks/useDebounce";
import { useFavorites } from "@/hooks/useFavorites";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import HostDetailsModal from "@/components/HostDetailsModal";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get("location") || "";
  const initialPetType = searchParams.get("petType") || "all";

  const [searchLocation, setSearchLocation] = useState(initialLocation);
  const [petType, setPetType] = useState(initialPetType);
  const [hostType, setHostType] = useState("all");
  const [minRating, setMinRating] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedHost, setSelectedHost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearchLocation = useDebounce(searchLocation, 1000);
  const debouncedMaxPrice = useDebounce(maxPrice, 1000);

  const { toggleFavorite, isFavorite } = useFavorites("host");

  const {
    data: hosts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "hosts",
      debouncedSearchLocation,
      petType,
      hostType,
      minRating,
      debouncedMaxPrice,
    ],
    queryFn: () => {
      const filters: any = {};

      if (debouncedSearchLocation) {
        filters.location = debouncedSearchLocation;
      }

      if (petType !== "all") {
        filters.type = petType;
      }

      if (hostType !== "all") {
        filters.type = hostType;
      }

      if (minRating !== "all") {
        filters.minRating = parseFloat(minRating);
      }

      if (debouncedMaxPrice) {
        filters.maxPrice = parseFloat(debouncedMaxPrice);
      }

      return getHosts(filters);
    },
  });

  const handleToggleFavorite = (hostId: string) => {
    toggleFavorite(hostId, "host");
  };

  const handleCardClick = (host: any) => {
    // Transform host data to match HostDetailsModal interface
    const transformedHost = {
      id: host.id,
      name: host.name,
      location: host.city,
      rating: Number(host.rating),
      reviewCount: host.review_count,
      pricePerNight: host.price_per_night,
      image: Array.isArray(host.images) && host.images.length > 0 ? host.images[0] : "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
      acceptedPets: Array.isArray(host.accepted_pets) ? host.accepted_pets : [],
      services: Array.isArray(host.services) ? host.services : [],
      type: host.type || 'host',
      description: host.description,
      experience: host.experience,
      availability: host.availability,
      phone: host.phone,
      email: host.email,
    };
    
    setSelectedHost(transformedHost);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHost(null);
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Resultados de Búsqueda
      </h1>

      {/* Filtros mejorados */}
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
              Tipo de mascota
            </label>
            <Select value={petType} onValueChange={setPetType}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Perro">Perros</SelectItem>
                <SelectItem value="Gato">Gatos</SelectItem>
                <SelectItem value="Ave">Aves</SelectItem>
                <SelectItem value="Conejo">Conejos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de servicio
            </label>
            <Select value={hostType} onValueChange={setHostType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="sitter">Cuidador</SelectItem>
                <SelectItem value="daycare">Guardería</SelectItem>
                <SelectItem value="walker">Paseador</SelectItem>
                <SelectItem value="veterinary">Veterinario</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valoración mínima
            </label>
            <Select value={minRating} onValueChange={setMinRating}>
              <SelectTrigger>
                <SelectValue placeholder="Valoración" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="4.5">4.5+ ⭐</SelectItem>
                <SelectItem value="4.0">4.0+ ⭐</SelectItem>
                <SelectItem value="3.5">3.5+ ⭐</SelectItem>
                <SelectItem value="3.0">3.0+ ⭐</SelectItem>
                <SelectItem value="2.5">2.5+ ⭐</SelectItem>
                <SelectItem value="2.0">2.0+ ⭐</SelectItem>
                <SelectItem value="1.5">1.5+ ⭐</SelectItem>
                <SelectItem value="1.0">1.0+ ⭐</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio máximo
            </label>
            <Input
              type="number"
              placeholder="Precio por noche"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={() => {
              setSearchLocation("");
              setPetType("all");
              setHostType("all");
              setMinRating("all");
              setMaxPrice("");
            }}
            variant="outline"
          >
            Limpiar filtros
          </Button>
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-6">
        <p className="text-gray-600">
          {hosts.length}{" "}
          {hosts.length === 1
            ? "resultado encontrado"
            : "resultados encontrados"}
        </p>
      </div>

      {/* Lista de hosts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hosts.map((host) => {
          const images = Array.isArray(host.images)
            ? (host.images as string[])
            : [];
          const services = Array.isArray(host.services)
            ? (host.services as string[])
            : [];
          const certifications = Array.isArray(host.certifications)
            ? (host.certifications as string[])
            : [];
          const isCurrentlyFavorite = isFavorite(host.id, "host");

          return (
            <Card
              key={host.id}
              className="group hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCardClick(host)}
            >
              <div className="relative">
                <img
                  src={
                    images[0] ||
                    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop"
                  }
                  alt={host.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop";
                    target.onerror = null; // prevents infinite loop if logo also fails
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(host.id);
                  }}
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
                {certifications.length > 0 && (
                  <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Certificado
                  </Badge>
                )}
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{host.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {Number(host.rating).toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({host.review_count})
                    </span>
                  </div>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {host.city}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {host.accepted_pets.map((acceptedPet, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {acceptedPet}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {host.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {services.slice(0, 3).map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {services.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{services.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Clock className="h-4 w-4" />
                  <span>Responde en {host.response_time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    €{host.price_per_night}
                    <span className="text-sm font-normal text-gray-500">
                      /noche
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {hosts.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No se encontraron resultados con los filtros aplicados.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Intenta ajustar los filtros o búsqueda.
          </p>
        </div>
      )}

      {/* Host Details Modal */}
      <HostDetailsModal
        host={selectedHost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedHost ? isFavorite(selectedHost.id, "host") : false}
      />
    </div>
  );
};

export default SearchResults;
