import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, MapPin, Clock, CheckCircle } from 'lucide-react';

import logo from "@/assets/logo.jpeg";

interface Host {
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

interface HostCardProps {
  host: Host;
  onViewDetails?: (hostId: string) => void;
  onToggleFavorite?: (hostId: string) => void;
  isFavorite?: boolean;
}

const HostCard = ({
  host,
  onViewDetails,
  onToggleFavorite,
  isFavorite = false,
}: HostCardProps) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'host':
        return 'Cuidador';
      case 'veterinary':
        return 'Veterinaria';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "individual":
        return "bg-sage-100 text-sage-800";
      case "veterinary":
        return "bg-petbnb-100 text-petbnb-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card 
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 pet-card-hover cursor-pointer"
      onClick={() => onViewDetails?.(host.id)}
    >
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={host.images?.[0] || host.image || logo}
            alt={host.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = logo;
            }}
          />
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(host.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${getTypeColor(host.type)} font-medium`}>
            {getTypeLabel(host.type)}
          </Badge>
        </div>

        {/* Availability indicator */}
        {host.availability && (
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-green-100 text-green-800 flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span className="text-xs">Disponible</span>
            </Badge>
          </div>
        )}

        {/* Certification badge - fixed styling */}
        {host.certifications && host.certifications.length > 0 && (
          <div className="absolute bottom-3 left-3">
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium cursor-default">
              Certificado
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 leading-tight">
                {host.name}
              </h3>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {host.location}
              </div>
            </div>

            <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">
                {host.rating}
              </span>
              <span className="text-xs text-gray-500">
                ({host.reviewCount})
              </span>
            </div>
          </div>

          {/* Services preview */}
          <div className="flex flex-wrap gap-1 mb-3">
            {host.services?.slice(0, 2).map((service, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {service}
              </Badge>
            ))}
            {host.services && host.services.length > 2 && (
              <Badge
                variant="secondary"
                className="text-xs bg-gray-100 text-gray-700"
              >
                +{host.services.length - 2} más
              </Badge>
            )}
          </div>

          {/* Accepted pets */}
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="text-sm font-medium text-gray-700 mb-1 w-full">
              Acepta:
            </span>
            {host.acceptedPets?.map((pet, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-purple-50 text-purple-700 border-purple-200"
              >
                {pet}
              </Badge>
            ))}
            {(!host.acceptedPets || host.acceptedPets.length === 0) && (
              <span className="text-sm text-gray-500">No especificado</span>
            )}
          </div>

          {/* Experience and response time */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>Resp. en {host.responseTime}</span>
            </div>
            <span>{host.experience} experiencia</span>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div>
              <span className="text-xl font-bold text-gray-900">
                ${host.pricePerNight}
              </span>
              <span className="text-sm text-gray-500 ml-1">/ noche</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HostCard;
