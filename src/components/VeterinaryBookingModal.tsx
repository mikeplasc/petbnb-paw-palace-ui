import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, MapPin, PlusCircle, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/services/bookingService";
import { getMyPets } from "@/services/petService";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface VeterinaryBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  veterinary: any;
}

const VeterinaryBookingModal = ({
  isOpen,
  onClose,
  veterinary,
}: VeterinaryBookingModalProps) => {
  const [formData, setFormData] = useState({
    selectedPetId: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
    emergencyContact: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { formatPrice } = useCurrency();

  const { data: userPets = [], isLoading: petsLoading } = useQuery({
    queryKey: ["my-pets"],
    queryFn: getMyPets,
    enabled: isOpen,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userPets.length === 0) {
      toast({
        title: "No tienes mascotas registradas",
        description:
          "Necesitas registrar al menos una mascota para hacer una reserva.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.selectedPetId) {
      toast({
        title: "Selecciona una mascota",
        description: "Debes seleccionar una mascota para la consulta.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedPet = userPets.find(
        (pet) => pet.id === formData.selectedPetId
      );

      // Create booking using the updated service
      const booking = await createBooking(
        veterinary.id,
        {
          ...veterinary,
          image: veterinary.images[0],
          petInfo: selectedPet,
        },
        "veterinary",
        formData
      );

      toast({
        title: "¡Reserva confirmada!",
        description: `Tu cita en ${veterinary.name} ha sido reservada exitosamente para ${selectedPet?.name}.`,
      });

      console.log("Reserva veterinaria creada:", booking);
      console.log("Datos del formulario:", formData);
      console.log("Mascota seleccionada:", selectedPet);

      onClose();
      setFormData({
        selectedPetId: "",
        serviceType: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
        emergencyContact: "",
      });
    } catch (error) {
      toast({
        title: "Error al crear la reserva",
        description: "Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoToRegisterPet = () => {
    onClose();
    // Redirigir a la página de mis mascotas
    window.location.href = "/my-pets";
  };

  if (!veterinary) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Reservar cita en {veterinary.name}
          </DialogTitle>
        </DialogHeader>

        {/* Veterinary Info Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-4">
            <img
              src={veterinary.images[0]}
              alt={veterinary.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{veterinary.name}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-1">
                <MapPin className="w-4 h-4 mr-1" />
                {veterinary.city}
              </div>
              <div className="flex items-center text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-medium">{veterinary.rating}</span>
                <span className="text-gray-500 ml-1">
                  ({veterinary.review_count} reseñas)
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600">
                {formatPrice(veterinary.price_per_night)}
                <span className="text-sm font-normal text-gray-500">
                  /consulta
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading state for pets */}
        {petsLoading && (
          <div className="text-center py-4">
            <div className="animate-spin h-6 w-6 border-b-2 border-blue-600 rounded-full mx-auto"></div>
            <p className="text-gray-500 mt-2">Cargando tus mascotas...</p>
          </div>
        )}

        {/* No pets alert */}
        {!petsLoading && userPets.length === 0 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <div className="flex items-center justify-between">
                <span>
                  No tienes mascotas registradas. Necesitas registrar al menos
                  una mascota para hacer una reserva.
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGoToRegisterPet}
                  className="ml-4 border-orange-300 text-orange-700 hover:bg-orange-100"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Registrar mascota
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Selection */}
          {!petsLoading && userPets.length > 0 && (
            <div>
              <Label htmlFor="selectedPet">Selecciona tu mascota</Label>
              <Select
                value={formData.selectedPetId}
                onValueChange={(value) => handleChange("selectedPetId", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Elige la mascota para la consulta" />
                </SelectTrigger>
                <SelectContent>
                  {userPets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            pet.image ||
                            "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=400&h=300&fit=crop"
                          }
                          alt={pet.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">{pet.name}</span>
                          <span className="text-sm text-gray-500">
                            {pet.breed} - {pet.age}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Service Type */}
          <div>
            <Label htmlFor="serviceType">Tipo de servicio</Label>
            <Select
              value={formData.serviceType}
              onValueChange={(value) => handleChange("serviceType", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el servicio" />
              </SelectTrigger>
              <SelectContent>
                {veterinary.services &&
                  veterinary.services
                    .filter(
                      (service: string) =>
                        service && typeof service === "string" && service.trim()
                    )
                    .map((service: string, index: number) => {
                      const cleanService = service.trim();
                      const serviceValue = cleanService
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, "");
                      const finalValue = serviceValue || `service-${index + 1}`;

                      return (
                        <SelectItem
                          key={`${cleanService}-${index}`}
                          value={finalValue}
                        >
                          {cleanService}
                        </SelectItem>
                      );
                    })}
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredDate">Fecha preferida</Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleChange("preferredDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div>
              <Label htmlFor="preferredTime">Hora preferida</Label>
              <Select
                value={formData.preferredTime}
                onValueChange={(value) => handleChange("preferredTime", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la hora" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="14:00">02:00 PM</SelectItem>
                  <SelectItem value="15:00">03:00 PM</SelectItem>
                  <SelectItem value="16:00">04:00 PM</SelectItem>
                  <SelectItem value="17:00">05:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <Label htmlFor="emergencyContact">Contacto de emergencia</Label>
            <Input
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => handleChange("emergencyContact", e.target.value)}
              placeholder="Teléfono de contacto de emergencia"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notas adicionales</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Describe los síntomas o motivo de la consulta..."
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 pb-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || userPets.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Procesando..." : "Confirmar reserva"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VeterinaryBookingModal;
