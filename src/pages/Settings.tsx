
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bell, Shield, CreditCard, Globe, Eye, Mail, Smartphone, Trash2, AlertTriangle } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
    bookings: true,
    messages: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    dataSharing: false
  });

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Preferencias de Notificación</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-sm font-medium">Notificaciones por email</Label>
                <p className="text-sm text-gray-500">Recibe actualizaciones importantes por email</p>
              </div>
            </div>
            <Switch 
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-sm font-medium">Notificaciones push</Label>
                <p className="text-sm text-gray-500">Recibe notificaciones en tiempo real</p>
              </div>
            </div>
            <Switch 
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-sm font-medium">SMS</Label>
                <p className="text-sm text-gray-500">Recibe mensajes de texto importantes</p>
              </div>
            </div>
            <Switch 
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Tipos de Notificación</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Reservas y citas</Label>
              <p className="text-sm text-gray-500">Confirmaciones, recordatorios y cambios</p>
            </div>
            <Switch 
              checked={notifications.bookings}
              onCheckedChange={(checked) => setNotifications({...notifications, bookings: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Mensajes</Label>
              <p className="text-sm text-gray-500">Nuevos mensajes de cuidadores</p>
            </div>
            <Switch 
              checked={notifications.messages}
              onCheckedChange={(checked) => setNotifications({...notifications, messages: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Marketing</Label>
              <p className="text-sm text-gray-500">Promociones y novedades de Petbnb</p>
            </div>
            <Switch 
              checked={notifications.marketing}
              onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const PrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Visibilidad del Perfil</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-sm font-medium">Perfil público</Label>
                <p className="text-sm text-gray-500">Tu perfil será visible para otros usuarios</p>
              </div>
            </div>
            <Switch 
              checked={privacy.profileVisible}
              onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Mostrar email</Label>
              <p className="text-sm text-gray-500">Otros usuarios podrán ver tu email</p>
            </div>
            <Switch 
              checked={privacy.showEmail}
              onCheckedChange={(checked) => setPrivacy({...privacy, showEmail: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Mostrar teléfono</Label>
              <p className="text-sm text-gray-500">Otros usuarios podrán ver tu teléfono</p>
            </div>
            <Switch 
              checked={privacy.showPhone}
              onCheckedChange={(checked) => setPrivacy({...privacy, showPhone: checked})}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Datos y Privacidad</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Compartir datos analíticos</Label>
              <p className="text-sm text-gray-500">Ayuda a mejorar la plataforma compartiendo datos anónimos</p>
            </div>
            <Switch 
              checked={privacy.dataSharing}
              onCheckedChange={(checked) => setPrivacy({...privacy, dataSharing: checked})}
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Tu privacidad es importante</h4>
              <p className="text-sm text-blue-700 mt-1">
                Nunca compartimos tu información personal con terceros sin tu consentimiento explícito.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Seguridad de la Cuenta</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Cambiar contraseña</Label>
            <p className="text-sm text-gray-500 mb-3">Mantén tu cuenta segura con una contraseña fuerte</p>
            <div className="space-y-3">
              <Input type="password" placeholder="Contraseña actual" />
              <Input type="password" placeholder="Nueva contraseña" />
              <Input type="password" placeholder="Confirmar nueva contraseña" />
              <Button>Actualizar contraseña</Button>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Sesiones Activas</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="text-sm font-medium">Navegador actual</p>
              <p className="text-xs text-gray-500">Chrome en Windows • Madrid, España • Ahora</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Actual</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="text-sm font-medium">iPhone</p>
              <p className="text-xs text-gray-500">Safari en iOS • Hace 2 horas</p>
            </div>
            <Button variant="outline" size="sm">Cerrar sesión</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const DangerZone = () => (
    <div className="space-y-6">
      <div className="border border-red-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-red-900 mb-2">Zona de Peligro</h3>
            <p className="text-sm text-red-700 mb-4">
              Las siguientes acciones son permanentes y no se pueden deshacer.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-red-900 mb-2">Desactivar cuenta</h4>
                <p className="text-sm text-red-700 mb-3">
                  Tu cuenta será desactivada temporalmente. Podrás reactivarla cuando quieras.
                </p>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                  Desactivar cuenta
                </Button>
              </div>

              <Separator className="border-red-200" />

              <div>
                <h4 className="text-sm font-medium text-red-900 mb-2">Eliminar cuenta</h4>
                <p className="text-sm text-red-700 mb-3">
                  Esto eliminará permanentemente tu cuenta y todos tus datos. Esta acción no se puede deshacer.
                </p>
                <Button variant="destructive" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Eliminar cuenta permanentemente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Configuración</h1>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Privacidad
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="danger" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Cuenta
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>
                Gestiona cómo y cuándo quieres recibir notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacidad</CardTitle>
              <CardDescription>
                Controla qué información compartes y cómo se usa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PrivacySettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>
                Mantén tu cuenta segura y controla el acceso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SecuritySettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Cuenta</CardTitle>
              <CardDescription>
                Opciones para desactivar o eliminar tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DangerZone />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
