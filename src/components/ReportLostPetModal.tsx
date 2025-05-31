
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getMyPets } from '@/services/petService';
import { reportLostPet } from '@/services/lostPetService';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

interface ReportLostPetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportLostPetModal: React.FC<ReportLostPetModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPetId, setSelectedPetId] = useState('');
  const [lastSeenDate, setLastSeenDate] = useState('');
  const [lastSeenLocation, setLastSeenLocation] = useState('');
  const [description, setDescription] = useState('');
  const [rewardAmount, setRewardAmount] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const { data: myPets = [] } = useQuery({
    queryKey: ['myPets'],
    queryFn: getMyPets,
  });

  const reportMutation = useMutation({
    mutationFn: reportLostPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lostPets'] });
      toast({
        title: "Mascota reportada como perdida",
        description: "Tu reporte ha sido enviado exitosamente",
      });
      onClose();
      resetForm();
    },
    onError: (error) => {
      console.error('Error reporting lost pet:', error);
      toast({
        title: "Error",
        description: "No se pudo reportar la mascota perdida",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setSelectedPetId('');
    setLastSeenDate('');
    setLastSeenLocation('');
    setDescription('');
    setRewardAmount('');
    setContactPhone('');
    setContactEmail('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPetId || !lastSeenDate || !lastSeenLocation) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    reportMutation.mutate({
      pet_id: selectedPetId,
      last_seen_date: lastSeenDate,
      last_seen_location: lastSeenLocation,
      description,
      reward_amount: rewardAmount ? parseFloat(rewardAmount) : undefined,
      contact_phone: contactPhone,
      contact_email: contactEmail,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Reportar Mascota Perdida</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="pet">Mascota *</Label>
            <Select value={selectedPetId} onValueChange={setSelectedPetId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu mascota" />
              </SelectTrigger>
              <SelectContent>
                {myPets.map((pet) => (
                  <SelectItem key={pet.id} value={pet.id}>
                    {pet.name} - {pet.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="lastSeenDate">Fecha cuando se perdió *</Label>
            <Input
              id="lastSeenDate"
              type="datetime-local"
              value={lastSeenDate}
              onChange={(e) => setLastSeenDate(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="lastSeenLocation">Última ubicación vista *</Label>
            <Input
              id="lastSeenLocation"
              value={lastSeenLocation}
              onChange={(e) => setLastSeenLocation(e.target.value)}
              placeholder="Ej: Parque Central, Colonia Roma"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descripción adicional</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalles adicionales que puedan ayudar..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="rewardAmount">Recompensa (opcional)</Label>
            <Input
              id="rewardAmount"
              type="number"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              placeholder="Cantidad en pesos"
            />
          </div>

          <div>
            <Label htmlFor="contactPhone">Teléfono de contacto</Label>
            <Input
              id="contactPhone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+52 55 1234 5678"
            />
          </div>

          <div>
            <Label htmlFor="contactEmail">Email de contacto</Label>
            <Input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={reportMutation.isPending}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {reportMutation.isPending ? 'Reportando...' : 'Reportar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportLostPetModal;
