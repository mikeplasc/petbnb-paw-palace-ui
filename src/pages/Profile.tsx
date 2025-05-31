import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Edit2,
  Heart,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UserProfile,
  getUserProfile,
  updateUserProfile,
} from "@/services/profileService";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserAdoptionRequests } from "@/services/adoptionService";
import { getUserStats } from "@/services/statsService";
import { toast } from "sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const emailInputRef = useRef<HTMLInputElement>(null);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const { data: adoptionRequests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["userAdoptionRequests"],
    queryFn: getUserAdoptionRequests,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["userStats"],
    queryFn: getUserStats,
  });

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });

  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("El email es requerido");
      emailInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Por favor ingresa un email válido");
      emailInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setFormData((prev) => ({ ...prev, email: newEmail }));
    validateEmail(newEmail);
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        email: profile.email || "",
        phone: "", // Estos campos se pueden agregar a la tabla profiles si se necesitan
        location: "",
        bio: "",
      });
    }
  }, [profile]);

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Perfil actualizado exitosamente");
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("Error al actualizar el perfil");
    },
  });

  const handleSave = () => {
    // Validate email
    if (!validateEmail(formData.email)) {
      return;
    }

    updateProfileMutation.mutate({
      full_name: formData.full_name,
      email: formData.email,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        email: profile.email || "",
        phone: "",
        location: "",
        bio: "",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "approved":
        return "Aprobada";
      case "rejected":
        return "Rechazada";
      default:
        return status;
    }
  };

  if (profileLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="lg:col-span-2">
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center">
          <p className="text-gray-600">
            No se pudo cargar el perfil del usuario.
          </p>
        </div>
      </div>
    );
  }

  const joinDate = new Date(profile.created_at).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Editar Perfil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="flex items-center gap-2"
              disabled={updateProfileMutation.isPending}
            >
              <Save className="h-4 w-4" />
              Guardar
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
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
                <AvatarImage
                  src={profile.avatar_url || "/placeholder-user.jpg"}
                  alt={profile.full_name || "Usuario"}
                />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-petbnb-100 to-primary-100 text-primary-700">
                  {(profile.full_name || profile.email || "U")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">
                {profile.full_name || "Usuario"}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <Calendar className="h-4 w-4" />
                Miembro desde {joinDate}
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
                  <span className="font-semibold">
                    {statsLoading ? "-" : stats?.completed_bookings}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valoración promedio</span>
                  <span className="font-semibold">
                    {statsLoading
                      ? "-"
                      : stats?.average_rating
                      ? stats.average_rating.toFixed(1)
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mascotas registradas</span>
                  <span className="font-semibold">
                    {statsLoading ? "-" : stats?.registered_pets}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Solicitudes de adopción</span>
                  <span className="font-semibold">
                    {statsLoading ? "-" : stats?.adoption_requests}
                  </span>
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
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
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
                    onChange={handleEmailChange}
                    disabled={!isEditing}
                    placeholder="tu@email.com"
                    className={emailError ? "border-red-500" : ""}
                    ref={emailInputRef}
                  />
                  {emailError && (
                    <p className="text-sm text-red-500 mt-1">{emailError}</p>
                  )}
                </div>
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
              {requestsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-b-2 border-purple-600 rounded-full mx-auto"></div>
                  <p className="text-gray-500 mt-2">Cargando solicitudes...</p>
                </div>
              ) : adoptionRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No has realizado ninguna solicitud de adopción aún.</p>
                  <p className="text-sm">
                    ¡Visita nuestra sección de adopción para encontrar tu
                    compañero perfecto!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {adoptionRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <img
                        src={request.pet_image}
                        alt={request.pet_name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {request.pet_name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {request.shelter_name}
                        </p>
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
