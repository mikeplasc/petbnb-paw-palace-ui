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
import { Upload, Star, Shield, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { cities, petTypes } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { submitHostApplication } from '@/services/hostApplicationService';
import { supabase } from '@/integrations/supabase/client';

const BecomeHost = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

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

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Por favor ingresa un correo electrónico válido';
      }
    }

    if (!formData.type) {
      newErrors.type = 'Debes seleccionar un tipo de cuidador';
    }

    if (!formData.city) {
      newErrors.city = 'Debes seleccionar una ciudad';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'La dirección debe tener al menos 5 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'La descripción debe tener al menos 50 caracteres';
    }

    if (!formData.experience) {
      newErrors.experience = 'Debes seleccionar tu experiencia';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (formData.acceptedPets.length === 0) {
      newErrors.acceptedPets = 'Debes seleccionar al menos un tipo de mascota';
    }

    if (formData.services.length === 0) {
      newErrors.services = 'Debes seleccionar al menos un servicio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.pricePerNight) {
      newErrors.pricePerNight = 'El precio es requerido';
    } else {
      const price = parseInt(formData.pricePerNight);
      if (isNaN(price) || price < 100) {
        newErrors.pricePerNight = 'El precio mínimo es $100 MXN';
      } else if (price > 2000) {
        newErrors.pricePerNight = 'El precio máximo es $2000 MXN';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
    }

    if (isValid) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
    } else {
      toast({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos requeridos antes de continuar.",
        variant: "destructive",
      });
    }
  };

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
    if (errors.acceptedPets) {
      setErrors(prev => ({ ...prev, acceptedPets: '' }));
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
    if (errors.services) {
      setErrors(prev => ({ ...prev, services: '' }));
    }
  };

  const handleResendEmail = async () => {
    setIsSubmitting(true);
    setEmailError(null);
    
    try {
      const emailResponse = await supabase.functions.invoke('send-host-registration-email', {
        body: {
          name: formData.name,
          email: formData.email,
          type: formData.type,
          city: formData.city,
        },
      });

      if (emailResponse.error) {
        throw new Error(emailResponse.error.message);
      }

      setEmailSent(true);
      toast({
        title: "¡Email reenviado!",
        description: "Hemos reenviado el correo de confirmación.",
      });
    } catch (error) {
      console.error('Error resending email:', error);
      setEmailError(error instanceof Error ? error.message : 'Error al reenviar el email');
      toast({
        title: "Error al reenviar el email",
        description: "Por favor, intenta nuevamente más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setEmailError(null);
    
    try {
      await submitHostApplication({
        name: formData.name,
        email: formData.email,
        type: formData.type,
        city: formData.city,
        address: formData.address,
        description: formData.description,
        experience: formData.experience,
        accepted_pets: formData.acceptedPets,
        services: formData.services,
        price_per_night: parseInt(formData.pricePerNight),
        photos: formData.photos,
      });

      setCurrentStep(4);
      setEmailSent(true);
      
      toast({
        title: "¡Solicitud enviada exitosamente!",
        description: "Hemos enviado un correo de confirmación con los próximos pasos.",
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      
      // Check if the error is specifically from email sending
      if (error instanceof Error && error.message.includes('email')) {
        setEmailError(error.message);
        toast({
          title: "Solicitud enviada, pero hubo un problema con el email",
          description: "Tu solicitud fue registrada, pero no pudimos enviar el email de confirmación. Puedes intentar reenviarlo.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error al enviar la solicitud",
          description: "Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
            <p className="text-gray-600 mb-4">
              Revisaremos tu información y te contactaremos en 24-48 horas.
            </p>
            {emailSent ? (
              <p className="text-sm text-gray-500 mb-8">
                Hemos enviado un correo electrónico a <strong>{formData.email}</strong> con información detallada sobre los próximos pasos.
              </p>
            ) : (
              <div className="mb-8">
                <p className="text-sm text-red-500 mb-4">
                  No pudimos enviar el email de confirmación. ¿Deseas intentar nuevamente?
                </p>
                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  disabled={isSubmitting}
                  className="w-full mb-4"
                >
                  {isSubmitting ? 'Reenviando...' : 'Reenviar email de confirmación'}
                </Button>
                {emailError && (
                  <p className="text-xs text-red-500">
                    Error: {emailError}
                  </p>
                )}
              </div>
            )}
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
                        <Label htmlFor="name" className="text-gray-700 font-medium">
                          Nombre del hogar/cuidador *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Ej: Casa de María Elena"
                          className={`border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500 ${
                            errors.name ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.name && (
                          <div className="flex items-center space-x-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                          Correo electrónico *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="tu@correo.com"
                          className={`border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500 ${
                            errors.email ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.email && (
                          <div className="flex items-center space-x-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="type" className="text-gray-700 font-medium">
                          Tipo de cuidador *
                        </Label>
                        <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                          <SelectTrigger className={`border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500 ${
                            errors.type ? 'border-red-500' : ''
                          }`}>
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
                        {errors.type && (
                          <div className="flex items-center space-x-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.type}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-700 font-medium">
                          Ciudad *
                        </Label>
                        <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                          <SelectTrigger className={`border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500 ${
                            errors.city ? 'border-red-500' : ''
                          }`}>
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
                        {errors.city && (
                          <div className="flex items-center space-x-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.city}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-gray-700 font-medium">
                          Dirección (zona/colonia) *
                        </Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Ej: Roma Norte, CDMX"
                          className={`border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500 ${
                            errors.address ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.address && (
                          <div className="flex items-center space-x-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.address}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience" className="text-gray-700 font-medium">
                          Años de experiencia *
                        </Label>
                        <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                          <SelectTrigger className={`border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500 ${
                            errors.experience ? 'border-red-500' : ''
                          }`}>
                            <SelectValue placeholder="Selecciona experiencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2">1-2 años</SelectItem>
                            <SelectItem value="3-5">3-5 años</SelectItem>
                            <SelectItem value="5-10">5-10 años</SelectItem>
                            <SelectItem value="10+">Más de 10 años</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.experience && (
                          <div className="flex items-center space-x-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.experience}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-gray-700 font-medium">
                        Descripción (mínimo 50 caracteres) *
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Cuéntanos sobre ti, tu experiencia con mascotas, tu hogar..."
                        rows={4}
                        className={`border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500 ${
                          errors.description ? 'border-red-500' : ''
                        }`}
                      />
                      <div className="flex justify-between items-center">
                        <div>
                          {errors.description && (
                            <div className="flex items-center space-x-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{errors.description}</span>
                            </div>
                          )}
                        </div>
                        <span className={`text-xs ${
                          formData.description.length >= 50 ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {formData.description.length}/50 caracteres
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Services */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Label className="text-lg font-medium text-gray-900">
                        ¿Qué mascotas aceptas? *
                      </Label>
                      {errors.acceptedPets && (
                        <div className="flex items-center space-x-1 text-red-500 text-sm mb-4">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.acceptedPets}</span>
                        </div>
                      )}
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
                      <Label className="text-lg font-medium text-gray-900">
                        ¿Qué servicios ofreces? *
                      </Label>
                      {errors.services && (
                        <div className="flex items-center space-x-1 text-red-500 text-sm mb-4">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.services}</span>
                        </div>
                      )}
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
                      <Label htmlFor="price" className="text-lg font-medium text-gray-900">
                        Precio por noche (MXN) *
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.pricePerNight}
                        onChange={(e) => handleInputChange('pricePerNight', e.target.value)}
                        placeholder="300"
                        min="100"
                        max="2000"
                        className={`border-gray-300 focus:border-petbnb-500 focus:ring-petbnb-500 text-lg ${
                          errors.pricePerNight ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.pricePerNight ? (
                        <div className="flex items-center space-x-1 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.pricePerNight}</span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Precio sugerido: $250-500 MXN por noche
                        </p>
                      )}
                    </div>

                    <div className="bg-petbnb-50 border border-petbnb-200 p-6 rounded-lg">
                      <h4 className="font-semibold text-petbnb-800 mb-4 text-lg">Resumen de tu perfil</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex"><span className="font-medium text-gray-700 w-32">Nombre:</span> <span className="text-gray-900">{formData.name}</span></div>
                        <div className="flex"><span className="font-medium text-gray-700 w-32">Email:</span> <span className="text-gray-900">{formData.email}</span></div>
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
                      disabled={isSubmitting}
                    >
                      Anterior
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="ml-auto bg-petbnb-600 hover:bg-petbnb-700 text-white"
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="ml-auto bg-petbnb-600 hover:bg-petbnb-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
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
