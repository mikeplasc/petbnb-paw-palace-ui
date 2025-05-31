
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, MapPin, Star, Stethoscope } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import VeterinaryForm from '@/components/VeterinaryForm';

interface Veterinary {
  id: string;
  name: string;
  location: string;
  description: string;
  services: string[];
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  images: string[];
  certifications: string[];
  specialties: string[];
  responseTime: string;
}

const MyVeterinaries = () => {
  const [veterinaries, setVeterinaries] = useState<Veterinary[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVeterinary, setEditingVeterinary] = useState<Veterinary | null>(null);

  // Load veterinaries from localStorage
  useEffect(() => {
    const savedVeterinaries = JSON.parse(localStorage.getItem('myVeterinaries') || '[]');
    setVeterinaries(savedVeterinaries);
  }, []);

  // Save veterinaries to localStorage
  const saveVeterinaries = (updatedVeterinaries: Veterinary[]) => {
    setVeterinaries(updatedVeterinaries);
    localStorage.setItem('myVeterinaries', JSON.stringify(updatedVeterinaries));
  };

  const handleAddVeterinary = (veterinaryData: Omit<Veterinary, 'id'>) => {
    const newVeterinary: Veterinary = {
      ...veterinaryData,
      id: Date.now().toString(),
    };

    const updatedVeterinaries = [...veterinaries, newVeterinary];
    saveVeterinaries(updatedVeterinaries);
    setIsFormOpen(false);
    
    toast({
      title: "Veterinaria agregada",
      description: "La veterinaria se ha agregado exitosamente.",
    });
  };

  const handleEditVeterinary = (veterinaryData: Omit<Veterinary, 'id'>) => {
    if (!editingVeterinary) return;

    const updatedVeterinaries = veterinaries.map(vet =>
      vet.id === editingVeterinary.id
        ? { ...veterinaryData, id: editingVeterinary.id }
        : vet
    );

    saveVeterinaries(updatedVeterinaries);
    setEditingVeterinary(null);
    
    toast({
      title: "Veterinaria actualizada",
      description: "La veterinaria se ha actualizado exitosamente.",
    });
  };

  const handleDeleteVeterinary = (id: string) => {
    const updatedVeterinaries = veterinaries.filter(vet => vet.id !== id);
    saveVeterinaries(updatedVeterinaries);
    
    toast({
      title: "Veterinaria eliminada",
      description: "La veterinaria se ha eliminado exitosamente.",
    });
  };

  const openEditForm = (veterinary: Veterinary) => {
    setEditingVeterinary(veterinary);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingVeterinary(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Mis Veterinarias
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Gestiona tus servicios veterinarios
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Add Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Veterinarias Registradas
            </h2>
            <p className="text-gray-600">
              {veterinaries.length} veterinarias registradas
            </p>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Veterinaria
          </Button>
        </div>

        {/* Veterinaries Grid */}
        {veterinaries.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Stethoscope className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tienes veterinarias registradas
              </h3>
              <p className="text-gray-600 mb-4">
                Comienza agregando tu primera veterinaria
              </p>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Veterinaria
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {veterinaries.map((veterinary) => (
              <Card key={veterinary.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{veterinary.name}</CardTitle>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{veterinary.location}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditForm(veterinary)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteVeterinary(veterinary.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-semibold mr-2">{veterinary.rating}</span>
                      <span className="text-gray-500 text-sm">({veterinary.reviewCount} reseñas)</span>
                    </div>
                    
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {veterinary.description}
                    </p>
                    
                    <div className="text-2xl font-bold text-primary-600">
                      ${veterinary.pricePerNight}
                      <span className="text-sm font-normal text-gray-500">/noche</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {veterinary.services.slice(0, 3).map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {veterinary.services.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{veterinary.services.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      <VeterinaryForm
        isOpen={isFormOpen || !!editingVeterinary}
        onClose={closeForm}
        onSubmit={editingVeterinary ? handleEditVeterinary : handleAddVeterinary}
        initialData={editingVeterinary}
        mode={editingVeterinary ? 'edit' : 'add'}
      />
    </div>
  );
};

export default MyVeterinaries;
