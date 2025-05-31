
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AddPetFormProps {
  onAddPet: (petData: any) => void;
}

const AddPetForm = ({ onAddPet }: AddPetFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [petData, setPetData] = useState({
    name: '',
    breed: '',
    age: '',
    size: '',
    gender: '',
    type: '',
    description: '',
    image: '',
    location: '',
    vaccinated: false,
    sterilized: false,
    urgent: false,
    shelterName: '',
    shelterContact: '',
    adoptionFee: '',
    characteristics: [] as string[]
  });
  const [newCharacteristic, setNewCharacteristic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!petData.name || !petData.breed || !petData.type || !petData.shelterName || !petData.shelterContact) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const newPet = {
        ...petData,
        id: Date.now().toString(),
        adoptionFee: parseInt(petData.adoptionFee) || 0,
        dateAdded: new Date().toISOString(),
        image: petData.image || 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop'
      };

      onAddPet(newPet);
      
      toast({
        title: "¡Mascota añadida!",
        description: "La mascota se ha añadido correctamente para adopción",
      });

      // Reset form
      setPetData({
        name: '',
        breed: '',
        age: '',
        size: '',
        gender: '',
        type: '',
        description: '',
        image: '',
        location: '',
        vaccinated: false,
        sterilized: false,
        urgent: false,
        shelterName: '',
        shelterContact: '',
        adoptionFee: '',
        characteristics: []
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo añadir la mascota. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addCharacteristic = () => {
    if (newCharacteristic.trim() && !petData.characteristics.includes(newCharacteristic.trim())) {
      setPetData(prev => ({
        ...prev,
        characteristics: [...prev.characteristics, newCharacteristic.trim()]
      }));
      setNewCharacteristic('');
    }
  };

  const removeCharacteristic = (characteristic: string) => {
    setPetData(prev => ({
      ...prev,
      characteristics: prev.characteristics.filter(c => c !== characteristic)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Añadir mascota para adopción
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Añadir nueva mascota para adopción</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Información básica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    value={petData.name}
                    onChange={(e) => setPetData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nombre de la mascota"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="breed">Raza *</Label>
                  <Input
                    id="breed"
                    value={petData.breed}
                    onChange={(e) => setPetData(prev => ({ ...prev, breed: e.target.value }))}
                    placeholder="Raza de la mascota"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Tipo *</Label>
                  <Select value={petData.type} onValueChange={(value) => setPetData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Perro">Perro</SelectItem>
                      <SelectItem value="Gato">Gato</SelectItem>
                      <SelectItem value="Ave">Ave</SelectItem>
                      <SelectItem value="Conejo">Conejo</SelectItem>
                      <SelectItem value="Hámster">Hámster</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="size">Tamaño</Label>
                  <Select value={petData.size} onValueChange={(value) => setPetData(prev => ({ ...prev, size: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tamaño" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pequeño">Pequeño</SelectItem>
                      <SelectItem value="Mediano">Mediano</SelectItem>
                      <SelectItem value="Grande">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="gender">Género</Label>
                  <Select value={petData.gender} onValueChange={(value) => setPetData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Macho">Macho</SelectItem>
                      <SelectItem value="Hembra">Hembra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="age">Edad</Label>
                  <Input
                    id="age"
                    value={petData.age}
                    onChange={(e) => setPetData(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="ej: 2 años, 6 meses"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description and Location */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Descripción y ubicación</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={petData.description}
                    onChange={(e) => setPetData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe el carácter y personalidad de la mascota..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    value={petData.location}
                    onChange={(e) => setPetData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Ciudad, País"
                  />
                </div>

                <div>
                  <Label htmlFor="image">URL de imagen</Label>
                  <Input
                    id="image"
                    value={petData.image}
                    onChange={(e) => setPetData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Characteristics */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Características</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newCharacteristic}
                    onChange={(e) => setNewCharacteristic(e.target.value)}
                    placeholder="Añadir característica..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCharacteristic())}
                  />
                  <Button type="button" onClick={addCharacteristic} size="sm">
                    Añadir
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {petData.characteristics.map((characteristic) => (
                    <Badge key={characteristic} variant="secondary" className="flex items-center gap-1">
                      {characteristic}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeCharacteristic(characteristic)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health and Status */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Estado de salud</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vaccinated"
                    checked={petData.vaccinated}
                    onCheckedChange={(checked) => setPetData(prev => ({ ...prev, vaccinated: !!checked }))}
                  />
                  <Label htmlFor="vaccinated">Vacunado</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sterilized"
                    checked={petData.sterilized}
                    onCheckedChange={(checked) => setPetData(prev => ({ ...prev, sterilized: !!checked }))}
                  />
                  <Label htmlFor="sterilized">Esterilizado</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgent"
                    checked={petData.urgent}
                    onCheckedChange={(checked) => setPetData(prev => ({ ...prev, urgent: !!checked }))}
                  />
                  <Label htmlFor="urgent">Adopción urgente</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shelter Information */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Información del refugio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shelterName">Nombre del refugio *</Label>
                  <Input
                    id="shelterName"
                    value={petData.shelterName}
                    onChange={(e) => setPetData(prev => ({ ...prev, shelterName: e.target.value }))}
                    placeholder="Nombre del refugio"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="shelterContact">Email de contacto *</Label>
                  <Input
                    id="shelterContact"
                    type="email"
                    value={petData.shelterContact}
                    onChange={(e) => setPetData(prev => ({ ...prev, shelterContact: e.target.value }))}
                    placeholder="contacto@refugio.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="adoptionFee">Cuota de adopción (€)</Label>
                  <Input
                    id="adoptionFee"
                    type="number"
                    value={petData.adoptionFee}
                    onChange={(e) => setPetData(prev => ({ ...prev, adoptionFee: e.target.value }))}
                    placeholder="150"
                    min="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Añadiendo...' : 'Añadir mascota'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPetForm;
