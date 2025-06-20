import {
  Calendar,
  Heart,
  MapPin,
  Shield,
  Star,
  Stethoscope,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HostProfileModal from "@/components/HostProfileModal";
import VeterinaryProfileModal from "@/components/VeterinaryProfileModal";
import type { Host } from "@/services/hostService";
import { getHosts, getVeterinaries } from "@/services/hostService";
import { getPets } from "@/services/petService";
import logo from "@/assets/logo.jpeg";
import { useFavorites } from "@/hooks/useFavorites";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useState } from "react";

// Define the Component Host type to match what HostCard expects
interface ComponentHost {
  id: string;
  name: string;
  type: "veterinary" | "host";
  location: string;
  city: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  image: string;
  images: string[];
  services: string[];
  acceptedPets: string[];
  availability: boolean;
  responseTime: string;
  experience: string;
  description: string;
  certifications: string[];
  specialties: string[];
}

// Helper function to convert Supabase host to ComponentHost format
const convertSupabaseHostToComponentHost = (
  supabaseHost: Host
): ComponentHost => {
  const acceptedPets = Array.isArray(supabaseHost.accepted_pets)
    ? (supabaseHost.accepted_pets as string[])
    : [];

  const services = Array.isArray(supabaseHost.services)
    ? (supabaseHost.services as string[])
    : [];

  const images = Array.isArray(supabaseHost.images)
    ? (supabaseHost.images as string[])
    : [];

  // Map database type values to expected ComponentHost type values
  const mapHostType = (dbType: string): "veterinary" | "host" => {
    switch (dbType) {
      case 'veterinary':
        return 'veterinary';
      default:
        return 'host'; // Map all non-veterinary types to host
    }
  };

  return {
    id: supabaseHost.id,
    name: supabaseHost.name,
    type: mapHostType(supabaseHost.type),
    location: supabaseHost.location,
    city: supabaseHost.city,
    rating: Number(supabaseHost.rating),
    reviewCount: supabaseHost.review_count,
    pricePerNight: supabaseHost.price_per_night,
    image:
      images[0] ||
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    images: images,
    services: services,
    acceptedPets: acceptedPets,
    availability: supabaseHost.availability,
    responseTime: supabaseHost.response_time,
    experience: supabaseHost.experience || "",
    description: supabaseHost.description,
    certifications: Array.isArray(supabaseHost.certifications)
      ? (supabaseHost.certifications as string[])
      : [],
    specialties: Array.isArray(supabaseHost.specialties)
      ? (supabaseHost.specialties as string[])
      : [],
  };
};

