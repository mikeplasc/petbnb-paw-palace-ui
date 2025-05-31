import { Calendar, Clock, MapPin, Star, Stethoscope } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Host, getVeterinaries } from "@/services/hostService";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VeterinaryBookingModal from "@/components/VeterinaryBookingModal";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Veterinaries = () => {
  const [searchInput, setSearchInput] = useState("");
  const searchLocation = useDebounce(searchInput, 1500); // 1.5 seconds debounce
  const [selectedVet, setSelectedVet] = useState<Host | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const {
    data: veterinaries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["veterinaries", searchLocation],
    queryFn: () => getVeterinaries(searchLocation || undefined),
  });

  const handleBookAppointment = (vet: Host) => {
    setSelectedVet(vet);
    setIsBookingModalOpen(true);
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
        <Stethoscope className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Veterinarias</h1>
      </div>

      {/* Buscador */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar por ubicación
            </label>
            <Input
              placeholder="Ciudad o región"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={() => setSearchInput("")} variant="outline">
              Limpiar
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de veterinarias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {veterinaries.map((vet) => {
          const images = Array.isArray(vet.images)
            ? (vet.images as string[])
            : [];
          const services = Array.isArray(vet.services)
            ? (vet.services as string[])
            : [];
          const certifications = Array.isArray(vet.certifications)
            ? (vet.certifications as string[])
            : [];
          const specialties = Array.isArray(vet.specialties)
            ? (vet.specialties as string[])
            : [];

          return (
            <Card
              key={vet.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={images[0] || "/placeholder.svg"}
                  alt={vet.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-4 left-4 bg-blue-500 text-white">
                  <Stethoscope className="h-3 w-3 mr-1" />
                  Veterinaria
                </Badge>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{vet.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {Number(vet.rating).toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({vet.review_count})
                    </span>
                  </div>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {vet.city}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {vet.description}
                </p>

                {specialties.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Especialidades:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

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
                  <span>Responde en {vet.response_time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-blue-600">
                    €{vet.price_per_night}
                    <span className="text-sm font-normal text-gray-500">
                      /consulta
                    </span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleBookAppointment(vet)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Reservar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {veterinaries.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Stethoscope className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            No se encontraron veterinarias en esta ubicación.
          </p>
        </div>
      )}

      {/* Modal de reserva */}
      {selectedVet && (
        <VeterinaryBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedVet(null);
          }}
          veterinary={selectedVet}
        />
      )}
    </div>
  );
};

export default Veterinaries;
