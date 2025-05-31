
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  Heart,
  Phone,
  Mail,
  CheckCircle,
  User
} from "lucide-react";
import { Host } from "@/services/hostService";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useFavorites } from "@/hooks/useFavorites";
import logo from "@/assets/logo.jpeg";

interface HostProfileModalProps {
  host: Host | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectHost?: (hostId: string) => void;
}

const HostProfileModal = ({
  host,
  isOpen,
  onClose,
  onSelectHost,
}: HostProfileModalProps) => {
  const { formatPrice } = useCurrency();
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!host) return null;

  const images = Array.isArray(host.images) ? host.images as string[] : [];
  const services = Array.isArray(host.services) ? host.services as string[] : [];
  const certifications = Array.isArray(host.certifications) ? host.certifications as string[] : [];
  const specialties = Array.isArray(host.specialties) ? host.specialties as string[] : [];
  const isCurrentlyFavorite = isFavorite(host.id, "host");

  const handleToggleFavorite = () => {
    toggleFavorite(host.id, "host");
  };

  const handleSelectHost = () => {
    onSelectHost?.(host.id);
    onClose();
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "individual":
        return "Cuidador";
      case "veterinary":
        return "Veterinaria";
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">Perfil del Cuidador</span>
            <button
              onClick={handleToggleFavorite}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  isCurrentlyFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={images[0] || logo}
                alt={host.name}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = logo;
                }}
              />
            </div>
            
            <div className="md:w-2/3 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{host.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={`${getTypeColor(host.type)}`}>
                      {getTypeLabel(host.type)}
                    </Badge>
                    {certifications.length > 0 && (
                      <Badge className="bg-green-100 text-green-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Certificado
                      </Badge>
                    )}
                    {host.availability && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Disponible
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 bg-gray-50 px-3 py-2 rounded-lg">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold text-gray-900">
                      {Number(host.rating).toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({host.review_count} reseñas)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{host.city}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Resp. en {host.response_time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{host.experience} experiencia</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(host.price_per_night)}
                    <span className="text-base font-normal text-gray-500">/noche</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {host.description && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Descripción</h3>
                <p className="text-gray-700 leading-relaxed">{host.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Services and Pets */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Servicios Ofrecidos</h3>
                <div className="flex flex-wrap gap-2">
                  {services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Mascotas Aceptadas</h3>
                <div className="flex flex-wrap gap-2">
                  {host.accepted_pets.map((pet, index) => (
                    <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {pet}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Specialties and Certifications */}
          {(specialties.length > 0 || certifications.length > 0) && (
            <div className="grid md:grid-cols-2 gap-6">
              {specialties.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-50 text-green-700">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {certifications.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Certificaciones</h3>
                    <div className="flex flex-wrap gap-2">
                      {certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary" className="bg-amber-50 text-amber-700">
                          <Shield className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Contact Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-3">Información de Contacto</h3>
              <div className="space-y-2">
                {host.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{host.email}</span>
                  </div>
                )}
                {host.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{host.phone}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Images */}
          {images.length > 1 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Galería de Fotos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.slice(1, 7).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${host.name} - Foto ${index + 2}`}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = logo;
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cerrar
            </Button>
            <Button 
              onClick={handleSelectHost}
              className="flex-1 bg-gradient-to-r from-petbnb-500 to-primary-600 hover:from-petbnb-600 hover:to-primary-700 text-white"
            >
              Seleccionar Cuidador
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HostProfileModal;
