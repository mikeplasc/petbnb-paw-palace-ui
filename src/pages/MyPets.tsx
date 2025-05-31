
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Camera, Heart, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { getMyPets, createMyPet, updateMyPet, deleteMyPet, Pet } from '@/services/petService';

const MyPets = () => {
  const queryClient = useQueryClient();
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ['my-pets'],
    queryFn: getMyPets,
  });

  const createPetMutation = useMutation({
    mutationFn: createMyPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-pets'] });
      toast.success('Mascota agregada exitosamente');
      setIsAddingPet(false);
    },
    onError: (error) => {
      console.error('Error creating pet:', error);
      toast.error('Error al agregar la mascota');
    },
  });

  const updatePetMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Pet> }) => updateMyPet(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-pets'] });
      toast.success('Mascota actualizada exitosamente');
      setEditingPet(null);
    },
    onError: (error) => {
      console.error('Error updating pet:', error);
      toast.error('Error al actualizar la mascota');
    },
  });

  const deletePetMutation = useMutation({
    mutationFn: deleteMyPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-pets'] });
      toast.success('Mascota eliminada exitosamente');
    },
    onError: (error) => {
      console.error('Error deleting pet:', error);
      toast.error('Error al eliminar la mascota');
    },
  });

  const handleAddPet = (petData: any) => {
    createPetMutation.mutate(petData);
  };

  const handleUpdatePet = (petData: Pet) => {
    if (editingPet) {
      updatePetMutation.mutate({ id: editingPet.id, data: petData });
    }
  };

  const handleDeletePet = (petId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta mascota?')) {
      deletePetMutation.mutate(petId);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const PetCard = ({ pet }: { pet: Pet }) => {
    const characteristics = Array.isArray(pet.characteristics) ? pet.characteristics as string[] : [];
    
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-48 object-cover"
          />
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
              <CardDescription>{pet.breed} • {pet.age}</CardDescription>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => setEditingPet(pet)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-red-600"
                onClick={() => handleDeletePet(pet.id)}
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
                <span>{pet.size}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500">Género:</span>
                <span>{pet.gender}</span>
              </div>
            </div>
            
            <div className="flex gap-1 flex-wrap">
              {pet.vaccinated && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Vacunado
                </Badge>
              )}
              {pet.sterilized && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Esterilizado
                </Badge>
              )}
              {characteristics.slice(0, 2).map((char, index) => (
                <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                  {char}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const PetForm = ({ pet, onSave, onCancel }: { pet?: Pet, onSave: (petData: any) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState(pet || {
      name: '',
      type: 'Perro',
      breed: '',
      age: '',
      size: 'Mediano',
      gender: 'Macho',
      description: '',
      vaccinated: false,
      sterilized: false,
      characteristics: []
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.breed || !formData.age) {
        toast.error('Por favor completa todos los campos obligatorios.');
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
              <option value="Ave">Ave</option>
              <option value="Conejo">Conejo</option>
              <option value="Hámster">Hámster</option>
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
            <Label htmlFor="age">Edad *</Label>
            <Input
              id="age"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              placeholder="Ej: 2 años, 6 meses"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="size">Tamaño *</Label>
            <select 
              id="size"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.size}
              onChange={(e) => setFormData({...formData, size: e.target.value})}
              required
            >
              <option value="Pequeño">Pequeño</option>
              <option value="Mediano">Mediano</option>
              <option value="Grande">Grande</option>
            </select>
          </div>
          <div>
            <Label htmlFor="gender">Género *</Label>
            <select 
              id="gender"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              required
            >
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
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
              id="sterilized"
              checked={formData.sterilized}
              onChange={(e) => setFormData({...formData, sterilized: e.target.checked})}
              className="h-4 w-4"
            />
            <Label htmlFor="sterilized">Esterilizado</Label>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={createPetMutation.isPending || updatePetMutation.isPending}>
            {pet ? 'Actualizar' : 'Agregar'} Mascota
          </Button>
        </div>
      </form>
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
                Agrega la información de tu mascota para llevar un registro completo.
              </DialogDescription>
            </DialogHeader>
            <PetForm 
              onSave={handleAddPet}
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
          {editingPet && (
            <PetForm 
              pet={editingPet}
              onSave={handleUpdatePet}
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
              Agrega información sobre tus mascotas para llevar un registro completo.
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
