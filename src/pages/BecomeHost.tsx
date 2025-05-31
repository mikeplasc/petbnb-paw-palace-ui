
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Star, Shield, Heart, CheckCircle } from 'lucide-react';
import { cities, petTypes } from '@/data/mockData';

const BecomeHost = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    city: '',
    address: '',
    description: '',
    experience: '',
    acceptedPets: [] as string[],
    services: [] as string[],
    pricePerNight: '',
    photos: [] as string[]
  });

  const [currentStep, setCurrentStep] = useState(1);

  const hostTypes = [
    { value: 'family', label: 'Familia' },
    { value: 'individual', label: 'Cuidador individual' },
    { value: 'veterinary', label: 'Veterinaria/Clínica' }
  ];

  const availableServices = [
    'Paseos diarios',
    'Alimentación personalizada',
    'Administración de medicamentos',
    'Juegos y entretenimiento',
    'Fotos diarias',
    'Grooming básico',
    'Entrenamiento básico',
    'Cuidado nocturno',
    'Emergencias 24/7',
    'Transporte veterinario'
  ];

  const handlePetTypeChange = (petType: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        acceptedPets: [...prev.acceptedPets, petType]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        acceptedPets: prev.acceptedPets.filter(pet => pet !== petType)
      }));
    }
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, service]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        services: prev.services.filter(s => s !== service)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setCurrentStep(4);
  };

  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: 'Ayuda a mascotas felices',
      description: 'Brinda amor y cuidado a mascotas mientras sus dueños están fuera'
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: 'Gana dinero extra',
      description: 'Convierte tu amor por los animales en una fuente de ingresos'
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: 'Flexibilidad total',
      description: 'Tú decides cuándo y cómo ofrecer tus servicios'
    }
  ];

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-petbnb-50 to-warm-50 flex items-center justify-center px-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud enviada!</h2>
            <p className="text-gray-600 mb-6">
              Revisaremos tu información y te contactaremos en 24-48 horas.
            </p>
            <Button onClick={() => setCurrentStep(1)} className="w-full">
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-petbnb-50 to-warm-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Conviértete en cuidador de 
            <span className="bg-gradient-to-r from-petbnb-600 to-primary-600 bg-clip-text text-transparent"> mascotas</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad de cuidadores y ayuda a que las mascotas se sientan como en casa
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Registro de cuidador
              </CardTitle>
              
              {/* Progress Steps */}
              <div className="flex justify-center space-x-8 mt-6">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`flex items-center space-x-2 ${
                      currentStep >= step ? 'text-petbnb-600' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep >= step
                          ? 'bg-petbnb-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {step}
                    </div>
                    <span className="text-sm font-medium">
                      {step === 1 && 'Información básica'}
                      {step === 2 && 'Servicios'}
                      {step === 3 && 'Fotos y precios'}
                    </span>
                  </div>
                ))}
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nombre del hogar/cuidador</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Ej: Casa de María Elena"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="type">Tipo de cuidador</Label>
                        <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {hostTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ciudad</Label>
                        <Select value={formData.city} onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu ciudad" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="experience">Años de experiencia</Label>
                        <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona experiencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2">1-2 años</SelectItem>
                            <SelectItem value="3-5">3-5 años</SelectItem>
                            <SelectItem value="5-10">5-10 años</SelectItem>
                            <SelectItem value="10+">Más de 10 años</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Dirección (zona/colonia)</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Ej: Roma Norte, CDMX"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Cuéntanos sobre ti, tu experiencia con mascotas, tu hogar..."
                        rows={4}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Services */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">¿Qué mascotas aceptas?</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                        {petTypes.map((petType) => (
                          <div key={petType} className="flex items-center space-x-2">
                            <Checkbox
                              id={petType}
                              checked={formData.acceptedPets.includes(petType)}
                              onCheckedChange={(checked) => handlePetTypeChange(petType, checked as boolean)}
                            />
                            <Label htmlFor={petType} className="text-sm">{petType}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">¿Qué servicios ofreces?</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        {availableServices.map((service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={service}
                              checked={formData.services.includes(service)}
                              onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                            />
                            <Label htmlFor={service} className="text-sm">{service}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Photos and Pricing */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">Fotos de tu hogar</Label>
                      <div className="mt-3 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Arrastra fotos aquí o haz clic para seleccionar</p>
                        <p className="text-sm text-gray-500">Sube al menos 3 fotos de tu hogar</p>
                        <Button type="button" variant="outline" className="mt-3">
                          Seleccionar fotos
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="price">Precio por noche (MXN)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.pricePerNight}
                        onChange={(e) => setFormData(prev => ({ ...prev, pricePerNight: e.target.value }))}
                        placeholder="300"
                        min="100"
                        max="2000"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Precio sugerido: $250-500 MXN por noche
                      </p>
                    </div>

                    <div className="bg-petbnb-50 p-4 rounded-lg">
                      <h4 className="font-medium text-petbnb-800 mb-2">Resumen de tu perfil</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Nombre:</span> {formData.name}</p>
                        <p><span className="font-medium">Tipo:</span> {formData.type}</p>
                        <p><span className="font-medium">Ciudad:</span> {formData.city}</p>
                        <p><span className="font-medium">Mascotas aceptadas:</span></p>
                        <div className="flex flex-wrap gap-1">
                          {formData.acceptedPets.map(pet => (
                            <Badge key={pet} variant="secondary" className="text-xs">
                              {pet}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                    >
                      Anterior
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      className="ml-auto bg-petbnb-600 hover:bg-petbnb-700"
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="ml-auto bg-petbnb-600 hover:bg-petbnb-700"
                    >
                      Enviar solicitud
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BecomeHost;
