
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, MapPin, Star, Stethoscope } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import VeterinaryForm from '@/components/VeterinaryForm';
import { 
  createVeterinary, 
  getMyVeterinaries, 
  updateVeterinary, 
  deleteVeterinary,
  VeterinaryData 
} from '@/services/veterinaryService';
import { Database } from '@/integrations/supabase/types';

type VeterinaryRow = Database['public']['Tables']['hosts']['Row'];

const MyVeterinaries = () => {
  const [veterinaries, setVeterinaries] = useState<VeterinaryRow[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVeterinary, setEditingVeterinary] = useState<VeterinaryRow | null>(null);
  const [loading, setLoading] = useState(true);

  // Load veterinaries from Supabase
  useEffect(() => {
    loadVeterinaries();
  }, []);

  const loadVeterinaries = async () => {
    try {
      setLoading(true);
      const data = await getMyVeterinaries();
      setVeterinaries(data);
    } catch (error) {
      console.error('Error loading veterinaries:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las veterinarias.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddVeterinary = async (veterinaryData: VeterinaryData) => {
    try {
      await createVeterinary(veterinaryData);
      await loadVeterinaries();
      setIsFormOpen(false);
      
      toast({
        title: "Veterinaria agregada",
        description: "La veterinaria se ha agregado exitosamente.",
      });
    } catch (error) {
      console.error('Error adding veterinary:', error);
      toast({
        title: "Error",
        description: "No se pudo agregar la veterinaria.",
        variant: "destructive"
      });
    }
  };

  const handleEditVeterinary = async (veterinaryData: VeterinaryData) => {
    if (!editingVeterinary) return;

    try {
      await updateVeterinary(editingVeterinary.id, veterinaryData);
      await loadVeterinaries();
      setEditingVeterinary(null);
      
      toast({
        title: "Veterinaria actualizada",
        description: "La veterinaria se ha actualizado exitosamente.",
      });
    } catch (error) {
      console.error('Error updating veterinary:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la veterinaria.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteVeterinary = async (id: string) => {
    try {
      await deleteVeterinary(id);
      await loadVeterinaries();
      
      toast({
        title: "Veterinaria eliminada",
        description: "La veterinaria se ha eliminado exitosamente.",
      });
    } catch (error) {
      console.error('Error deleting veterinary:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la veterinaria.",
        variant: "destructive"
      });
    }
  };

  const openEditForm = (veterinary: VeterinaryRow) => {
    const formData: VeterinaryData = {
      name: veterinary.name,
      location: veterinary.location,
      description: veterinary.description || '',
      services: veterinary.services || [],
      pricePerNight: Number(veterinary.price_per_night),
      rating: Number(veterinary.rating || 5),
      reviewCount: veterinary.review_count || 0,
      images: veterinary.images || [],
      certifications: veterinary.certifications || [],
      specialties: veterinary.specialties || [],
      responseTime: veterinary.response_time || 'Menos de 1 hora',
      acceptedPets: veterinary.accepted_pets || []
    };
    setEditingVeterinary(veterinary);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingVeterinary(null);
  };

  const getEditFormData = (): VeterinaryData | null => {
    if (!editingVeterinary) return null;
    
    return {
      name: editingVeterinary.name,
      location: editingVeterinary.location,
      description: editingVeterinary.description || '',
      services: editingVeterinary.services || [],
      pricePerNight: Number(editingVeterinary.price_per_night),
      rating: Number(editingVeterinary.rating || 5),
      reviewCount: editingVeterinary.review_count || 0,
      images: editingVeterinary.images || [],
      certifications: editingVeterinary.certifications || [],
      specialties: editingVeterinary.specialties || [],
      responseTime: editingVeterinary.response_time || 'Menos de 1 hora',
      acceptedPets: editingVeterinary.accepted_pets || []
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando veterinarias...</p>
        </div>
      </div>
    );
  }

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
                      <span className="text-gray-500 text-sm">({veterinary.review_count} reseñas)</span>
                    </div>
                    
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {veterinary.description}
                    </p>
                    
                    <div className="text-2xl font-bold text-primary-600">
                      ${veterinary.price_per_night}
                      <span className="text-sm font-normal text-gray-500">/noche</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {veterinary.services?.slice(0, 3).map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {veterinary.services && veterinary.services.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{veterinary.services.length - 3} más
                        </Badge>
                      )}
                    </div>

                    {veterinary.accepted_pets && veterinary.accepted_pets.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="text-sm text-gray-600 mr-2">Acepta:</span>
                        {veterinary.accepted_pets.slice(0, 2).map((pet, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {pet}
                          </Badge>
                        ))}
                        {veterinary.accepted_pets.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{veterinary.accepted_pets.length - 2} más
                          </Badge>
                        )}
                      </div>
                    )}
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
        initialData={getEditFormData()}
        mode={editingVeterinary ? 'edit' : 'add'}
      />
    </div>
  );
};

export default MyVeterinaries;
