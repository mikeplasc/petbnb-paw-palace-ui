
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface VeterinaryFormData {
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

interface VeterinaryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: VeterinaryFormData) => void;
  initialData?: VeterinaryFormData | null;
  mode: 'add' | 'edit';
}

const VeterinaryForm = ({ isOpen, onClose, onSubmit, initialData, mode }: VeterinaryFormProps) => {
  const [formData, setFormData] = useState<VeterinaryFormData>({
    name: '',
    location: '',
    description: '',
    services: [],
    pricePerNight: 0,
    rating: 5.0,
    reviewCount: 0,
    images: [],
    certifications: [],
    specialties: [],
    responseTime: 'Menos de 1 hora'
  });

  const [newService, setNewService] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        location: '',
        description: '',
        services: [],
        pricePerNight: 0,
        rating: 5.0,
        reviewCount: 0,
        images: [],
        certifications: [],
        specialties: [],
        responseTime: 'Menos de 1 hora'
      });
    }
  }, [initialData, mode]);

  const handleInputChange = (field: keyof VeterinaryFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addItem = (field: 'services' | 'certifications' | 'specialties' | 'images', value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setter('');
    }
  };

  const removeItem = (field: 'services' | 'certifications' | 'specialties' | 'images', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.location && formData.description) {
      onSubmit(formData);
    }
  };

  const commonServices = [
    'Consulta general',
    'Vacunación',
    'Cirugía',
    'Emergencias 24h',
    'Radiografías',
    'Laboratorio',
    'Hospitalización',
    'Grooming',
    'Microchip',
    'Esterilización'
  ];

  const commonCertifications = [
    'Medicina Veterinaria (DVM)',
    'Colegio Médico Veterinario',
    'Especialización en Cirugía',
    'Certificación en Emergencias',
    'Curso de Anestesiología',
    'Radiología Veterinaria'
  ];

  const commonSpecialties = [
    'Medicina Interna',
    'Cirugía',
    'Dermatología',
    'Cardiología',
    'Neurología',
    'Oftalmología',
    'Traumatología',
    'Medicina Preventiva'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Editar Veterinaria' : 'Agregar Nueva Veterinaria'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre de la Veterinaria *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Ubicación *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Ciudad, Estado"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe tu veterinaria..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Precio por Noche</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.pricePerNight}
                    onChange={(e) => handleInputChange('pricePerNight', Number(e.target.value))}
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Calificación</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => handleInputChange('rating', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="reviewCount">Número de Reseñas</Label>
                  <Input
                    id="reviewCount"
                    type="number"
                    value={formData.reviewCount}
                    onChange={(e) => handleInputChange('reviewCount', Number(e.target.value))}
                    min="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    placeholder="Agregar servicio..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('services', newService, setNewService);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addItem('services', newService, setNewService)}
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Servicios comunes:</Label>
                  <div className="flex flex-wrap gap-2">
                    {commonServices.map((service) => (
                      <Button
                        key={service}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!formData.services.includes(service)) {
                            addItem('services', service, () => {});
                          }
                        }}
                        disabled={formData.services.includes(service)}
                      >
                        {service}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {service}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeItem('services', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Certificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="Agregar certificación..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('certifications', newCertification, setNewCertification);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addItem('certifications', newCertification, setNewCertification)}
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Certificaciones comunes:</Label>
                  <div className="flex flex-wrap gap-2">
                    {commonCertifications.map((cert) => (
                      <Button
                        key={cert}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!formData.certifications.includes(cert)) {
                            addItem('certifications', cert, () => {});
                          }
                        }}
                        disabled={formData.certifications.includes(cert)}
                      >
                        {cert}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {cert}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeItem('certifications', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Especialidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="Agregar especialidad..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('specialties', newSpecialty, setNewSpecialty);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addItem('specialties', newSpecialty, setNewSpecialty)}
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Especialidades comunes:</Label>
                  <div className="flex flex-wrap gap-2">
                    {commonSpecialties.map((specialty) => (
                      <Button
                        key={specialty}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!formData.specialties.includes(specialty)) {
                            addItem('specialties', specialty, () => {});
                          }
                        }}
                        disabled={formData.specialties.includes(specialty)}
                      >
                        {specialty}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {specialty}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeItem('specialties', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Imágenes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="URL de la imagen..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('images', newImage, setNewImage);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addItem('images', newImage, setNewImage)}
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Imagen ${index + 1}`}
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <X
                        className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full cursor-pointer"
                        onClick={() => removeItem('images', index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
              {mode === 'edit' ? 'Actualizar' : 'Agregar'} Veterinaria
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VeterinaryForm;
