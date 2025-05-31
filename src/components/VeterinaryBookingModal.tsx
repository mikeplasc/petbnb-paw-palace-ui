
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Clock, Star, MapPin } from 'lucide-react';
import { createBooking } from '@/services/bookingService';
import { useToast } from '@/hooks/use-toast';

interface VeterinaryBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  veterinary: any;
}

const VeterinaryBookingModal = ({ isOpen, onClose, veterinary }: VeterinaryBookingModalProps) => {
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
    emergencyContact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create booking using the existing service
      const booking = createBooking(veterinary.id, {
        ...veterinary,
        image: veterinary.images[0]
      });

      toast({
        title: "¡Reserva confirmada!",
        description: `Tu cita en ${veterinary.name} ha sido reservada exitosamente.`,
      });

      console.log('Reserva creada:', booking);
      console.log('Datos del formulario:', formData);
      
      onClose();
      setFormData({
        petName: '',
        petType: '',
        serviceType: '',
        preferredDate: '',
        preferredTime: '',
        notes: '',
        emergencyContact: ''
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
    setFormData(prev => ({ ...prev, [field]: value }));
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
                {veterinary.location}
              </div>
              <div className="flex items-center text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-medium">{veterinary.rating}</span>
                <span className="text-gray-500 ml-1">({veterinary.reviewCount} reseñas)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-petbnb-600">
                ${veterinary.pricePerNight}
                <span className="text-sm font-normal text-gray-500">/consulta</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información de la mascota</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="petName">Nombre de la mascota</Label>
                <Input
                  id="petName"
                  value={formData.petName}
                  onChange={(e) => handleChange('petName', e.target.value)}
                  placeholder="Nombre de tu mascota"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="petType">Tipo de mascota</Label>
                <Select value={formData.petType} onValueChange={(value) => handleChange('petType', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perro">Perro</SelectItem>
                    <SelectItem value="gato">Gato</SelectItem>
                    <SelectItem value="ave">Ave</SelectItem>
                    <SelectItem value="roedor">Roedor</SelectItem>
                    <SelectItem value="reptil">Reptil</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Service Type */}
          <div>
            <Label htmlFor="serviceType">Tipo de servicio</Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleChange('serviceType', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el servicio" />
              </SelectTrigger>
              <SelectContent>
                {veterinary.services.map((service: string, index: number) => (
                  <SelectItem key={index} value={service.toLowerCase()}>
                    {service}
                  </SelectItem>
                ))}
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
                onChange={(e) => handleChange('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="preferredTime">Hora preferida</Label>
              <Select value={formData.preferredTime} onValueChange={(value) => handleChange('preferredTime', value)} required>
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
              onChange={(e) => handleChange('emergencyContact', e.target.value)}
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
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Describe los síntomas o motivo de la consulta..."
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-petbnb-600 hover:bg-petbnb-700"
            >
              {isSubmitting ? 'Procesando...' : 'Confirmar reserva'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VeterinaryBookingModal;
