import {
  Calendar,
  Clock,
  Heart,
  Mail,
  MapPin,
  Shield,
  User,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pet } from "@/services/adoptionService";
import { Textarea } from "@/components/ui/textarea";
import logo from "@/assets/logo.jpeg";
import { useState } from "react";

interface AdoptionModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitAdoption?: (petId: string, userInfo: any) => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  currentUser?: {
    name: string;
    email: string;
    phone: string;
  };
}

const AdoptionModal = ({
  pet,
  isOpen,
  onClose,
  onSubmitAdoption,
  onToggleFavorite,
  isFavorite = false,
  currentUser = { name: "", email: "", phone: "" },
}: AdoptionModalProps) => {
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!pet) return null;

  const characteristics = Array.isArray(pet.characteristics)
    ? (pet.characteristics as string[])
    : [];

  const handleSubmitAdoption = async () => {
    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.phone ||
      !onSubmitAdoption
    ) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmitAdoption(pet.id, userInfo);
      setUserInfo({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        message: "",
      });
      setShowAdoptionForm(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {pet.name} - {pet.breed}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pet Image and Basic Info */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src={pet.image || logo}
                  alt={pet.name}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = logo;
                  }}
                />
                {pet.urgent && (
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                    ADOPCIÓN URGENTE
                  </Badge>
                )}
                {onToggleFavorite && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleFavorite}
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </Button>
                )}
              </div>
            </div>

            <div className="lg:w-1/2 space-y-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  {pet.type}
                </Badge>
                <Badge variant="outline">{pet.gender}</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{pet.age}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{pet.location}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span>Tamaño: {pet.size}</span>
                </div>
              </div>

              <div className="text-2xl font-bold text-green-600">
                €{pet.adoption_fee || 0} cuota de adopción
              </div>

              <div className="flex flex-wrap gap-2">
                {pet.vaccinated && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    Vacunado
                  </Badge>
                )}
                {pet.sterilized && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    Esterilizado
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {pet.description && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Descripción
                </h3>
                <p className="text-gray-700">{pet.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Characteristics */}
          {characteristics.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Características
                </h3>
                <div className="flex flex-wrap gap-2">
                  {characteristics.map((characteristic, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-purple-50 text-purple-700 border-purple-200"
                    >
                      {characteristic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Shelter Information */}
          {pet.shelter_name && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Información del refugio
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <span className="font-medium">{pet.shelter_name}</span>
                  </div>
                  {pet.shelter_contact && (
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{pet.shelter_contact}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      Publicado el{" "}
                      {new Date(pet.created_at || "").toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Adoption Form */}
          {showAdoptionForm && onSubmitAdoption && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Solicitud de adopción
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre completo *</Label>
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) =>
                          setUserInfo((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo electrónico *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) =>
                          setUserInfo((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) =>
                        setUserInfo((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="Tu número de teléfono"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Mensaje adicional</Label>
                    <Textarea
                      id="message"
                      value={userInfo.message}
                      onChange={(e) =>
                        setUserInfo((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Cuéntanos por qué quieres adoptar a esta mascota..."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleSubmitAdoption}
                      disabled={
                        isLoading ||
                        !userInfo.name ||
                        !userInfo.email ||
                        !userInfo.phone
                      }
                      className="flex-1"
                    >
                      {isLoading ? "Enviando..." : "Enviar solicitud"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowAdoptionForm(false)}
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
            {onSubmitAdoption && (
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowAdoptionForm(!showAdoptionForm)}
              >
                {showAdoptionForm ? "Cancelar adopción" : "Adoptar ahora"}
              </Button>
            )}
            <Button
              variant="outline"
              className="flex-1"
              onClick={() =>
                window.open(
                  `mailto:${
                    pet.shelter_contact || "info@refugio.com"
                  }?subject=Consulta sobre ${pet.name}`
                )
              }
            >
              Contactar refugio
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdoptionModal;