const Favorites = () => {
  const { toast } = useToast();
  const { formatPrice } = useCurrency();
  const {
    favorites: allFavorites,
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  // Fetch pets using React Query
  const { data: allPets = [] } = useQuery({
    queryKey: ["pets"],
    queryFn: () => getPets(),
  });

  // Fetch hosts using React Query
  const { data: supabaseHosts = [] } = useQuery({
    queryKey: ["hosts-favorites"],
    queryFn: () => getHosts(),
  });

  // Fetch veterinaries using React Query
  const { data: allVeterinaries = [], isLoading: isLoadingVeterinaries, error: veterinariesError } = useQuery({
    queryKey: ["veterinaries-favorites"],
    queryFn: () => getVeterinaries(),
  });

  // Add console log to debug
  console.log('Veterinaries data:', { allVeterinaries, isLoadingVeterinaries, veterinariesError });

  // Convert Supabase hosts to ComponentHost format and filter out family hosts
  const allHosts = supabaseHosts
    .filter((host) => host.type !== "family") // Remove family hosts
    .map(convertSupabaseHostToComponentHost);

  // Filter favorites by type
  const hostFavoriteIds = allFavorites
    .filter((fav) => fav.item_type === "host")
    .map((fav) => fav.item_id);
  const petFavoriteIds = allFavorites
    .filter((fav) => fav.item_type === "pet")
    .map((fav) => fav.item_id);
  const veterinaryFavoriteIds = allFavorites
    .filter((fav) => fav.item_type === "veterinary")
    .map((fav) => fav.item_id);

  // Get favorite hosts directly from supabaseHosts
  const favoriteHosts = supabaseHosts.filter((host) =>
    hostFavoriteIds.includes(host.id)
  );
  const favoritePets = allPets.filter((pet) => petFavoriteIds.includes(pet.id));
  const favoriteVeterinaries = allVeterinaries.filter((vet) =>
    veterinaryFavoriteIds.includes(vet.id)
  );

  const toggleHostFavorite = (hostId: string) => {
    toggleFavorite(hostId, "host");
  };

  const togglePetFavorite = (petId: string) => {
    toggleFavorite(petId, "pet");
  };

  const toggleVeterinaryFavorite = (vetId: string) => {
    toggleFavorite(vetId, "veterinary");
  };

  const handleRemoveFavorite = (petId: string) => {
    toggleFavorite(petId, "pet");
  };

  const [selectedVeterinary, setSelectedVeterinary] = useState<any>(null);
  const [isVetModalOpen, setIsVetModalOpen] = useState(false);

  const handleViewVeterinary = (vet: any) => {
    setSelectedVeterinary({
      ...vet,
      images: [vet.image],
      certifications: [],
      specialties: [],
      description: "Clínica veterinaria especializada en atención integral de mascotas.",
      responseTime: "1-2 horas",
    });
    setIsVetModalOpen(true);
  };

  const handleCloseVetModal = () => {
    setIsVetModalOpen(false);
    setSelectedVeterinary(null);
  };

  const handleBookVeterinary = () => {
    toast({
      title: "Reserva iniciada",
      description: "Has iniciado el proceso de reserva con esta veterinaria.",
    });
    // Here you could add logic to handle the booking process
  };

  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);

  const handleViewHost = (host: Host) => {
    setSelectedHost(host);
    setIsHostModalOpen(true);
  };

  const handleCloseHostModal = () => {
    setIsHostModalOpen(false);
    setSelectedHost(null);
  };

  const handleSelectHost = (hostId: string) => {
    toast({
      title: "Cuidador seleccionado",
      description: "Has seleccionado este cuidador para tu mascota.",
    });
    // Here you could add logic to handle the host selection
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Mis Favoritos</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Todos tus lugares y servicios favoritos en un solo lugar
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hosts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hosts">
              Cuidadores ({favoriteHosts.length})
            </TabsTrigger>
            <TabsTrigger value="veterinaries">
              Veterinarias ({favoriteVeterinaries.length})
            </TabsTrigger>
            <TabsTrigger value="pets">
              Mascotas ({favoritePets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hosts" className="mt-6">
            {favoriteHosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteHosts.map((host) => {
                  const accepted_pets = Array.isArray(host.accepted_pets) ? host.accepted_pets : [];
                  const services = Array.isArray(host.services) ? host.services : [];
                  const certifications = Array.isArray(host.certifications) ? host.certifications : [];
                  const images = Array.isArray(host.images) ? host.images : [];
                  const image = images[0] || logo;

                  return (
                    <Card
                      key={host.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleViewHost(host)}
                    >
                      <div className="relative">
                        <img
                          src={image}
                          alt={host.name}
                          className="w-full h-48 object-cover"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.src = logo;
                          }}
                        />
                        {certifications.length > 0 && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            Certificado
                          </div>
                        )}
                      </div>

                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{host.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {Number(host.rating).toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({host.review_count})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {host.city}
                        </div>

                        <div className="text-gray-600 text-sm mb-4">
                          <div className="mb-2">
                            <span className="font-medium">Acepta: </span>
                            {accepted_pets.join(", ")}
                          </div>
                          <div>
                            <span className="font-medium">Servicios: </span>
                            {services.slice(0, 3).join(", ")}
                            {services.length > 3 && ` y ${services.length - 3} más`}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(host.price_per_night)}
                            <span className="text-sm font-normal text-gray-500">
                              /noche
                            </span>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg mb-4">
                  No tienes cuidadores favoritos aún
                </p>
                <Button onClick={() => (window.location.href = "/")}>
                  Explorar cuidadores
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="veterinaries" className="mt-6">
            {favoriteVeterinaries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteVeterinaries.map((vet) => {
                  const images = Array.isArray(vet.images) ? vet.images as string[] : [];
                  const services = Array.isArray(vet.services) ? vet.services as string[] : [];

                  return (
                    <Card
                      key={vet.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                      onClick={() => handleViewVeterinary(vet)}
                    >
                      <div className="relative">
                        <img
                          src={images[0] || logo}
                          alt={vet.name}
                          className="w-full h-48 object-cover"
                          onError={(
                            e: React.SyntheticEvent<HTMLImageElement>
                          ) => {
                            e.currentTarget.src = logo;
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleVeterinaryFavorite(vet.id)}
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-2"
                        >
                          <Heart
                            className="w-4 h-4 fill-red-500 text-red-500"
                          />
                        </Button>
                      </div>

                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{vet.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {Number(vet.rating).toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({vet.review_count})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {vet.city}
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {services.slice(0, 2).map((service, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {service}
                            </Badge>
                          ))}
                          {services.length > 2 && (
                            <Badge
                              variant="secondary"
                              className="text-xs"
                            >
                              +{services.length - 2} más
                            </Badge>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-green-600">
                            €{vet.price_per_night}/consulta
                          </span>
                          <Button size="sm">Ver detalles</Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Stethoscope className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg mb-4">
                  No tienes veterinarias favoritas aún
                </p>
                <Button
                  onClick={() => (window.location.href = "/veterinaries")}
                >
                  Explorar veterinarias
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pets" className="mt-6">
            {favoritePets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoritePets.map((pet) => {
                  const characteristics = Array.isArray(pet.characteristics)
                    ? (pet.characteristics as string[])
                    : [];

                  return (
                    <Card
                      key={pet.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        <img
                          src={pet.image || logo}
                          alt={pet.name}
                          className="w-full h-48 object-cover"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.src = logo;
                          }}
                        />
                        {pet.urgent && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                            URGENTE
                          </Badge>
                        )}
                      </div>

                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{pet.name}</h3>
                          <Badge variant="outline">{pet.type}</Badge>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                          {pet.breed} • {pet.age}
                        </p>

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
                          {characteristics.slice(0, 2).map((char, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {char}
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-2 text-xs text-gray-500">
                          Por {pet.shelter_name}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg mb-4">
                  No tienes mascotas favoritas para adopción aún
                </p>
                <Button onClick={() => (window.location.href = "/adoption")}>
                  Explorar mascotas
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Host Profile Modal */}
      <HostProfileModal
        host={selectedHost}
        isOpen={isHostModalOpen}
        onClose={handleCloseHostModal}
        onSelectHost={handleSelectHost}
      />

      {/* Veterinary Profile Modal */}
      <VeterinaryProfileModal
        veterinary={selectedVeterinary}
        isOpen={isVetModalOpen}
        onClose={handleCloseVetModal}
        onBooking={handleBookVeterinary}
        isFavorite={true}
        onToggleFavorite={toggleVeterinaryFavorite}
      />
    </div>
  );
};

export default Favorites;
