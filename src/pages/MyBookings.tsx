
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, User, Star, MessageCircle, Stethoscope } from 'lucide-react';
import { getUserBookings } from '@/services/bookingService';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Get bookings from service
  const allBookings = getUserBookings();
  
  // Separate bookings by status and add mock data for demonstration
  const mockBookings = [
    {
      id: 1,
      hostName: 'María García',
      hostImage: '/placeholder-user.jpg',
      petName: 'Luna',
      service: 'Cuidado en casa del cuidador',
      startDate: '2024-06-15',
      endDate: '2024-06-18',
      location: 'Barcelona, España',
      status: 'confirmed',
      price: 120,
      rating: 4.9,
      type: 'host'
    },
    {
      id: 2,
      hostName: 'Carlos López',
      hostImage: '/placeholder-user.jpg',
      petName: 'Max',
      service: 'Paseo de perros',
      startDate: '2024-06-20',
      endDate: '2024-06-20',
      location: 'Madrid, España',
      status: 'pending',
      price: 25,
      rating: 4.7,
      type: 'host'
    }
  ];

  // Combine real bookings with mock data
  const combinedUpcomingBookings = [
    ...mockBookings.filter(booking => booking.status === 'confirmed' || booking.status === 'pending'),
    ...allBookings.filter(booking => booking.status === 'confirmed' || booking.status === 'pending')
  ];

  const combinedPastBookings = [
    ...mockBookings.filter(booking => booking.status === 'completed'),
    ...allBookings.filter(booking => booking.status === 'completed')
  ];

  const bookings = {
    upcoming: combinedUpcomingBookings,
    past: combinedPastBookings
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    const labels = {
      confirmed: 'Confirmada',
      pending: 'Pendiente',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const BookingCard = ({ booking }: { booking: any }) => {
    const isVeterinary = booking.type === 'veterinary';
    const petName = booking.petInfo?.name || booking.petName;
    const serviceName = booking.serviceType || booking.service;
    
    return (
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isVeterinary 
                  ? 'bg-gradient-to-br from-blue-100 to-blue-200' 
                  : 'bg-gradient-to-br from-petbnb-100 to-primary-100'
              }`}>
                {isVeterinary ? (
                  <Stethoscope className="h-6 w-6 text-blue-700" />
                ) : (
                  <User className="h-6 w-6 text-primary-700" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg">{booking.hostName}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {booking.rating || 'N/A'}
                  {isVeterinary && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      Veterinaria
                    </Badge>
                  )}
                </CardDescription>
              </div>
            </div>
            {getStatusBadge(booking.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">🐕 Mascota:</span>
                {petName}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Servicio:</span>
                {serviceName}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {booking.location}
              </div>
              {isVeterinary && booking.preferredTime && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {booking.preferredTime}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                {booking.startDate} {booking.endDate !== booking.startDate && `- ${booking.endDate}`}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Precio:</span>
                ${booking.totalPrice || booking.price}
              </div>
              {isVeterinary && booking.notes && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Notas:</span>
                  <p className="text-xs mt-1">{booking.notes}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              Contactar
            </Button>
            {booking.status === 'completed' && !booking.reviewed && (
              <Button size="sm" className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                Valorar
              </Button>
            )}
            {booking.status === 'confirmed' && (
              <Button variant="outline" size="sm">
                Ver detalles
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Reservas</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="past">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="space-y-4">
            {bookings.upcoming.length > 0 ? (
              bookings.upcoming.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No tienes reservas próximas
                  </h3>
                  <p className="text-gray-600 mb-4">
                    ¡Busca cuidadores para tu mascota y haz tu primera reserva!
                  </p>
                  <Button>Buscar cuidadores</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="space-y-4">
            {bookings.past.length > 0 ? (
              bookings.past.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Clock className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No tienes reservas anteriores
                  </h3>
                  <p className="text-gray-600">
                    Aquí aparecerán tus reservas completadas
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBookings;
