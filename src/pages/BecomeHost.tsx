
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md mx-auto text-center shadow-lg">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">¡Solicitud enviada!</h2>
            <p className="text-gray-600 mb-8">
              Revisaremos tu información y te contactaremos en 24-48 horas.
            </p>
            <Button onClick={() => setCurrentStep(1)} className="w-full bg-petbnb-600 hover:bg-petbnb-700">
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Conviértete en 
            <span className="bg-gradient-to-r from-petbnb-600 to-primary-600 bg-clip-text text-transparent"> cuidador</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Únete a nuestra comunidad de cuidadores y ayuda a que las mascotas se sientan como en casa
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-lg border border-gray-200">
            <CardHeader className="bg-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Registro de cuidador
              </CardTitle>
              
              {/* Progress Steps */}
              <div className="flex justify-center space-x-8 mt-8">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`flex items-center space-x-3 ${
                      currentStep >= step ? 'text-petbnb-600' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                        currentStep >= step
                          ? 'bg-petbnb-600 text-white border-petbnb-600'
                          : 'bg-white text-gray-400 border-gray-300'
                      }`}
                    >
                      {step}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">
                      {step === 1 && 'Información básica'}
                      {step === 2 && 'Servicios'}
                      {step === 3 && 'Fotos y precios'}
                    </span>
                  </div>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-8 bg-white">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">Nombre del hogar/cuidador</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Ej: Casa de María Elena"
                          className="border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type" className="text-gray-700 font-medium">Tipo de cuidador</Label>
                        <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger className="border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-700 font-medium">Ciudad</Label>
                        <Select value={formData.city} onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}>
                          <SelectTrigger className="border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500">
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
                      <div className="space-y-2">
                        <Label htmlFor="experience" className="text-gray-700 font-medium">Años de experiencia</Label>
                        <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                          <SelectTrigger className="border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500">
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

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-700 font-medium">Dirección (zona/colonia)</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Ej: Roma Norte, CDMX"
                        className="border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-gray-700 font-medium">Descripción</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Cuéntanos sobre ti, tu experiencia con mascotas, tu hogar..."
                        rows={4}
                        className="border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Services */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Label className="text-lg font-medium text-gray-900">¿Qué mascotas aceptas?</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {petTypes.map((petType) => (
                          <div key={petType} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <Checkbox
                              id={petType}
                              checked={formData.acceptedPets.includes(petType)}
                              onCheckedChange={(checked) => handlePetTypeChange(petType, checked as boolean)}
                            />
                            <Label htmlFor={petType} className="text-sm font-medium text-gray-700">{petType}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-medium text-gray-900">¿Qué servicios ofreces?</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availableServices.map((service) => (
                          <div key={service} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <Checkbox
                              id={service}
                              checked={formData.services.includes(service)}
                              onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                            />
                            <Label htmlFor={service} className="text-sm font-medium text-gray-700">{service}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Photos and Pricing */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Label className="text-lg font-medium text-gray-900">Fotos de tu hogar</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-petbnb-400 transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-3 font-medium">Arrastra fotos aquí o haz clic para seleccionar</p>
                        <p className="text-sm text-gray-500 mb-4">Sube al menos 3 fotos de tu hogar</p>
                        <Button type="button" variant="outline" className="border-petbnb-500 text-petbnb-600 hover:bg-petbnb-50">
                          Seleccionar fotos
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="price" className="text-lg font-medium text-gray-900">Precio por noche (MXN)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.pricePerNight}
                        onChange={(e) => setFormData(prev => ({ ...prev, pricePerNight: e.target.value }))}
                        placeholder="300"
                        min="100"
                        max="2000"
                        className="border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500 text-lg"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        Precio sugerido: $250-500 MXN por noche
                      </p>
                    </div>

                    <div className="bg-petbnb-50 border border-petbnb-200 p-6 rounded-lg">
                      <h4 className="font-semibold text-petbnb-800 mb-4 text-lg">Resumen de tu perfil</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex"><span className="font-medium text-gray-700 w-32">Nombre:</span> <span className="text-gray-900">{formData.name}</span></div>
                        <div className="flex"><span className="font-medium text-gray-700 w-32">Tipo:</span> <span className="text-gray-900">{formData.type}</span></div>
                        <div className="flex"><span className="font-medium text-gray-700 w-32">Ciudad:</span> <span className="text-gray-900">{formData.city}</span></div>
                        <div>
                          <span className="font-medium text-gray-700">Mascotas aceptadas:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.acceptedPets.map(pet => (
                              <Badge key={pet} variant="secondary" className="bg-petbnb-100 text-petbnb-700">
                                {pet}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-gray-200">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Anterior
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      className="ml-auto bg-petbnb-600 hover:bg-petbnb-700 text-white"
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="ml-auto bg-petbnb-600 hover:bg-petbnb-700 text-white"
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
