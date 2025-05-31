
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Clock, Shield, Stethoscope, Phone, Mail, Calendar, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VeterinaryProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  veterinary: any;
  onBooking: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (vetId: string) => void;
}

const VeterinaryProfileModal = ({ 
  isOpen, 
  onClose, 
  veterinary, 
  onBooking, 
  isFavorite = false,
  onToggleFavorite 
}: VeterinaryProfileModalProps) => {
  if (!veterinary) return null;

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(veterinary.id);
    } else {
      // Default behavior if no handler is provided
      const currentFavorites = JSON.parse(localStorage.getItem('veterinaryFavorites') || '[]');
      const updatedFavorites = currentFavorites.includes(veterinary.id)
        ? currentFavorites.filter((id: string) => id !== veterinary.id)
        : [...currentFavorites, veterinary.id];
      
      localStorage.setItem('veterinaryFavorites', JSON.stringify(updatedFavorites));
      
      toast({
        title: currentFavorites.includes(veterinary.id) ? "Eliminado de favoritos" : "Añadido a favoritos",
        description: currentFavorites.includes(veterinary.id) 
          ? "La veterinaria se eliminó de tus favoritos" 
          : "La veterinaria se añadió a tus favoritos",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {veterinary.name}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className="hover:bg-gray-100"
            >
              <Heart className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
              }`} />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Images Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {veterinary.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`${veterinary.name} - Imagen ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Basic Info */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{veterinary.location}</span>
              </div>
              
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-semibold mr-2">{veterinary.rating}</span>
                <span className="text-gray-500">({veterinary.reviewCount} reseñas)</span>
              </div>

              <p className="text-gray-700 mb-4">{veterinary.description}</p>
            </div>

            <div className="text-right ml-6">
              <div className="text-3xl font-bold text-petbnb-600 mb-2">
                ${veterinary.pricePerNight}
                <span className="text-lg font-normal text-gray-500">/noche</span>
              </div>
              <Button onClick={onBooking} className="bg-petbnb-600 hover:bg-petbnb-700">
                Reservar ahora
              </Button>
            </div>
          </div>

          {/* Services */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Stethoscope className="w-5 h-5 mr-2" />
                Servicios disponibles
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {veterinary.services.map((service: string, index: number) => (
                  <Badge key={index} variant="secondary" className="justify-start">
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications and Specialties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600">
                  <Shield className="w-5 h-5 mr-2" />
                  Certificaciones
                </h3>
                <div className="space-y-2">
                  {veterinary.certifications?.map((cert: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {veterinary.specialties && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Especialidades
                  </h3>
                  <div className="space-y-2">
                    {veterinary.specialties.map((specialty: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span>{specialty}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Información de contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-600" />
                  <div>
                    <div className="font-medium">Tiempo de respuesta</div>
                    <div className="text-sm text-gray-600">{veterinary.responseTime}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-gray-600" />
                  <div>
                    <div className="font-medium">Teléfono</div>
                    <div className="text-sm text-gray-600">+52 55 1234 5678</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-gray-600" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-gray-600">contacto@{veterinary.name.toLowerCase().replace(/\s+/g, '')}.com</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VeterinaryProfileModal;
