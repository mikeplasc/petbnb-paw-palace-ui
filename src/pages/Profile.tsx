
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Heart, Clock } from 'lucide-react';
import { getUserAdoptionRequests } from '@/services/adoptionService';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    joinDate: 'Enero 2023',
    bio: 'Amante de los animales con más de 5 años de experiencia cuidando mascotas.'
  });

  const { data: adoptionRequests = [], isLoading } = useQuery({
    queryKey: ['userAdoptionRequests'],
    queryFn: getUserAdoptionRequests,
  });

  const handleSave = () => {
    // Aquí iría la lógica para guardar los datos
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Aquí restaurarías los datos originales
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobada';
      case 'rejected': return 'Rechazada';
      default: return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Edit2 className="h-4 w-4" />
            Editar Perfil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Guardar
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Cancelar
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar y información básica */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src="/placeholder-user.jpg" alt={formData.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-petbnb-100 to-primary-100 text-primary-700">
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{formData.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <Calendar className="h-4 w-4" />
                Miembro desde {formData.joinDate}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Estadísticas */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reservas completadas</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valoración promedio</span>
                  <span className="font-semibold">4.8 ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mascotas registradas</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Solicitudes de adopción</span>
                  <span className="font-semibold">{adoptionRequests.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información detallada */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Información Personal</CardTitle>
              <CardDescription>
                Gestiona tu información personal y preferencias
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Ubicación
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <textarea
                  id="bio"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Cuéntanos un poco sobre ti y tu experiencia con mascotas..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Solicitudes de Adopción */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Heart className="h-5 w-5 text-purple-600" />
                Mis Solicitudes de Adopción
              </CardTitle>
              <CardDescription>
                Historial de todas tus solicitudes de adopción
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-b-2 border-purple-600 rounded-full mx-auto"></div>
                  <p className="text-gray-500 mt-2">Cargando solicitudes...</p>
                </div>
              ) : adoptionRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No has realizado ninguna solicitud de adopción aún.</p>
                  <p className="text-sm">¡Visita nuestra sección de adopción para encontrar tu compañero perfecto!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {adoptionRequests.map((request) => (
                    <div key={request.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                      <img
                        src={request.pet_image}
                        alt={request.pet_name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{request.pet_name}</h4>
                        <p className="text-sm text-gray-600">{request.shelter_name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {new Date(request.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusText(request.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
