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
import HostCard from "@/components/HostCard";
import type { Host as SupabaseHost } from "@/services/hostService";
import { getHosts } from "@/services/hostService";
import { getPets } from "@/services/petService";
import logo from "@/assets/logo.jpeg";
import { useFavorites } from "@/hooks/useFavorites";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

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
  supabaseHost: SupabaseHost
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

  const favoriteHosts = allHosts.filter((host) =>
    hostFavoriteIds.includes(host.id)
  );
  const favoritePets = allPets.filter((pet) => petFavoriteIds.includes(pet.id));

  // Mock data for veterinaries - in real app this would come from a service
  const mockVeterinaries = [
    {
      id: "vet1",
      name: "Clínica Veterinaria San José",
      location: "Madrid, España",
      rating: 4.8,
      reviewCount: 156,
      image: "/placeholder.svg",
      services: ["Consulta general", "Cirugía", "Vacunación"],
      pricePerNight: 45,
    },
    {
      id: "vet2",
      name: "Hospital Veterinario Central",
      location: "Barcelona, España",
      rating: 4.9,
      reviewCount: 203,
      image: "/placeholder.svg",
      services: ["Emergencias 24h", "Radiografía", "Análisis"],
      pricePerNight: 55,
    },
  ];

  const toggleHostFavorite = (hostId: string) => {
    toggleFavorite(hostId, "host");
  };

  const togglePetFavorite = (petId: string) => {
    toggleFavorite(petId, "pet");
  };

  const toggleVeterinaryFavorite = (vetId: string) => {
    const updatedFavorites = localStorage.getItem("veterinaryFavorites");
    const veterinaryFavorites = updatedFavorites
      ? JSON.parse(updatedFavorites)
      : [];
    const isCurrentlyFavorite = veterinaryFavorites.includes(vetId);

    const updatedVetFavorites = isCurrentlyFavorite
      ? veterinaryFavorites.filter((id: string) => id !== vetId)
      : [...veterinaryFavorites, vetId];

    localStorage.setItem(
      "veterinaryFavorites",
      JSON.stringify(updatedVetFavorites)
    );

    toast({
      title: isCurrentlyFavorite
        ? "Eliminado de favoritos"
        : "Añadido a favoritos",
      description: isCurrentlyFavorite
        ? "La veterinaria se eliminó de tus favoritos"
        : "La veterinaria se añadió a tus favoritos",
    });
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
              Veterinarias ({mockVeterinaries.length})
            </TabsTrigger>
            <TabsTrigger value="pets">
              Mascotas ({favoritePets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hosts" className="mt-6">
            {favoriteHosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteHosts.map((host) => (
                  <HostCard
                    key={host.id}
                    host={host}
                    isFavorite={true}
                    onToggleFavorite={toggleHostFavorite}
                    onViewDetails={(hostId) =>
                      console.log("Ver detalles:", hostId)
                    }
                  />
                ))}
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
            {mockVeterinaries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVeterinaries.map((vet) => {
                  const updatedFavorites = localStorage.getItem(
                    "veterinaryFavorites"
                  );
                  const veterinaryFavorites = updatedFavorites
                    ? JSON.parse(updatedFavorites)
                    : [];
                  const isCurrentlyFavorite = veterinaryFavorites.includes(
                    vet.id
                  );

                  return (
                    <Card
                      key={vet.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        <img
                          src={vet.image || logo}
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
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isCurrentlyFavorite
                                ? "fill-red-500 text-red-500"
                                : ""
                            }`}
                          />
                        </Button>
                      </div>

                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{vet.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {vet.rating}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {vet.location}
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {vet.services.slice(0, 2).map((service, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-green-600">
                            €{vet.pricePerNight}/consulta
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
                          onError={(
                            e: React.SyntheticEvent<HTMLImageElement>
                          ) => {
                            e.currentTarget.src = logo;
                          }}
                        />
                        {pet.urgent && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                            URGENTE
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePetFavorite(pet.id)}
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        >
                          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                        </Button>
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

                        <div className="text-lg font-bold text-green-600 mb-3">
                          €{pet.adoption_fee} cuota de adopción
                        </div>

                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          Ver detalles
                        </Button>

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
    </div>
  );
};

export default Favorites;
