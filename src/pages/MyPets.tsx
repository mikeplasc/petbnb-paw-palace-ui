
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Camera, Heart, Activity } from 'lucide-react';

const MyPets = () => {
  const [pets, setPets] = useState([
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

  const PetCard = ({ pet }: { pet: any }) => (
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
            <Button size="sm" variant="ghost" className="text-red-600">
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

  const PetForm = ({ pet, onSave, onCancel }: { pet?: any, onSave: (petData: any) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState(pet || {
      name: '',
      type: 'Perro',
      breed: '',
      age: '',
      weight: '',
      description: '',
      vaccinated: false,
      neutered: false,
      microchip: '',
      emergencyContact: ''
    });

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Nombre de tu mascota"
            />
          </div>
          <div>
            <Label htmlFor="type">Tipo</Label>
            <select 
              id="type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="breed">Raza</Label>
            <Input
              id="breed"
              value={formData.breed}
              onChange={(e) => setFormData({...formData, breed: e.target.value})}
              placeholder="Raza de tu mascota"
            />
          </div>
          <div>
            <Label htmlFor="age">Edad (años)</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
              placeholder="Edad"
            />
          </div>
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

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(formData)}>
            {pet ? 'Actualizar' : 'Agregar'} Mascota
          </Button>
        </div>
      </div>
    );
  };

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
              onSave={(petData) => {
                // Aquí agregarías la mascota a la lista
                setIsAddingPet(false);
              }}
              onCancel={() => setIsAddingPet(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

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
