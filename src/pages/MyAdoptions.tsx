import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Clock, MapPin, Calendar, AlertCircle, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { getUserAdoptionRequests, type AdoptionRequest } from '@/services/adoptionService';
import { Link } from 'react-router-dom';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

const getStatusColor = (status: string | null) => {
  switch (status?.toLowerCase()) {
    case 'approved':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const getStatusIcon = (status: string | null) => {
  switch (status?.toLowerCase()) {
    case 'approved':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'rejected':
      return <XCircle className="h-5 w-5 text-red-600" />;
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-600" />;
    default:
      return <HelpCircle className="h-5 w-5 text-gray-600" />;
  }
};

const getStatusText = (status: string | null) => {
  switch (status?.toLowerCase()) {
    case 'approved':
      return 'Aprobada';
    case 'rejected':
      return 'Rechazada';
    case 'pending':
      return 'Pendiente';
    default:
      return 'Desconocido';
  }
};

const MyAdoptions = () => {
  const { data: adoptionRequests = [], isLoading } = useQuery({
    queryKey: ['userAdoptionRequests'],
    queryFn: getUserAdoptionRequests,
  });

  const pendingRequests = adoptionRequests.filter(request => request.status?.toLowerCase() === 'pending');
  const approvedRequests = adoptionRequests.filter(request => request.status?.toLowerCase() === 'approved');
  const rejectedRequests = adoptionRequests.filter(request => request.status?.toLowerCase() === 'rejected');

  const renderRequest = (request: AdoptionRequest) => {
    const userInfo = request.user_info as UserInfo;

    return (
      <Card key={request.id} className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={request.pet_image || '/placeholder-pet.jpg'}
              alt={request.pet_name}
              className="w-full md:w-48 h-48 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {request.pet_name}
                  </h3>
                  <p className="text-gray-600">{request.shelter_name}</p>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(request.status)}
                    {getStatusText(request.status)}
                  </div>
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Solicitud: {new Date(request.created_at || '').toLocaleDateString()}</span>
                </div>
                {request.updated_at && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Actualización: {new Date(request.updated_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Información de contacto</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Nombre:</span>{' '}
                    <span className="text-gray-900">{userInfo.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>{' '}
                    <span className="text-gray-900">{userInfo.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Teléfono:</span>{' '}
                    <span className="text-gray-900">{userInfo.phone}</span>
                  </div>
                </div>
              </div>

              {userInfo.message && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Mensaje</h4>
                  <p className="text-gray-600">{userInfo.message}</p>
                </div>
              )}

              {request.status === 'approved' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">¡Felicidades!</h4>
                      <p className="text-sm text-green-800">
                        Tu solicitud ha sido aprobada. El refugio se pondrá en contacto contigo
                        pronto para coordinar los siguientes pasos.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {request.status === 'rejected' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-900">Solicitud no aprobada</h4>
                      <p className="text-sm text-red-800">
                        Lo sentimos, tu solicitud no ha sido aprobada. Te invitamos a explorar
                        otras mascotas que podrían ser compatibles contigo.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin h-8 w-8 border-b-2 border-purple-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Adopciones</h1>
          <p className="text-gray-600 mt-2">
            Gestiona y da seguimiento a tus solicitudes de adopción
          </p>
        </div>
        <Link to="/adoption">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Heart className="h-4 w-4 mr-2" />
            Adoptar una mascota
          </Button>
        </Link>
      </div>

      {adoptionRequests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes solicitudes de adopción
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
              Explora nuestra sección de adopción y encuentra a tu compañero perfecto.
              ¡Hay muchas mascotas esperando un hogar!
            </p>
            <Link to="/adoption">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Ver mascotas disponibles
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Todas ({adoptionRequests.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pendientes ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Aprobadas ({approvedRequests.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Rechazadas ({rejectedRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {adoptionRequests.map(renderRequest)}
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            {pendingRequests.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-gray-600">
                  No tienes solicitudes pendientes
                </CardContent>
              </Card>
            ) : (
              pendingRequests.map(renderRequest)
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-6">
            {approvedRequests.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-gray-600">
                  No tienes solicitudes aprobadas
                </CardContent>
              </Card>
            ) : (
              approvedRequests.map(renderRequest)
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-6">
            {rejectedRequests.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-gray-600">
                  No tienes solicitudes rechazadas
                </CardContent>
              </Card>
            ) : (
              rejectedRequests.map(renderRequest)
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default MyAdoptions; 