
import {
  Calendar,
  Clock,
  Heart,
  Home,
  MapPin,
  Shield,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Host, getHosts } from "@/services/hostService";
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
import { Checkbox } from "@/components/ui/checkbox";
import HostProfileModal from "@/components/HostProfileModal";
import logo from "@/assets/logo.jpeg";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useFavorites } from "@/hooks/useFavorites";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface HostFilters {
  location?: string;
  petType?: string;
  type?: string;
  minRating?: number;
  maxPrice?: number;
  certified?: boolean;
}

const Hosts = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [petType, setPetType] = useState("all");
  const [minRating, setMinRating] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearchLocation = useDebounce(searchLocation, 1000);
  const debouncedMaxPrice = useDebounce(maxPrice, 1000);

  const { toggleFavorite, isFavorite } = useFavorites();
  const { formatPrice } = useCurrency();
  const { toast } = useToast();

  const {
    data: hosts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "hosts",
      debouncedSearchLocation,
      petType,
      minRating,
      debouncedMaxPrice,
      certifiedOnly,
    ],
    queryFn: () => {
      const filters: HostFilters = {};

      if (debouncedSearchLocation) {
        filters.location = debouncedSearchLocation;
      }

      if (petType !== "all") {
        filters.petType = petType;
      }

      if (minRating !== "all") {
        filters.minRating = parseFloat(minRating);
      }

      if (debouncedMaxPrice) {
        filters.maxPrice = parseFloat(debouncedMaxPrice);
      }

      if (certifiedOnly) {
        filters.certified = true;
      }

      return getHosts(filters);
    },
  });

  const handleToggleFavorite = (hostId: string) => {
    toggleFavorite(hostId, "host");
  };

  const handleViewProfile = (host: Host) => {
    setSelectedHost(host);
    setIsModalOpen(true);
  };

  const handleSelectHost = (hostId: string) => {
    const host = hosts.find(h => h.id === hostId);
    if (host) {
      toast({
        title: "Cuidador seleccionado",
        description: `Has seleccionado a ${host.name} como tu cuidador.`,
      });
      // Here you could add logic to save the selection or navigate to booking
    }
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
        Cuidadores de Mascotas
      </h1>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificación
            </label>
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                id="certified"
                checked={certifiedOnly}
                onCheckedChange={(checked) => setCertifiedOnly(!!checked)}
              />
              <label
                htmlFor="certified"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Solo certificados
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={() => {
              setSearchLocation("");
              setPetType("all");
              setMinRating("all");
              setMaxPrice("");
              setCertifiedOnly(false);
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
            ? "cuidador encontrado"
            : "cuidadores encontrados"}
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

          return (
            <Card
              key={host.id}
              className="group hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative">
                <img
                  src={images[0] || logo}
                  alt={host.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = logo;
                  }}
                />
                <button
                  onClick={() => handleToggleFavorite(host.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite(host.id, "host")
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
                {certifications.length > 0 && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 cursor-default">
                    <Shield className="h-3 w-3" />
                    Certificado
                  </div>
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

              <CardContent className="flex-1">
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

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Responde en {host.response_time}</span>
                </div>
              </CardContent>

              <div className="border-t mt-auto">
                <div className="p-4 flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    {formatPrice(host.price_per_night)}
                    <span className="text-sm font-normal text-gray-500">
                      /noche
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleViewProfile(host)}
                  >
                    Ver perfil
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {hosts.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No se encontraron cuidadores con los filtros aplicados.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Intenta ajustar los filtros o búsqueda.
          </p>
        </div>
      )}

      {/* Host Profile Modal */}
      <HostProfileModal
        host={selectedHost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectHost={handleSelectHost}
      />
    </div>
  );
};

export default Hosts;
