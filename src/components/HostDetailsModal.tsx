import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, MapPin, Heart, Phone, Mail, Clock, Shield, Send } from 'lucide-react';
import { createBooking } from '@/services/bookingService';
import { sendMessage } from '@/services/messageService';
import { toast } from '@/hooks/use-toast';
import ChatWidget from './ChatWidget';
import logo from "@/assets/logo.jpeg";

interface Host {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  image: string;
  acceptedPets: string[];
  services: string[];
  type: 'host' | 'veterinary';
  description?: string;
  experience?: string;
  availability?: string;
  phone?: string;
  email?: string;
}

interface HostDetailsModalProps {
  host: Host | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (hostId: string) => void;
  isFavorite: boolean;
}

const HostDetailsModal = ({
  host,
  isOpen,
  onClose,
  onToggleFavorite,
  isFavorite,
}: HostDetailsModalProps) => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatData, setChatData] = useState<{
    hostId: string;
    hostName: string;
    initialMessage: string;
  } | null>(null);

  if (!host) return null;

  const getHostTypeLabel = (type: string) => {
    switch (type) {
      case 'host': return 'Cuidador';
      case 'veterinary': return 'Veterinaria';
      default: return type;
    }
  };

  const handleBooking = async () => {
    setIsLoading(true);
    try {
      const booking = await createBooking(host.id, host);
      toast({
        title: "¡Reserva creada exitosamente!",
        description: `Tu reserva con ${host.name} ha sido registrada. Revisa tu historial de reservas.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la reserva. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageContent.trim()) {
      toast({
        title: "Error",
        description: "Por favor escribe un mensaje antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const message = sendMessage(host.id, host.name, messageContent);

      // Set up chat data and open chat widget
      setChatData({
        hostId: host.id,
        hostName: host.name,
        initialMessage: messageContent,
      });
      setShowChat(true);
      
      // Clean up the form
      setMessageContent('');
      setShowMessageForm(false);
      
      toast({
        title: "¡Mensaje enviado!",
        description: `${host.name} respondió: "${message.response.substring(
          0,
          50
        )}..."`,
      });
      onClose(); // Close the modal when chat opens
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add cleanup when modal closes
  const handleClose = () => {
    setMessageContent('');
    setShowMessageForm(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {host.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Host Image and Basic Info */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={host.image || logo}
                  alt={host.name}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = logo;
                  }}
                />
              </div>

              <div className="md:w-2/3 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {getHostTypeLabel(host.type)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFavorite(host.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-semibold">{host.rating}</span>
                    <span className="ml-1 text-gray-600">
                      ({host.reviewCount} reseñas)
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{host.location}</span>
                </div>

                <div className="text-2xl font-bold text-green-600">
                  ${host.pricePerNight} / noche
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Descripción
                </h3>
                <p className="text-gray-700">
                  {host.description ||
                    `${host.name} ofrece servicios de cuidado de mascotas con gran experiencia y dedicación. Nuestro objetivo es brindar el mejor cuidado para tu mascota mientras estás fuera.`}
                </p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Servicios ofrecidos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {host.services.map((service) => (
                    <Badge
                      key={service}
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Accepted Pets */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Mascotas aceptadas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {host.acceptedPets.map((pet) => (
                    <Badge
                      key={pet}
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {pet}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Información de contacto
                </h3>
                <div className="space-y-2">
                  {host.phone && (
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{host.phone}</span>
                    </div>
                  )}
                  {host.email && (
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{host.email}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Message Form */}
            {showMessageForm && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Enviar mensaje
                  </h3>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Escribe tu mensaje aquí..."
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSendMessage}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isLoading ? "Enviando..." : "Enviar mensaje"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowMessageForm(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="flex-1 bg-primary-600 hover:bg-primary-700"
                onClick={handleBooking}
                disabled={isLoading}
              >
                {isLoading ? "Creando reserva..." : "Reservar ahora"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowMessageForm(!showMessageForm)}
              >
                {showMessageForm ? "Cancelar mensaje" : "Enviar mensaje"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Widget */}
      {showChat && chatData && (
        <ChatWidget
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          initialHostId={chatData.hostId}
          initialHostName={chatData.hostName}
          initialMessage={chatData.initialMessage}
        />
      )}
    </>
  );
};

export default HostDetailsModal;
