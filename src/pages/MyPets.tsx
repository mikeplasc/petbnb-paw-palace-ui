
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Camera, Heart, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: number;
  weight: number;
  image: string;
  description: string;
  vaccinated: boolean;
  neutered: boolean;
  microchip: string;
  emergencyContact: string;
}

const MyPets = () => {
  const { toast } = useToast();
  const [pets, setPets] = useState<Pet[]>([
    {
      id: 1,
      name: 'Luna',
      type: 'Perro',
      breed: 'Golden Retriever',
      age: 3,
      weight: 28,
      image: '/placeholder-pet.jpg',
      description: 'Luna es una perrita muy cariñosa y juguetona. Le encanta correr en el parque.',
      vaccinated: true,
      neutered: true,
      microchip: '123456789012345',
      emergencyContact: 'Dr. Veterinario - 612 345 678'
    },
    {
      id: 2,
      name: 'Max',
      type: 'Gato',
      breed: 'Siamés',
      age: 2,
      weight: 4.5,
      image: '/placeholder-pet.jpg',
      description: 'Max es un gato independiente pero muy cariñoso cuando quiere atención.',
      vaccinated: true,
      neutered: false,
      microchip: '987654321098765',
      emergencyContact: 'Clínica Felina - 678 901 234'
    }
  ]);

  const [isAddingPet, setIsAddingPet] = useState(false);
  const [editingPet, setEditingPet] = useState<number | null>(null);

  const addPet = (petData: Omit<Pet, 'id'>) => {
    const newPet: Pet = {
      ...petData,
      id: Math.max(...pets.map(p => p.id), 0) + 1
    };
    setPets([...pets, newPet]);
    toast({
      title: "Mascota agregada",
      description: `${petData.name} ha sido agregada exitosamente.`,
    });
    setIsAddingPet(false);
  };

  const updatePet = (petData: Pet) => {
    setPets(pets.map(pet => pet.id === petData.id ? petData : pet));
    toast({
      title: "Mascota actualizada",
      description: `Los datos de ${petData.name} han sido actualizados.`,
    });
    setEditingPet(null);
  };

  const deletePet = (petId: number) => {
    const pet = pets.find(p => p.id === petId);
    setPets(pets.filter(pet => pet.id !== petId));
    toast({
      title: "Mascota eliminada",
      description: `${pet?.name} ha sido eliminada de tu lista.`,
      variant: "destructive",
    });
  };

  const PetCard = ({ pet }: { pet: Pet }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-petbnb-100 to-primary-100 flex items-center justify-center">
          <div className="text-6xl">
            {pet.type === 'Perro' ? '🐕' : '🐱'}
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{pet.name}</CardTitle>
            <CardDescription>{pet.breed} • {pet.age} años</CardDescription>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" onClick={() => setEditingPet(pet.id)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-red-600"
              onClick={() => deletePet(pet.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{pet.description}</p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Activity className="h-4 w-4 text-gray-500" />
              <span>{pet.weight} kg</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Tipo:</span>
              <span>{pet.type}</span>
            </div>
          </div>
          
          <div className="flex gap-1 flex-wrap">
            {pet.vaccinated && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Vacunado
              </Badge>
            )}
            {pet.neutered && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Esterilizado
              </Badge>
            )}
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Microchip
            </Badge>
          </div>

          <div className="pt-2 border-t text-xs text-gray-500">
            <p><strong>Contacto emergencia:</strong> {pet.emergencyContact}</p>
            <p><strong>Microchip:</strong> {pet.microchip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PetForm = ({ pet, onSave, onCancel }: { pet?: Pet, onSave: (petData: any) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState(pet || {
      name: '',
      type: 'Perro',
      breed: '',
      age: 0,
      weight: 0,
      description: '',
      vaccinated: false,
      neutered: false,
      microchip: '',
      emergencyContact: '',
      image: '/placeholder-pet.jpg'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.breed || !formData.age || !formData.weight) {
        toast({
          title: "Error",
          description: "Por favor completa todos los campos obligatorios.",
          variant: "destructive",
        });
        return;
      }
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Nombre de tu mascota"
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Tipo *</Label>
            <select 
              id="type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              required
            >
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="breed">Raza *</Label>
            <Input
              id="breed"
              value={formData.breed}
              onChange={(e) => setFormData({...formData, breed: e.target.value})}
              placeholder="Raza de tu mascota"
              required
            />
          </div>
          <div>
            <Label htmlFor="age">Edad (años) *</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
              placeholder="Edad"
              required
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weight">Peso (kg) *</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: parseFloat(e.target.value) || 0})}
              placeholder="Peso"
              required
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="microchip">Microchip</Label>
            <Input
              id="microchip"
              value={formData.microchip}
              onChange={(e) => setFormData({...formData, microchip: e.target.value})}
              placeholder="Número de microchip"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="emergencyContact">Contacto de emergencia</Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
            placeholder="Veterinario o contacto de emergencia"
          />
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <textarea
            id="description"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Cuéntanos sobre la personalidad y características de tu mascota"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="vaccinated"
              checked={formData.vaccinated}
              onChange={(e) => setFormData({...formData, vaccinated: e.target.checked})}
              className="h-4 w-4"
            />
            <Label htmlFor="vaccinated">Vacunado</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="neutered"
              checked={formData.neutered}
              onChange={(e) => setFormData({...formData, neutered: e.target.checked})}
              className="h-4 w-4"
            />
            <Label htmlFor="neutered">Esterilizado</Label>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {pet ? 'Actualizar' : 'Agregar'} Mascota
          </Button>
        </div>
      </form>
    );
  };

  const editingPetData = pets.find(pet => pet.id === editingPet);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mis Mascotas</h1>
        
        <Dialog open={isAddingPet} onOpenChange={setIsAddingPet}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Agregar Mascota
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nueva Mascota</DialogTitle>
              <DialogDescription>
                Agrega la información de tu mascota para que los cuidadores puedan conocerla mejor.
              </DialogDescription>
            </DialogHeader>
            <PetForm 
              onSave={addPet}
              onCancel={() => setIsAddingPet(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Pet Dialog */}
      <Dialog open={!!editingPet} onOpenChange={() => setEditingPet(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Mascota</DialogTitle>
            <DialogDescription>
              Actualiza la información de tu mascota.
            </DialogDescription>
          </DialogHeader>
          {editingPetData && (
            <PetForm 
              pet={editingPetData}
              onSave={updatePet}
              onCancel={() => setEditingPet(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {pets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No tienes mascotas registradas
            </h3>
            <p className="text-gray-600 mb-4">
              Agrega información sobre tus mascotas para que los cuidadores puedan conocerlas mejor.
            </p>
            <Button onClick={() => setIsAddingPet(true)}>
              Agregar mi primera mascota
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyPets;
